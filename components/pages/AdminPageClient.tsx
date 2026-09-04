"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  ExternalLink,
  Inbox,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type FeedbackRow = {
  id: string;
  full_name?: string | null;
  email?: string | null;
  role?: string | null;
  status?: string | null;
  created_at?: string | null;
  college_name?: string | null;
  department?: string | null;
  year?: string | null;
  interested_domain?: string | null;
  session_feedback?: string | null;
  guidance_feedback?: string | null;
  project_training_feedback?: string | null;
  session_rating?: number | null;
  guidance_rating?: number | null;
  project_training_rating?: number | null;
  client_service?: string | null;
  intern_role?: string | null;
  intern_time?: string | null;
  feedback_about?: string | null;
  feedback_1?: string | null;
  feedback_2?: string | null;
  feedback_3?: string | null;
  rating_1?: number | null;
  rating_2?: number | null;
  rating_3?: number | null;
  nexgenads_followed?: boolean | null;
  onedotgrow_followed?: boolean | null;
  review_left?: boolean | null;
};

type CareerRow = {
  id: string;
  job_id?: string | null;
  job_title?: string | null;
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  current_location?: string | null;
  experience?: string | null;
  current_company?: string | null;
  resume_link?: string | null;
  linkedin_profile?: string | null;
  portfolio_link?: string | null;
  cover_letter?: string | null;
  applied_at?: string | null;
  status?: string | null;
};

const FEEDBACK_STATUSES = ["new", "reviewed", "contacted", "closed"];
const CAREER_STATUSES = [
  "new",
  "reviewing",
  "shortlisted",
  "interview",
  "rejected",
  "hired",
];
const ROLES = ["student", "client", "intern", "public"];

const ROLE_BADGE: Record<string, string> = {
  student: "bg-brand-500/10 text-brand-600 border-brand-500/20",
  client: "bg-gold-500/10 text-gold-600 border-gold-500/20",
  intern: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  public: "bg-teal-500/10 text-teal-600 border-teal-500/20",
};

const STATUS_BADGE: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  reviewed: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  contacted: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  closed: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  reviewing: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  shortlisted: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  interview: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  rejected: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  hired: "bg-green-500/10 text-green-600 border-green-500/20",
};

const FEEDBACK_ITEMS: Record<string, { key: string; label: string; rating: string }[]> = {
  student: [
    { key: "session_feedback", label: "Session feedback", rating: "session_rating" },
    { key: "guidance_feedback", label: "Guidance feedback", rating: "guidance_rating" },
    {
      key: "project_training_feedback",
      label: "Project / training feedback",
      rating: "project_training_rating",
    },
  ],
  client: [
    { key: "feedback_1", label: "Service feedback", rating: "rating_1" },
    { key: "feedback_2", label: "Communication", rating: "rating_2" },
    { key: "feedback_3", label: "Overall experience", rating: "rating_3" },
  ],
  intern: [
    { key: "feedback_1", label: "Internship experience", rating: "rating_1" },
    { key: "feedback_2", label: "Mentorship & guidance", rating: "rating_2" },
    { key: "feedback_3", label: "Learning & skills", rating: "rating_3" },
  ],
  public: [
    { key: "feedback_1", label: "Workshops & events", rating: "rating_1" },
    { key: "feedback_2", label: "Products & services", rating: "rating_2" },
    { key: "feedback_3", label: "Overall experience", rating: "rating_3" },
  ],
};

const TABLE_SQL: Record<string, string> = {
  feedback_submissions: `CREATE TABLE IF NOT EXISTS feedback_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  google_id VARCHAR(255),
  college_name VARCHAR(255),
  department VARCHAR(255),
  year VARCHAR(50),
  interested_domain VARCHAR(255),
  session_feedback TEXT,
  guidance_feedback TEXT,
  project_training_feedback TEXT,
  session_rating INT,
  guidance_rating INT,
  project_training_rating INT,
  client_service VARCHAR(255),
  intern_role VARCHAR(255),
  intern_time VARCHAR(255),
  feedback_about VARCHAR(255),
  feedback_1 TEXT,
  feedback_2 TEXT,
  feedback_3 TEXT,
  rating_1 INT,
  rating_2 INT,
  rating_3 INT,
  nexgenads_followed BOOLEAN DEFAULT FALSE,
  onedotgrow_followed BOOLEAN DEFAULT FALSE,
  review_left BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'new',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE feedback_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_feedback" ON feedback_submissions;
CREATE POLICY "anon_insert_feedback" ON feedback_submissions FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "anon_select_feedback" ON feedback_submissions;
CREATE POLICY "anon_select_feedback" ON feedback_submissions FOR SELECT TO anon USING (true);`,
  job_applications: `CREATE TABLE IF NOT EXISTS job_applications (
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
  status VARCHAR(50) DEFAULT 'new',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_job" ON job_applications;
CREATE POLICY "anon_insert_job" ON job_applications FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "anon_select_job" ON job_applications;
CREATE POLICY "anon_select_job" ON job_applications FOR SELECT TO anon USING (true);`,
};

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.86 11.86 0 0 0 1 12c0 1.9.44 3.68 1.18 5.28l2.52-2.52.14-.67z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
    <path
      fill="#C5221F"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
  </svg>
);

const formatDate = (value?: string | null) =>
  value
    ? new Date(value).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "-";

const initials = (name?: string | null) =>
  (name || "?")
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Stars = ({ value }: { value?: number }) => {
  const rating = Math.max(0, Math.min(5, Number(value) || 0));
  return (
    <span
      className="inline-flex items-center gap-0.5 text-sm text-gold-500"
      title={`${rating} / 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-3.5 w-3.5",
            star <= rating ? "fill-gold-500 text-gold-500" : "text-muted-foreground/25",
          )}
        />
      ))}
    </span>
  );
};

const Detail = ({ label, value }: { label: string; value?: React.ReactNode }) => (
  <div>
    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {label}
    </p>
    <p className="mt-0.5 whitespace-pre-line text-sm font-medium text-foreground">
      {value ?? "-"}
    </p>
  </div>
);

const getVal = (row: FeedbackRow, key: string): unknown =>
  (row as Record<string, unknown>)[key];

const toRating = (row: FeedbackRow, key?: string) =>
  Math.max(0, Math.min(5, Number(key ? getVal(row, key) : 0) || 0));

const toText = (row: FeedbackRow, key?: string) =>
  String(key ? getVal(row, key) ?? "" : "");

export default function AdminPageClient() {
  const [status, setStatus] = useState<
    "loading" | "unauthorized" | "forbidden" | "ready" | "error"
  >("loading");
  const [error, setError] = useState("");
  const [user, setUser] = useState<{
    name: string;
    email: string;
    picture?: string | null;
  } | null>(null);
  const [data, setData] = useState<{
    feedback: { total: number; byRole: Record<string, number>; byStatus: Record<string, number>; rows: FeedbackRow[] };
    career: { total: number; byStatus: Record<string, number>; byJob: Record<string, number>; rows: CareerRow[] };
  } | null>(null);
  const [missingTables, setMissingTables] = useState<string[]>([]);

  const [tab, setTab] = useState<"feedback" | "career">("feedback");
  const [fbSearch, setFbSearch] = useState("");
  const [fbRole, setFbRole] = useState("all");
  const [fbStatus, setFbStatus] = useState("all");
  const [careerSearch, setCareerSearch] = useState("");
  const [careerStatus, setCareerStatus] = useState("all");
  const [careerJob, setCareerJob] = useState("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [signedOut, setSignedOut] = useState(false);
  const [copiedSetup, setCopiedSetup] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/admin/data");
      if (response.status === 401) {
        setStatus("unauthorized");
        return;
      }
      if (response.status === 403) {
        setStatus("forbidden");
        const body = await response.json().catch(() => ({}));
        setError(body?.error || "You are not authorized to view this dashboard.");
        return;
      }
      if (!response.ok) throw new Error("Failed to load data");
      const body = await response.json();
      setUser(body.user);
      setData(body);
      setMissingTables(body?.setup?.missingTables || []);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to load data");
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const signIn = () => {
    window.location.href = "/api/auth/google?returnTo=/admin";
  };

  const signOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setSignedOut(true);
      setStatus("unauthorized");
    }
  };

  const filteredFeedback = useMemo(() => {
    if (!data) return [];
    const q = fbSearch.trim().toLowerCase();
    return data.feedback.rows.filter((row) => {
      if (fbRole !== "all" && row.role !== fbRole) return false;
      if (fbStatus !== "all" && (row.status || "new") !== fbStatus) return false;
      if (q) {
        const haystack =
          `${row.full_name} ${row.email} ${row.college_name} ${row.client_service} ${row.intern_role} ${row.feedback_about}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [data, fbSearch, fbRole, fbStatus]);

  const filteredCareer = useMemo(() => {
    if (!data) return [];
    const q = careerSearch.trim().toLowerCase();
    return data.career.rows.filter((row) => {
      if (careerStatus !== "all" && (row.status || "new") !== careerStatus) return false;
      if (careerJob !== "all" && row.job_title !== careerJob) return false;
      if (q) {
        const haystack =
          `${row.full_name} ${row.email} ${row.phone} ${row.job_title} ${row.current_location} ${row.current_company}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [data, careerSearch, careerStatus, careerJob]);

  const toggleRow = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const composeMail = (
    email?: string | null,
    subject?: string,
    body?: string,
  ) => {
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (body) params.set("body", body);
    const query = params.toString();
    return `mailto:${email || ""}${query ? `?${query}` : ""}`;
  };

  const feedbackSubject = (row: FeedbackRow) =>
    `NexGenAds Feedback – ${row.full_name || "Anonymous"} (${row.role || "unknown"})`;
  const feedbackBody = (row: FeedbackRow) =>
    (FEEDBACK_ITEMS[row.role || "student"] || [])
      .map((item) => `${item.label}:\n${toText(row, item.key) || "(n/a)"}`)
      .join("\n\n");
  const careerSubject = (row: CareerRow) =>
    `${row.job_title || "Job application"} – ${row.full_name || "Candidate"}`;

  const copySetup = (table: string) => {
    const sql = TABLE_SQL[table];
    if (!sql) return;
    navigator.clipboard.writeText(sql).then(() => {
      setCopiedSetup(table);
      setTimeout(() => setCopiedSetup(null), 2000);
    });
  };

  const feedbackFooterText = (row: FeedbackRow) =>
    [
      row.nexgenads_followed ? "Followed NexGenAds" : "",
      row.onedotgrow_followed ? "Followed 1Grow" : "",
      row.review_left ? "Left Google review" : "",
    ]
      .filter(Boolean)
      .join(" · ");

  const renderStatusBadge = (value?: string | null) => (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize",
        STATUS_BADGE[value || "new"] || "bg-muted text-muted-foreground border-border",
      )}
    >
      {value || "new"}
    </span>
  );

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
          <p className="text-sm font-medium">Loading admin dashboard…</p>
        </div>
      </div>
    );
  }

  if (status === "unauthorized") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
        <div className="animate-fade-in w-full max-w-md rounded-3xl border border-border/70 bg-white p-8 shadow-xl shadow-brand-500/5">
          <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-xl shadow-brand-500/30">
            <Lock className="h-7 w-7" />
          </span>
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            {signedOut ? "Signed out" : "Admin access"}
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Sign in with your authorized Google account to view the NexGenAds
            feedback &amp; careers dashboard. Only approved emails can access
            this page.
          </p>
          <Button
            size="lg"
            onClick={signIn}
            className="w-full rounded-xl border border-brand-500/25 bg-white py-5 text-base font-semibold text-foreground shadow-sm transition-all hover:bg-brand-50"
          >
            <GoogleIcon /> Continue with Google
          </Button>
        </div>
      </div>
    );
  }

  if (status === "forbidden" || status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
        <div className="animate-fade-in w-full max-w-md rounded-3xl border border-border/70 bg-white p-8 shadow-xl shadow-brand-500/5">
          <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <h1 className="mb-2 text-2xl font-bold text-foreground">Access denied</h1>
          <p className="mb-6 text-sm text-muted-foreground">{error}</p>
          <Button
            size="lg"
            onClick={signOut}
            variant="outline"
            className="w-full rounded-xl py-5"
          >
            Sign out and try a different account
          </Button>
        </div>
      </div>
    );
  }

  const { feedback, career } = data!;
  const statCard = (
    label: string,
    value: number,
    icon: React.ReactNode,
    accent: string,
  ) => (
    <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl",
            accent,
          )}
        >
          {icon}
        </span>
      </div>
      <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
        {value.toLocaleString()}
      </p>
    </div>
  );

  const renderFilterBar = () => (
    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-border/70 bg-white/70 p-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Input
          value={tab === "feedback" ? fbSearch : careerSearch}
          onChange={(e) =>
            tab === "feedback"
              ? setFbSearch(e.target.value)
              : setCareerSearch(e.target.value)
          }
          placeholder={
            tab === "feedback"
              ? "Search name, email, college, service…"
              : "Search name, email, phone, role…"
          }
          className="h-11 rounded-xl border-border/70 bg-white pl-4 shadow-sm hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>
      {tab === "feedback" ? (
        <>
          <div className="w-full sm:w-44">
            <Select value={fbRole} onValueChange={setFbRole}>
              <SelectTrigger className="h-11 w-full rounded-xl border-border/70 bg-white shadow-sm hover:border-brand-400">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                {ROLES.map((role) => (
                  <SelectItem key={role} value={role} className="capitalize">
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-44">
            <Select value={fbStatus} onValueChange={setFbStatus}>
              <SelectTrigger className="h-11 w-full rounded-xl border-border/70 bg-white shadow-sm hover:border-brand-400">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {FEEDBACK_STATUSES.map((status) => (
                  <SelectItem key={status} value={status} className="capitalize">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      ) : (
        <>
          <div className="w-full sm:w-44">
            <Select value={careerStatus} onValueChange={setCareerStatus}>
              <SelectTrigger className="h-11 w-full rounded-xl border-border/70 bg-white shadow-sm hover:border-brand-400">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {CAREER_STATUSES.map((status) => (
                  <SelectItem key={status} value={status} className="capitalize">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-52">
            <Select value={careerJob} onValueChange={setCareerJob}>
              <SelectTrigger className="h-11 w-full rounded-xl border-border/70 bg-white shadow-sm hover:border-brand-400">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                {Object.keys(career.byJob)
                  .sort()
                  .map((job) => (
                    <SelectItem key={job} value={job}>
                      {job}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}
      {(tab === "feedback"
        ? fbSearch || fbRole !== "all" || fbStatus !== "all"
        : careerSearch || careerStatus !== "all" || careerJob !== "all") && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (tab === "feedback") {
              setFbSearch("");
              setFbRole("all");
              setFbStatus("all");
            } else {
              setCareerSearch("");
              setCareerStatus("all");
              setCareerJob("all");
            }
          }}
          className="h-11 rounded-xl text-muted-foreground hover:text-foreground"
        >
          Clear filters
        </Button>
      )}
    </div>
  );

  const renderFeedbackRow = (row: FeedbackRow) => {
    const isExpanded = expanded.has(row.id);
    const role = row.role || "public";
    const detailItems: { label: string; value?: React.ReactNode }[] = [];
    if (role === "student") {
      detailItems.push(
        { label: "College", value: row.college_name },
        { label: "Department", value: row.department },
        { label: "Year", value: row.year },
        { label: "Interested domains", value: row.interested_domain },
      );
    }
    if (role === "client") detailItems.push({ label: "Service", value: row.client_service });
    if (role === "intern") {
      detailItems.push(
        { label: "Internship role", value: row.intern_role },
        { label: "Preferred timing", value: row.intern_time },
      );
    }
    if (role === "public") detailItems.push({ label: "Feedback about", value: row.feedback_about });

    return (
      <div
        key={row.id}
        className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-shadow hover:shadow-md"
      >
        <button
          type="button"
          onClick={() => toggleRow(row.id)}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-xs font-bold text-white">
            {initials(row.full_name)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold text-foreground">
              {row.full_name || "Anonymous"}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {row.email}
            </span>
          </span>
          <span className="hidden shrink-0 md:block">
            <Stars value={toRating(row, FEEDBACK_ITEMS[role]?.[0]?.rating)} />
          </span>
          <span className="hidden shrink-0 sm:block">
            {renderStatusBadge(row.status)}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
        </button>

        <div className="flex flex-wrap items-center gap-2 px-4 pb-3 sm:px-5">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize",
              ROLE_BADGE[role],
            )}
          >
            <Users className="mr-1 h-3 w-3" /> {role}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" /> {formatDate(row.created_at)}
          </span>
          <span className="sm:hidden">{renderStatusBadge(row.status)}</span>
          {feedbackFooterText(row) && (
            <span className="inline-flex items-center gap-1 text-xs text-green-600">
              <CheckCircle2 className="h-3.5 w-3.5" /> {feedbackFooterText(row)}
            </span>
          )}
          <span className="ml-auto flex shrink-0 items-center gap-1.5">
            <a
              href={composeMail(row.email, feedbackSubject(row), feedbackBody(row))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-500/25 bg-brand-500/10 text-brand-600 transition-colors hover:bg-brand-500 hover:text-white"
              title={`Email ${row.full_name || row.email}`}
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
          </span>
        </div>

        {isExpanded && (
          <div className="border-t border-border/60 bg-gradient-to-b from-brand-50/40 to-transparent px-4 py-4 sm:px-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {detailItems.map((item) => (
                <Detail key={item.label} label={item.label} value={item.value} />
              ))}
              <Detail label="Email" value={row.email} />
            </div>

            <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Feedback &amp; ratings
            </p>
            <div className="grid gap-3 lg:grid-cols-3">
              {(FEEDBACK_ITEMS[role] || []).map((item) => (
                <div
                  key={item.key}
                  className="rounded-xl border border-border/60 bg-white p-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <Stars value={toRating(row, item.rating)} />
                  </div>
                  <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {toText(row, item.key) || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCareerRow = (row: CareerRow) => {
    const isExpanded = expanded.has(row.id);
    return (
      <div
        key={row.id}
        className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-shadow hover:shadow-md"
      >
        <button
          type="button"
          onClick={() => toggleRow(row.id)}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 text-xs font-bold text-white">
            {initials(row.full_name)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold text-foreground">
              {row.full_name || "Candidate"}
            </span>
            <span className="block truncate text-xs font-semibold text-brand-600">
              {row.job_title || "Unknown role"}
            </span>
          </span>
          <span className="hidden shrink-0 md:block">{renderStatusBadge(row.status)}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
        </button>

        <div className="flex flex-wrap items-center gap-2 px-4 pb-3 sm:px-5">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5" /> {row.experience || "-"}
          </span>
          {row.current_location && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {row.current_location}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" /> {formatDate(row.applied_at)}
          </span>
          <span className="md:hidden">{renderStatusBadge(row.status)}</span>
          {row.resume_link && (
            <a
              href={row.resume_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-foreground/80 transition-colors hover:border-brand-400 hover:text-brand-600"
            >
              <ClipboardCheck className="h-3 w-3" /> Resume
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          )}
          <span className="ml-auto flex shrink-0 items-center gap-1.5">
            {row.phone && (
              <a
                href={`tel:${row.phone}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-green-500/25 bg-green-500/10 text-green-600 transition-colors hover:bg-green-500 hover:text-white"
                title={`Call ${row.full_name || row.phone}`}
              >
                <Phone className="h-3.5 w-3.5" />
              </a>
            )}
            <a
              href={composeMail(row.email, careerSubject(row))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-500/25 bg-brand-500/10 text-brand-600 transition-colors hover:bg-brand-500 hover:text-white"
              title={`Email ${row.full_name || row.email}`}
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
          </span>
        </div>

        {isExpanded && (
          <div className="border-t border-border/60 bg-gradient-to-b from-gold-500/10 to-transparent px-4 py-4 sm:px-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Detail label="Email" value={row.email} />
              <Detail label="Phone" value={row.phone} />
              <Detail label="Current company" value={row.current_company} />
              <Detail label="Current location" value={row.current_location} />
              <Detail label="Experience" value={row.experience} />
              <Detail label="Job ID" value={row.job_id} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {row.resume_link && (
                <Button asChild variant="outline" size="sm" className="rounded-xl">
                  <a href={row.resume_link} target="_blank" rel="noopener noreferrer">
                    <ClipboardCheck className="h-4 w-4" /> Resume
                  </a>
                </Button>
              )}
              {row.linkedin_profile && (
                <Button asChild variant="outline" size="sm" className="rounded-xl">
                  <a
                    href={row.linkedin_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" /> LinkedIn
                  </a>
                </Button>
              )}
              {row.portfolio_link && (
                <Button asChild variant="outline" size="sm" className="rounded-xl">
                  <a
                    href={row.portfolio_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" /> Portfolio
                  </a>
                </Button>
              )}
              {row.phone && (
                <Button asChild size="sm" className="rounded-xl bg-green-600 hover:bg-green-700">
                  <a href={`tel:${row.phone}`}>
                    <Phone className="h-4 w-4" /> Call
                  </a>
                </Button>
              )}
              <Button asChild size="sm" className="rounded-xl bg-brand-gradient">
                <a href={composeMail(row.email, careerSubject(row))}>
                  <Mail className="h-4 w-4" /> Email
                </a>
              </Button>
            </div>
            {row.cover_letter && (
              <div className="mt-4">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Cover letter
                </p>
                <p className="whitespace-pre-line rounded-xl border border-border/60 bg-white p-3.5 text-sm leading-relaxed text-muted-foreground">
                  {row.cover_letter}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/80 via-white to-gold-500/10">
        <div className="container-custom mx-auto max-w-6xl px-4 pb-10 pt-28 md:px-6 md:pt-36">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1
                className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl"
                style={{ fontFamily: "var(--font-neue-machina)" }}
              >
                Admin <span className="text-[#1d36bf]">Dashboard</span>
              </h1>

            </div>
            <div className="flex items-center gap-3">
            
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-foreground">{user?.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="rounded-xl"
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Missing tables setup notice */}
      {missingTables.length > 0 && (
        <section className="container-custom mx-auto max-w-6xl px-4 pt-8 md:px-6">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold text-foreground">
                  Supabase tables missing
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  The following tables are not present in your Supabase project:{" "}
                  <span className="font-semibold text-foreground">
                    {missingTables.join(", ")}
                  </span>
                  . Open the{" "}
                  <span className="font-semibold">Supabase SQL Editor</span>,
                  paste the SQL below (or the full{" "}
                  <span className="inline-flex items-center gap-0.5 font-mono text-xs">
                    supabase/schema.sql
                  </span>{" "}
                  from the repo) and run it.
                </p>
                {missingTables.map((table) => (
                  <div key={table} className="mt-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-mono text-xs font-bold text-foreground">
                        {table}
                      </p>
                      <button
                        type="button"
                        onClick={() => copySetup(table)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-white px-3 py-1 text-[11px] font-semibold text-foreground/80 transition-colors hover:border-brand-400 hover:text-brand-600"
                      >
                        {copiedSetup === table ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> Copied!
                          </>
                        ) : (
                          <>
                            <ClipboardCheck className="h-3.5 w-3.5" /> Copy SQL
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="mt-2 max-h-56 overflow-auto rounded-xl border border-border/70 bg-slate-950 p-3.5 text-[11px] leading-relaxed text-slate-100">
                      {TABLE_SQL[table]}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="container-custom mx-auto max-w-6xl px-4 pt-8 md:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {statCard(
            "Total feedback",
            feedback.total,
            <Inbox className="h-4 w-4 text-brand-600" />,
            "bg-brand-500/10",
          )}
          {statCard(
            "Total applications",
            career.total,
            <Briefcase className="h-4 w-4 text-gold-600" />,
            "bg-gold-500/10",
          )}
          {statCard(
            "New feedback",
            feedback.byStatus["new"] || 0,
            <Star className="h-4 w-4 text-blue-600" />,
            "bg-blue-500/10",
          )}
          {statCard(
            "New applications",
            career.byStatus["new"] || 0,
            <Users className="h-4 w-4 text-green-600" />,
            "bg-green-500/10",
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {ROLES.map((role) => (
            <div
              key={role}
              className="rounded-2xl border border-border/70 bg-white/70 px-4 py-3 shadow-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {role} feedback
              </p>
              <p className="mt-0.5 text-xl font-bold text-foreground">
                {feedback.byRole[role] || 0}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Data section */}
      <section className="container-custom mx-auto max-w-6xl px-4 pt-10 md:px-6">
        {/* Tabs */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="mr-1 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-brand-600"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          {[
            { key: "feedback", label: "Feedback forms", icon: Inbox },
            { key: "career", label: "Career applications", icon: Briefcase },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key as "feedback" | "career")}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
                tab === key
                  ? "bg-brand-gradient text-white shadow-lg shadow-brand-500/25"
                  : "border border-border/70 bg-white text-foreground/70 hover:border-brand-400 hover:text-brand-600",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold",
                  tab === key
                    ? "bg-white/20 text-white"
                    : "bg-brand-500/10 text-brand-600",
                )}
              >
                {key === "feedback" ? feedback.total : career.total}
              </span>
            </button>
          ))}
        </div>

        {renderFilterBar()}

        {tab === "feedback" ? (
          <>
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              Showing{" "}
              <span className="font-bold text-foreground">
                {filteredFeedback.length}
              </span>{" "}
              of {feedback.total} feedback submissions
            </p>
            {filteredFeedback.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-white/60 px-6 py-14 text-center">
                <Inbox className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm font-semibold text-foreground">No feedback found</p>
                <p className="text-xs text-muted-foreground">
                  Try clearing the filters or search with different keywords.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFeedback.map(renderFeedbackRow)}
              </div>
            )}
          </>
        ) : (
          <>
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              Showing{" "}
              <span className="font-bold text-foreground">{filteredCareer.length}</span> of{" "}
              {career.total} applications
            </p>
            {filteredCareer.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-white/60 px-6 py-14 text-center">
                <Briefcase className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm font-semibold text-foreground">
                  No applications found
                </p>
                <p className="text-xs text-muted-foreground">
                  Try clearing the filters or search with different keywords.
                </p>
              </div>
            ) : (
              <div className="space-y-3">{filteredCareer.map(renderCareerRow)}</div>
            )}
          </>
        )}
      </section>
    </div>
  );
}