-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  category TEXT,
  date DATE NOT NULL,
  status TEXT DEFAULT 'Pending',
  payment_method TEXT,
  receipt_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create recurring_payments table
CREATE TABLE IF NOT EXISTS recurring_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  frequency TEXT NOT NULL,
  next_date DATE NOT NULL,
  category TEXT,
  description TEXT,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add to realtime publication
alter publication supabase_realtime add table expenses;
alter publication supabase_realtime add table recurring_payments;
