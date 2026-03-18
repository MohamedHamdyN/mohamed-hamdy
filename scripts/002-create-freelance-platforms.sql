-- Create freelance_platforms table
CREATE TABLE IF NOT EXISTS freelance_platforms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  profile_url VARCHAR(1000) NOT NULL,
  logo_url VARCHAR(1000),
  color VARCHAR(50),
  enabled BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on order for sorting
CREATE INDEX IF NOT EXISTS idx_freelance_platforms_order ON freelance_platforms("order");
