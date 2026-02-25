/*
  # Create Policies Table

  1. New Tables
    - `policies`
      - `id` (uuid, primary key) - Unique identifier for the policy
      - `policy_number` (text, unique) - Policy number
      - `customer_id` (uuid) - Foreign key to customers table
      - `customer_name` (text) - Denormalized customer name for display
      - `product_id` (uuid) - Foreign key to products table
      - `product_name` (text) - Denormalized product name for display
      - `effective_date` (text) - Policy effective date string
      - `expiry_date` (text) - Policy expiry date string
      - `premium` (text) - Premium amount (stored as text for formatting)
      - `status` (text) - Policy status: Active, Expired, or Cancelled
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `policies` table
    - Add policies for public access (no auth required per user request)
*/

CREATE TABLE IF NOT EXISTS policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_number text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  product_name text NOT NULL,
  effective_date text NOT NULL,
  expiry_date text NOT NULL,
  premium text NOT NULL,
  status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Expired', 'Cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Policies are viewable by everyone"
  ON policies FOR SELECT
  USING (true);

CREATE POLICY "Policies can be created by everyone"
  ON policies FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Policies can be updated by everyone"
  ON policies FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Policies can be deleted by everyone"
  ON policies FOR DELETE
  USING (true);

CREATE INDEX IF NOT EXISTS policies_customer_id_idx ON policies(customer_id);
CREATE INDEX IF NOT EXISTS policies_product_id_idx ON policies(product_id);
CREATE INDEX IF NOT EXISTS policies_status_idx ON policies(status);
CREATE INDEX IF NOT EXISTS policies_policy_number_idx ON policies(policy_number);
