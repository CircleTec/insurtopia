/*
  # Create Customers Table

  1. New Tables
    - `customers`
      - `id` (uuid, primary key) - Unique identifier for the customer
      - `name` (text) - Customer full name
      - `email` (text, unique) - Customer email address
      - `phone` (text) - Customer phone number
      - `cpr` (text, unique) - Customer CPR/ID number
      - `address` (text) - Customer address
      - `status` (text) - Customer status: Active, Inactive, or Suspended
      - `risk_score` (text) - Risk assessment score: Low, Medium, High
      - `total_premium` (text) - Total premium paid (stored as text for formatting)
      - `active_policies` (integer) - Number of active policies
      - `claims_filed` (integer) - Number of claims filed
      - `member_since` (text) - Member since date string
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `customers` table
    - Add policies for public access (no auth required per user request)
*/

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL DEFAULT '',
  cpr text UNIQUE NOT NULL,
  address text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Suspended')),
  risk_score text NOT NULL DEFAULT 'Low' CHECK (risk_score IN ('Low', 'Medium', 'High')),
  total_premium text NOT NULL DEFAULT 'BD 0',
  active_policies integer NOT NULL DEFAULT 0,
  claims_filed integer NOT NULL DEFAULT 0,
  member_since text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers are viewable by everyone"
  ON customers FOR SELECT
  USING (true);

CREATE POLICY "Customers can be created by everyone"
  ON customers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Customers can be updated by everyone"
  ON customers FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Customers can be deleted by everyone"
  ON customers FOR DELETE
  USING (true);

CREATE INDEX IF NOT EXISTS customers_email_idx ON customers(email);
CREATE INDEX IF NOT EXISTS customers_cpr_idx ON customers(cpr);
CREATE INDEX IF NOT EXISTS customers_status_idx ON customers(status);
