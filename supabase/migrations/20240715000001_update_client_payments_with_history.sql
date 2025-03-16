-- Add payment history tracking columns to client_payments table
ALTER TABLE client_payments ADD COLUMN IF NOT EXISTS last_payment_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE client_payments ADD COLUMN IF NOT EXISTS payment_history JSONB DEFAULT '[]'::jsonb;

-- Add realtime publication for client_payments table if not already added
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'client_payments'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE client_payments;
  END IF;
END
$$;