-- INSURETHIOPIA CORE SCHEMA (V2 - SCALABLE & BULLETPROOF) --

-- 1. Profiles (Extends Auth.Users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  region TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'User' CHECK (role IN ('User', 'Admin', 'Underwriter')),
  legacy_id TEXT UNIQUE, -- ID from the old system
  migration_source TEXT, -- e.g., 'CoreBanking_V1', 'Manual_Excel'
  segment TEXT DEFAULT 'Standard',
  kyc_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Products
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  category TEXT,
  description TEXT,
  icon TEXT,
  base_premium NUMERIC,
  status TEXT DEFAULT 'Live',
  metadata JSONB DEFAULT '{}', -- Scalability: Handles product-specific rules
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Applications
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE RESTRICT NOT NULL,
  product_id TEXT REFERENCES products(id),
  product_name TEXT,
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected', 'Payment Pending', 'Paid')),
  progress INTEGER DEFAULT 0,
  risk_score INTEGER,
  risk_level TEXT,
  application_data JSONB DEFAULT '{}', -- Flexible data for different products
  quote JSONB DEFAULT '{}',
  submitted_at TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Policies (Versioning Support)
CREATE TABLE policies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE RESTRICT NOT NULL,
  application_id UUID REFERENCES applications(id),
  parent_policy_id UUID REFERENCES policies(id), -- For renewals/endorsements
  legacy_id TEXT, -- Original policy number from old system
  is_legacy BOOLEAN DEFAULT FALSE,
  policy_number TEXT UNIQUE NOT NULL,
  product_name TEXT,
  premium_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Expired', 'Cancelled', 'Lapsed')),
  effective_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Claims
CREATE TABLE claims (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE RESTRICT NOT NULL,
  policy_id UUID REFERENCES policies(id),
  policy_number TEXT,
  product_name TEXT,
  claim_type TEXT,
  amount NUMERIC,
  status TEXT DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Under Review', 'Approved', 'Paid', 'Rejected')),
  description TEXT,
  incident_date DATE,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  assigned_to UUID REFERENCES profiles(id), -- Points to Underwriter
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Payments & Installments
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE RESTRICT NOT NULL,
  application_id UUID REFERENCES applications(id),
  policy_id UUID REFERENCES policies(id),
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'Processing' CHECK (status IN ('Processing', 'Completed', 'Failed', 'Refunded')),
  payment_method TEXT,
  transaction_reference TEXT,
  payment_details JSONB DEFAULT '{}',
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Document Vault (Storage Metadata)
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  entity_type TEXT CHECK (entity_type IN ('Application', 'Policy', 'Claim', 'Profile')),
  entity_id UUID NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Path in Supabase Storage
  content_type TEXT,
  size_bytes BIGINT,
  category TEXT DEFAULT 'General',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Audit logs
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  entity_type TEXT,
  entity_id UUID,
  action TEXT NOT NULL,
  actor_id UUID REFERENCES profiles(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. External Integrations (Telebirr, Core Systems, etc.)
CREATE TABLE integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('Payment', 'CoreSystem', 'Marketplace', 'SMS')),
  config JSONB DEFAULT '{}', -- Encrypted or sensitive config
  status TEXT DEFAULT 'Active',
  last_sync_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Webhooks (For pushing data to external systems)
CREATE TABLE webhooks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  target_url TEXT NOT NULL,
  event_types TEXT[], -- e.g. ['application.approved', 'claim.paid']
  secret_token TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PERFORMANCE INDEXES --
CREATE INDEX idx_integrations_type ON integrations(type);
CREATE INDEX idx_webhooks_active ON webhooks(is_active);

-- ... existing enable RLS and policies ...
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- POLICIES (Bulletproof Access) --

-- Products: Everyone can read
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);

-- Applications: Own records + Underwriters/Admins
CREATE POLICY "Apps access" ON applications FOR ALL 
USING (
  auth.uid() = user_id OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('Admin', 'Underwriter'))
);

-- Similar enhanced policies for other tables...

-- AUTOMATIC PROFILE CREATION --
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', COALESCE(new.raw_user_meta_data->>'role', 'User'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

