const express = require('express');
const multer = require('multer');
const Anthropic = require('@anthropic-ai/sdk');
const { getDB } = require('../db/seed');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const client = new Anthropic();

// GET /api/profile - Get the single profile row
router.get('/', (req, res) => {
  const db = getDB();
  const profile = db.prepare('SELECT * FROM user_profile WHERE id = 1').get();
  res.json(profile || null);
});

// GET /api/profile/exists - Lightweight existence check
router.get('/exists', (req, res) => {
  const db = getDB();
  const row = db.prepare('SELECT id FROM user_profile WHERE id = 1').get();
  res.json({ exists: !!row });
});

// PUT /api/profile - Upsert profile
router.put('/', (req, res) => {
  const db = getDB();
  const {
    company_name,
    job_title,
    years_experience,
    platform_background,
    accomplishments,
    resume_text,
    display_name,
  } = req.body;

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO user_profile (
      id, company_name, job_title, years_experience, platform_background,
      accomplishments, resume_text, display_name,
      created_at, updated_at
    ) VALUES (
      1, ?, ?, ?, ?, ?, ?, ?,
      COALESCE((SELECT created_at FROM user_profile WHERE id = 1), CURRENT_TIMESTAMP),
      CURRENT_TIMESTAMP
    )
  `);

  const accomplishmentsStr = accomplishments
    ? (typeof accomplishments === 'string' ? accomplishments : JSON.stringify(accomplishments))
    : null;

  stmt.run(
    company_name || null,
    job_title || null,
    years_experience != null ? years_experience : null,
    platform_background || null,
    accomplishmentsStr,
    resume_text || null,
    display_name || null
  );

  const profile = db.prepare('SELECT * FROM user_profile WHERE id = 1').get();
  res.json(profile);
});

// POST /api/profile/resume - Upload and extract text from PDF/TXT
router.post('/resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { mimetype, buffer } = req.file;
    let text;

    if (mimetype === 'application/pdf') {
      const pdfParse = require('pdf-parse');
      const data = await pdfParse(buffer);
      text = data.text;
    } else {
      text = buffer.toString('utf-8');
    }

    res.json({ text });
  } catch (error) {
    console.error('Resume upload error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/profile/resume/parse - Parse resume text with Claude
router.post('/resume/parse', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `Analyze the following resume text and extract structured profile information. Return ONLY valid JSON with no additional text.

Extract the following fields:
- display_name: The person's full name
- company_name: Their most recent or current company
- job_title: Their most recent or current job title
- years_experience: Total years of professional experience as a number
- platform_background: A brief description of their technical platform experience (e.g., "Palantir Foundry", "AWS", "Snowflake", etc.)
- accomplishments: An array of notable accomplishments, each with:
  - id: A unique string identifier (e.g., "acc-1", "acc-2")
  - title: A short title for the accomplishment
  - original: The original text from the resume
  - foundry_mapping_hint: How this might relate to Palantir Foundry concepts
  - tags: An array of relevant skill/technology tags

Resume text:
${text}`,
        },
      ],
    });

    const content = response.content[0].text;
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      // Try to extract JSON from markdown code block
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[1].trim());
      } else {
        throw new Error('Failed to parse AI response as JSON');
      }
    }

    res.json(parsed);
  } catch (error) {
    console.error('Resume parse error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
