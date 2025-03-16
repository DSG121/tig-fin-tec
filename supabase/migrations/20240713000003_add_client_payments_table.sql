-- Create client_payments table
CREATE TABLE IF NOT EXISTS client_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  client_id UUID REFERENCES clients(id) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  frequency TEXT NOT NULL,
  next_due_date DATE NOT NULL,
  status TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE client_payments ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own client payments" ON client_payments;
CREATE POLICY "Users can view their own client payments"
  ON client_payments FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own client payments" ON client_payments;
CREATE POLICY "Users can insert their own client payments"
  ON client_payments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own client payments" ON client_payments;
CREATE POLICY "Users can update their own client payments"
  ON client_payments FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own client payments" ON client_payments;
CREATE POLICY "Users can delete their own client payments"
  ON client_payments FOR DELETE
  USING (auth.uid() = user_id);

-- Remove the ALTER PUBLICATION line since it's causing an error
-- The table is already part of the publication