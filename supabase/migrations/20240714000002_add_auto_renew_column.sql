-- Add auto_renew column to client_payments table
ALTER TABLE client_payments ADD COLUMN IF NOT EXISTS auto_renew BOOLEAN DEFAULT true;
