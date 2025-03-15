-- Create recurring_payments table if it doesn't exist
CREATE TABLE IF NOT EXISTS recurring_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    frequency TEXT NOT NULL,
    next_date DATE NOT NULL,
    category TEXT,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE recurring_payments;

-- Create policies for recurring_payments table
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

-- Enable RLS on recurring_payments table
ALTER TABLE recurring_payments ENABLE ROW LEVEL SECURITY;