CREATE TABLE IF NOT EXISTS progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section INTEGER NOT NULL,
  activity_type TEXT NOT NULL,
  activity_id TEXT NOT NULL,
  status TEXT DEFAULT 'not_started',
  score REAL,
  time_spent_seconds INTEGER,
  notes TEXT,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flashcard_progress (
  card_id TEXT PRIMARY KEY,
  box INTEGER DEFAULT 1,
  times_reviewed INTEGER DEFAULT 0,
  times_correct INTEGER DEFAULT 0,
  last_reviewed DATETIME,
  next_review DATETIME
);

CREATE TABLE IF NOT EXISTS interview_transcripts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  interview_type TEXT NOT NULL,
  transcript TEXT NOT NULL,
  ai_feedback TEXT,
  duration_seconds INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quiz_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section INTEGER NOT NULL,
  quiz_id TEXT NOT NULL,
  answers TEXT NOT NULL,
  score REAL NOT NULL,
  time_spent_seconds INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_profile (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  company_name TEXT,
  job_title TEXT,
  years_experience INTEGER,
  platform_background TEXT,
  accomplishments TEXT,
  resume_text TEXT,
  display_name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
