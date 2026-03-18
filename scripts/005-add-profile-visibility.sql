-- Add visibility fields to profile table
ALTER TABLE profile ADD COLUMN IF NOT EXISTS show_location BOOLEAN DEFAULT true;
ALTER TABLE profile ADD COLUMN IF NOT EXISTS show_phone BOOLEAN DEFAULT true;
ALTER TABLE profile ADD COLUMN IF NOT EXISTS show_resume BOOLEAN DEFAULT true;
ALTER TABLE profile ADD COLUMN IF NOT EXISTS show_calendly BOOLEAN DEFAULT true;
