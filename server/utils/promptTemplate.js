const fs = require('fs');
const path = require('path');
const { getDB } = require('../db/seed');

const promptMap = {
  'tutor': 'tutor.txt',
  'interviewer-decomp': 'interviewer.txt',
  'interviewer-behavioral': 'behavioral.txt',
  'interviewer-technical': 'technical.txt',
  'feedback': 'feedback.txt',
  'lab-reviewer': 'lab-reviewer.txt',
  'decomposition': 'decomposition.txt',
  'resume-refiner': 'resume-refiner.txt',
};

function getProfile() {
  const db = getDB();
  return db.prepare('SELECT * FROM user_profile WHERE id = 1').get() || null;
}

function formatAccomplishments(accomplishmentsJson) {
  if (!accomplishmentsJson) return '- Has relevant enterprise platform experience';
  try {
    const accomplishments = JSON.parse(accomplishmentsJson);
    if (!Array.isArray(accomplishments) || accomplishments.length === 0) {
      return '- Has relevant enterprise platform experience';
    }
    return accomplishments.map(a => `- ${a.title}: ${a.original}`).join('\n');
  } catch {
    return '- Has relevant enterprise platform experience';
  }
}

async function loadAndPopulatePrompt(mode) {
  const filename = promptMap[mode] || 'tutor.txt';
  const filepath = path.join(__dirname, '..', 'prompts', filename);

  let template;
  try {
    template = fs.readFileSync(filepath, 'utf-8');
  } catch {
    return 'You are a helpful AI tutor for Palantir Foundry and FDE interview preparation.';
  }

  const profile = getProfile();

  const replacements = {
    '{{COMPANY_NAME}}': profile?.company_name || 'their company',
    '{{JOB_TITLE}}': profile?.job_title || 'a technical professional',
    '{{YEARS_EXPERIENCE}}': profile?.years_experience != null ? String(profile.years_experience) : 'several years of',
    '{{PLATFORM_BACKGROUND}}': profile?.platform_background || 'enterprise platform',
    '{{ACCOMPLISHMENTS_BLOCK}}': formatAccomplishments(profile?.accomplishments),
    '{{DISPLAY_NAME}}': profile?.display_name || 'The user',
  };

  let result = template;
  for (const [placeholder, value] of Object.entries(replacements)) {
    result = result.split(placeholder).join(value);
  }

  return result;
}

module.exports = { loadAndPopulatePrompt, getProfile };
