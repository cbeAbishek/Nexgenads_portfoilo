
-- Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  inquiry_type VARCHAR(100), -- general, business, support, partnership
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'new',
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Job Applications Table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id VARCHAR(255) NOT NULL,
  job_title VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  current_location VARCHAR(255) NOT NULL,
  experience VARCHAR(100) NOT NULL,
  current_company VARCHAR(255),
  resume_link TEXT NOT NULL,
  linkedin_profile TEXT,
  portfolio_link TEXT,
  cover_letter TEXT NOT NULL,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'new', -- new, reviewing, shortlisted, interview, rejected, hired
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_applied_at ON job_applications(applied_at DESC);

-- Role Permissions for website forms (anon + authenticated)
-- REQUIRED: fixes "permission denied for schema public" on form submissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated;

-- Row Level Security (RLS) for the two form tables.
-- The website only ever inserts/reads via the anon key, so RLS is enabled
-- with explicit insert/select policies for the anon role. Statements are
-- idempotent so this file can be re-run safely in the Supabase SQL editor.
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact"
  ON contact_submissions FOR INSERT TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_contact" ON contact_submissions;
CREATE POLICY "anon_select_contact"
  ON contact_submissions FOR SELECT TO anon
  USING (true);

DROP POLICY IF EXISTS "anon_insert_job" ON job_applications;
CREATE POLICY "anon_insert_job"
  ON job_applications FOR INSERT TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_job" ON job_applications;
CREATE POLICY "anon_select_job"
  ON job_applications FOR SELECT TO anon
  USING (true);
