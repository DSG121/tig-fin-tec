-- Rename type column to report_type to match the types definition
ALTER TABLE financial_reports RENAME COLUMN type TO report_type;

-- Add comment to refresh schema cache
COMMENT ON TABLE financial_reports IS 'Financial reports for users';
COMMENT ON COLUMN financial_reports.report_type IS 'Type of financial report';
