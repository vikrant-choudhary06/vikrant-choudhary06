CREATE TABLE IF NOT EXISTS contact_rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS contact_rate_limits_expiry ON contact_rate_limits(expires_at);
