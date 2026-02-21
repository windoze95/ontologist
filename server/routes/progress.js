const express = require('express');
const { getDB } = require('../db/seed');

const router = express.Router();

// Get all progress entries
router.get('/', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM progress ORDER BY section, activity_type').all();
  res.json(rows);
});

// Get progress for a specific section
router.get('/section/:section', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM progress WHERE section = ?').all(req.params.section);
  res.json(rows);
});

// Update or create a progress entry
router.post('/', (req, res) => {
  const db = getDB();
  const { section, activity_type, activity_id, status, score, time_spent_seconds, notes } = req.body;

  const existing = db.prepare(
    'SELECT id FROM progress WHERE section = ? AND activity_type = ? AND activity_id = ?'
  ).get(section, activity_type, activity_id);

  if (existing) {
    db.prepare(
      `UPDATE progress SET status = ?, score = ?, time_spent_seconds = ?, notes = ?,
       completed_at = CASE WHEN ? = 'completed' THEN CURRENT_TIMESTAMP ELSE completed_at END
       WHERE id = ?`
    ).run(status, score, time_spent_seconds, notes, status, existing.id);
    res.json({ id: existing.id, updated: true });
  } else {
    const result = db.prepare(
      `INSERT INTO progress (section, activity_type, activity_id, status, score, time_spent_seconds, notes, completed_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, CASE WHEN ? = 'completed' THEN CURRENT_TIMESTAMP ELSE NULL END)`
    ).run(section, activity_type, activity_id, status, score, time_spent_seconds, notes, status);
    res.json({ id: result.lastInsertRowid, created: true });
  }
});

// Flashcard progress
router.get('/flashcards', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM flashcard_progress').all();
  res.json(rows);
});

router.post('/flashcards', (req, res) => {
  const db = getDB();
  const { card_id, box, correct } = req.body;

  const existing = db.prepare('SELECT * FROM flashcard_progress WHERE card_id = ?').get(card_id);

  if (existing) {
    const newBox = correct ? Math.min(existing.box + 1, 5) : Math.max(existing.box - 1, 1);
    const nextReviewHours = [0, 1, 4, 12, 24, 72][newBox];
    db.prepare(
      `UPDATE flashcard_progress SET box = ?, times_reviewed = times_reviewed + 1,
       times_correct = times_correct + ?, last_reviewed = CURRENT_TIMESTAMP,
       next_review = datetime('now', '+${nextReviewHours} hours')
       WHERE card_id = ?`
    ).run(newBox, correct ? 1 : 0, card_id);
    res.json({ card_id, box: newBox });
  } else {
    const box_val = correct ? 2 : 1;
    const nextReviewHours = correct ? 4 : 1;
    db.prepare(
      `INSERT INTO flashcard_progress (card_id, box, times_reviewed, times_correct, last_reviewed, next_review)
       VALUES (?, ?, 1, ?, CURRENT_TIMESTAMP, datetime('now', '+${nextReviewHours} hours'))`
    ).run(card_id, box_val, correct ? 1 : 0);
    res.json({ card_id, box: box_val, created: true });
  }
});

// Quiz results
router.get('/quizzes', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM quiz_results ORDER BY created_at DESC').all();
  res.json(rows);
});

router.post('/quizzes', (req, res) => {
  const db = getDB();
  const { section, quiz_id, answers, score, time_spent_seconds } = req.body;
  const result = db.prepare(
    'INSERT INTO quiz_results (section, quiz_id, answers, score, time_spent_seconds) VALUES (?, ?, ?, ?, ?)'
  ).run(section, quiz_id, JSON.stringify(answers), score, time_spent_seconds);
  res.json({ id: result.lastInsertRowid });
});

// Interview transcripts
router.get('/interviews', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM interview_transcripts ORDER BY created_at DESC').all();
  res.json(rows);
});

router.post('/interviews', (req, res) => {
  const db = getDB();
  const { interview_type, transcript, ai_feedback, duration_seconds } = req.body;
  const result = db.prepare(
    'INSERT INTO interview_transcripts (interview_type, transcript, ai_feedback, duration_seconds) VALUES (?, ?, ?, ?)'
  ).run(interview_type, JSON.stringify(transcript), ai_feedback ? JSON.stringify(ai_feedback) : null, duration_seconds);
  res.json({ id: result.lastInsertRowid });
});

// Overall stats
router.get('/stats', (req, res) => {
  const db = getDB();
  const totalActivities = 14 * 4; // approximate total activities
  const completed = db.prepare("SELECT COUNT(*) as count FROM progress WHERE status = 'completed'").get();
  const flashcardsReviewed = db.prepare('SELECT COUNT(*) as count FROM flashcard_progress').get();
  const quizzesTaken = db.prepare('SELECT COUNT(*) as count FROM quiz_results').get();
  const interviewsDone = db.prepare('SELECT COUNT(*) as count FROM interview_transcripts').get();
  const avgQuizScore = db.prepare('SELECT AVG(score) as avg FROM quiz_results').get();
  const totalTimeSpent = db.prepare('SELECT SUM(time_spent_seconds) as total FROM progress').get();

  res.json({
    completedActivities: completed.count,
    totalActivities,
    flashcardsReviewed: flashcardsReviewed.count,
    quizzesTaken: quizzesTaken.count,
    interviewsDone: interviewsDone.count,
    avgQuizScore: avgQuizScore.avg || 0,
    totalTimeSpent: totalTimeSpent.total || 0,
  });
});

module.exports = router;
