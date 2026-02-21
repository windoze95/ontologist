const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const { loadAndPopulatePrompt } = require('../utils/promptTemplate');

const router = express.Router();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

router.post('/chat', async (req, res) => {
  try {
    const { messages, mode } = req.body;
    const systemPrompt = await loadAndPopulatePrompt(mode);

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages,
    });

    res.json(response);
  } catch (error) {
    console.error('AI API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post('/chat/stream', async (req, res) => {
  try {
    const { messages, mode } = req.body;
    const systemPrompt = await loadAndPopulatePrompt(mode);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages,
    });

    stream.on('text', (text) => {
      res.write(`data: ${JSON.stringify({ type: 'text', text })}\n\n`);
    });

    stream.on('message', (message) => {
      res.write(`data: ${JSON.stringify({ type: 'done', message })}\n\n`);
      res.end();
    });

    stream.on('error', (error) => {
      res.write(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`);
      res.end();
    });
  } catch (error) {
    console.error('AI streaming error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
