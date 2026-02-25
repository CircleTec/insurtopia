/*
  # Create Claims Table

  1. New Tables
    - `claims`
      - `id` (uuid, primary key) - Unique identifier for the claim
      - `claim_number` (text, unique) - Claim number
      - `policy_id` (uuid) - Foreign key to policies table
      - `policy_number` (text) - Denormalized policy number for display
      - `customer_id` (uuid) - Foreign key to customers table
      - `customer_name` (text) - Denormalized customer name for display
      - `product_name` (text) - Product name for display
      - `incident_date` (text) - Date of incident string
      - `reported_date` (text) - Date claim was reported string
      - `claim_amount` (text) - Claimed amount (stored as text for formatting)
      - `status` (text) - Claim status: Pending, Approved, Rejected, Under Review
      - `priority` (text) - Claim priority: Low, Medium, High, Critical
      - `assigned_to` (text) - Name of assigned reviewer
      - `description` (text) - Claim description
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `claims` table
    - Add policies for public access (no auth required per user request)
*/

CREATE TABLE IF NOT EXISTS claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_number text UNIQUE NOT NULL,
  policy_id uuid REFERENCES policies(id) ON DELETE CASCADE,
  policy_number text NOT NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  product_name text NOT NULL,
  incident_date text NOT NULL,
  reported_date text NOT NULL,
  claim_amount text NOT NULL,
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Under Review')),
  priority text NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
  assigned_to text NOT NULL DEFAULT 'Unassigned',
  description text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Claims are viewable by everyone"
  ON claims FOR SELECT
  USING (true);

CREATE POLICY "Claims can be created by everyone"
  ON claims FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Claims can be updated by everyone"
  ON claims FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Claims can be deleted by everyone"
  ON claims FOR DELETE
  USING (true);

CREATE INDEX IF NOT EXISTS claims_customer_id_idx ON claims(customer_id);
CREATE INDEX IF NOT EXISTS claims_policy_id_idx ON claims(policy_id);
CREATE INDEX IF NOT EXISTS claims_status_idx ON claims(status);
CREATE INDEX IF NOT EXISTS claims_priority_idx ON claims(priority);
CREATE INDEX IF NOT EXISTS claims_claim_number_idx ON claims(claim_number);
