CREATE TABLE IF NOT EXISTS recurring_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  frequency TEXT NOT NULL,
  next_date DATE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE recurring_payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own recurring payments" ON recurring_payments;
CREATE POLICY "Users can view their own recurring payments"
ON recurring_payments FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own recurring payments" ON recurring_payments;
CREATE POLICY "Users can insert their own recurring payments"
ON recurring_payments FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own recurring payments" ON recurring_payments;
CREATE POLICY "Users can update their own recurring payments"
ON recurring_payments FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own recurring payments" ON recurring_payments;
CREATE POLICY "Users can delete their own recurring payments"
ON recurring_payments FOR DELETE
USING (auth.uid() = user_id);

ALTER publication supabase_realtime ADD TABLE recurring_payments;