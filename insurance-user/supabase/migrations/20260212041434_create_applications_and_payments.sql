/*
  # Insurance Applications and Payments System

  1. New Tables
    - `applications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_name` (text)
      - `product_type` (text) - e.g., 'motor', 'health', 'home'
      - `status` (text) - 'draft', 'submitted', 'under_review', 'approved', 'payment_pending', 'payment_completed', 'active', 'rejected'
      - `application_data` (jsonb) - stores form data
      - `quote` (jsonb) - stores quote details (basePremium, taxes, fees, totalPremium)
      - `progress` (integer) - 0-100
      - `submitted_at` (timestamptz)
      - `approved_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `payments`
      - `id` (uuid, primary key)
      - `application_id` (uuid, references applications)
      - `user_id` (uuid, references auth.users)
      - `amount` (decimal)
      - `payment_method` (text) - 'mobile_money', 'bank_transfer', 'card'
      - `payment_provider` (text) - 'telebirr', 'cbe_birr', 'mpesa', etc.
      - `status` (text) - 'pending', 'processing', 'completed', 'failed'
      - `transaction_reference` (text)
      - `payment_details` (jsonb) - stores payment method specific details
      - `paid_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `policies`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `application_id` (uuid, references applications)
      - `policy_number` (text, unique)
      - `product_name` (text)
      - `product_type` (text)
      - `status` (text) - 'active', 'expired', 'cancelled'
      - `covered_item` (text)
      - `coverage_start` (date)
      - `coverage_end` (date)
      - `premium_amount` (decimal)
      - `premium_frequency` (text) - 'monthly', 'yearly'
      - `policy_details` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  product_name text NOT NULL,
  product_type text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  application_data jsonb DEFAULT '{}'::jsonb,
  quote jsonb,
  progress integer DEFAULT 0,
  submitted_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own applications"
  ON applications FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  amount decimal NOT NULL,
  payment_method text NOT NULL,
  payment_provider text,
  status text NOT NULL DEFAULT 'pending',
  transaction_reference text,
  payment_details jsonb DEFAULT '{}'::jsonb,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payments"
  ON payments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies table
CREATE TABLE IF NOT EXISTS policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  application_id uuid REFERENCES applications,
  policy_number text UNIQUE NOT NULL,
  product_name text NOT NULL,
  product_type text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  covered_item text NOT NULL,
  coverage_start date NOT NULL,
  coverage_end date NOT NULL,
  premium_amount decimal NOT NULL,
  premium_frequency text NOT NULL DEFAULT 'yearly',
  policy_details jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own policies"
  ON policies FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own policies"
  ON policies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own policies"
  ON policies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_payments_application_id ON payments(application_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_policies_user_id ON policies(user_id);
CREATE INDEX IF NOT EXISTS idx_policies_status ON policies(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to update updated_at
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_policies_updated_at
  BEFORE UPDATE ON policies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();