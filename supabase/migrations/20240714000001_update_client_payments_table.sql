-- Add auto_renew column to client_payments table
ALTER TABLE client_payments ADD COLUMN IF NOT EXISTS auto_renew BOOLEAN DEFAULT true;

-- Enable realtime for client_payments table
alter publication supabase_realtime add table client_payments;