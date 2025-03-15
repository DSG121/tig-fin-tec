-- Add new columns to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS job_title TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS bio TEXT;

-- Note: We're not adding the users table to supabase_realtime publication
-- because it's already a member, as indicated by the previous error
