-- Note: Visibility fields are now added in initial schema creation (000-init-database.sql)
-- This file is kept for reference and idempotency
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_location BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_phone BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_resume BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_calendly BOOLEAN DEFAULT true;
