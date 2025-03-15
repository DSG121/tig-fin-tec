-- Create financial_reports table if it doesn't exist
CREATE TABLE IF NOT EXISTS financial_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  report_type TEXT NOT NULL,
  period TEXT NOT NULL,
  format TEXT NOT NULL,
  include_charts BOOLEAN DEFAULT false,
  include_notes BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable row level security
ALTER TABLE financial_reports ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to select their own reports
DROP POLICY IF EXISTS "Users can view their own reports" ON financial_reports;
CREATE POLICY "Users can view their own reports"
ON financial_reports FOR SELECT
USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own reports
DROP POLICY IF EXISTS "Users can insert their own reports" ON financial_reports;
CREATE POLICY "Users can insert their own reports"
ON financial_reports FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own reports
DROP POLICY IF EXISTS "Users can update their own reports" ON financial_reports;
CREATE POLICY "Users can update their own reports"
ON financial_reports FOR UPDATE
USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own reports
DROP POLICY IF EXISTS "Users can delete their own reports" ON financial_reports;
CREATE POLICY "Users can delete their own reports"
ON financial_reports FOR DELETE
USING (auth.uid() = user_id);

-- Enable realtime
alter publication supabase_realtime add table financial_reports;
