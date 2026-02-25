/*
  # Create Products Table

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for the product
      - `name` (text) - Product name (e.g., "Motor Comprehensive")
      - `code` (text, unique) - Product code (e.g., "MTR-01")
      - `icon` (text) - Icon name for the product
      - `status` (text) - Product status: Live, Draft, or Archived
      - `description` (text) - Product description
      - `active_policies` (integer) - Number of active policies
      - `risk_rules` (integer) - Number of risk rules
      - `form_fields` (jsonb) - Form field configuration as JSON
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (products are viewable by all)
    - Add policy for public insert/update access (no auth required per user request)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  icon text NOT NULL DEFAULT 'Car',
  status text NOT NULL DEFAULT 'Live' CHECK (status IN ('Live', 'Draft', 'Archived')),
  description text NOT NULL DEFAULT '',
  active_policies integer NOT NULL DEFAULT 0,
  risk_rules integer NOT NULL DEFAULT 0,
  form_fields jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Products can be created by everyone"
  ON products FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Products can be updated by everyone"
  ON products FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Products can be deleted by everyone"
  ON products FOR DELETE
  USING (true);

CREATE INDEX IF NOT EXISTS products_code_idx ON products(code);
CREATE INDEX IF NOT EXISTS products_status_idx ON products(status);
