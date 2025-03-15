-- Create clients table
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    status TEXT DEFAULT 'Active',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable row level security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own clients
DROP POLICY IF EXISTS "Users can view own clients" ON public.clients;
CREATE POLICY "Users can view own clients"
    ON public.clients
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create policy for users to insert their own clients
DROP POLICY IF EXISTS "Users can insert own clients" ON public.clients;
CREATE POLICY "Users can insert own clients"
    ON public.clients
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own clients
DROP POLICY IF EXISTS "Users can update own clients" ON public.clients;
CREATE POLICY "Users can update own clients"
    ON public.clients
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create policy for users to delete their own clients
DROP POLICY IF EXISTS "Users can delete own clients" ON public.clients;
CREATE POLICY "Users can delete own clients"
    ON public.clients
    FOR DELETE
    USING (auth.uid() = user_id);

-- Enable realtime
alter publication supabase_realtime add table clients;