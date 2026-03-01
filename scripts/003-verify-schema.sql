-- Verify admin table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'admins'
ORDER BY ordinal_position;

-- Check if any admins exist
SELECT COUNT(*) as admin_count FROM admins;

-- Verify admin_sessions table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'admin_sessions'
ORDER BY ordinal_position;

-- Check admin_sessions
SELECT COUNT(*) as session_count FROM admin_sessions;

-- Check profiles table
SELECT COUNT(*) as profiles_count FROM profiles;

-- Check profile table (old)
SELECT COUNT(*) as profile_count FROM profile;

-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
