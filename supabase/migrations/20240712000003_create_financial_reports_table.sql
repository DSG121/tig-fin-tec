-- Create financial_reports table if it doesn't exist
CREATE TABLE IF NOT EXISTS financial_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  period TEXT NOT NULL,
  type TEXT NOT NULL,
  format TEXT,
  include_charts BOOLEAN DEFAULT false,
  include_notes BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  file_path TEXT
);

-- Enable row level security
ALTER TABLE financial_reports ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own financial reports" ON financial_reports;
CREATE POLICY "Users can view their own financial reports"
ON financial_reports FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own financial reports" ON financial_reports;
CREATE POLICY "Users can insert their own financial reports"
ON financial_reports FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own financial reports" ON financial_reports;
CREATE POLICY "Users can update their own financial reports"
ON financial_reports FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own financial reports" ON financial_reports;
CREATE POLICY "Users can delete their own financial reports"
ON financial_reports FOR DELETE
USING (auth.uid() = user_id);