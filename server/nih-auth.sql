CREATE TABLE IF NOT EXISTS nih_attempts (
  id TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL,
  expires INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS nih_attempts_expiry ON nih_attempts(expires);
