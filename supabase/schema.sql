-- Email Subscriptions Table
CREATE TABLE IF NOT EXISTS email_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  source VARCHAR(100), -- e.g., 'landing_page', 'about_page'
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Investor Inquiries Table
CREATE TABLE IF NOT EXISTS investor_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  investment_interest TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, closed
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Partner Applications Table
CREATE TABLE IF NOT EXISTS partner_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  partner_type VARCHAR(100), -- advertiser, mediator, designer, ad_space_owner
  experience_years INTEGER,
  portfolio_url TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending', -- pending, reviewing, approved, rejected
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Survey Responses Table
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stakeholder_type VARCHAR(100) NOT NULL, -- advertiser, mediator, designer, ad_space_owner
  responses JSONB NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address VARCHAR(100),
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

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

-- FAQ Requests Table (visitors can submit new questions)
CREATE TABLE IF NOT EXISTS faq_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  question TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'new',
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Waitlist Table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  user_type VARCHAR(100), -- advertiser, mediator, designer, ad_space_owner
  location VARCHAR(255),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  priority_score INTEGER DEFAULT 0,
  is_notified BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Push Notification Subscriptions
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT UNIQUE NOT NULL,
  keys JSONB NOT NULL,
  interests TEXT[] DEFAULT ARRAY[]::TEXT[],
  metadata JSONB DEFAULT '{}'::jsonb,
  expiration_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Events Table (for tracking user behavior)
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  event_properties JSONB DEFAULT '{}'::jsonb,
  user_id UUID,
  session_id VARCHAR(255),
  page_url TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address VARCHAR(100),
  user_agent TEXT
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_email ON email_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_investor_inquiries_status ON investor_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_investor_inquiries_created_at ON investor_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_partner_applications_type ON partner_applications(partner_type);
CREATE INDEX IF NOT EXISTS idx_survey_responses_type ON survey_responses(stakeholder_type);
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_faq_requests_status ON faq_requests(status);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_endpoint ON push_subscriptions(endpoint);
CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);

-- Row Level Security Policies (Optional - Enable if needed)
-- ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE investor_inquiries ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
