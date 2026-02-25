/*
  # Update Customers Table - Add Missing Fields

  1. Changes
    - Add `region` (text) - Customer region
    - Add `segment` (text) - Customer segment: VIP or Standard
    - Add `kyc_verified` (boolean) - KYC verification status
    - Add `tags` (jsonb) - Customer tags as JSON array
    - Add `join_date` (text) - Join date string
    - Add `lifetime_value` (text) - Lifetime value (formatted)
    - Add `claim_ratio` (text) - Claim ratio
    - Add `tenure` (text) - Tenure duration
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'region'
  ) THEN
    ALTER TABLE customers ADD COLUMN region text NOT NULL DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'segment'
  ) THEN
    ALTER TABLE customers ADD COLUMN segment text NOT NULL DEFAULT 'Standard' CHECK (segment IN ('VIP', 'Standard'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'kyc_verified'
  ) THEN
    ALTER TABLE customers ADD COLUMN kyc_verified boolean NOT NULL DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'tags'
  ) THEN
    ALTER TABLE customers ADD COLUMN tags jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'join_date'
  ) THEN
    ALTER TABLE customers ADD COLUMN join_date text NOT NULL DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'lifetime_value'
  ) THEN
    ALTER TABLE customers ADD COLUMN lifetime_value text NOT NULL DEFAULT 'BD 0';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'claim_ratio'
  ) THEN
    ALTER TABLE customers ADD COLUMN claim_ratio text NOT NULL DEFAULT '0%';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'tenure'
  ) THEN
    ALTER TABLE customers ADD COLUMN tenure text NOT NULL DEFAULT '';
  END IF;
END $$;
