// ============================================
// JOB OPENINGS DATA
// ============================================

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  preferredSkills: string[];
  salary?: string;
  postedDate: string;
  active: boolean;
}

export const jobOpenings: JobOpening[] =
[
  {
    "id": "job-001",
    "title": "React App Developer",
    "department": "Engineering",
    "location": "Remote / Hybrid",
    "employmentType": "Part-time",
    "experience": "Fresher with strong fundamentals in React, JavaScript, HTML, CSS",
    "description": "Work on building and improving frontend features for our startup products using React.",
    "responsibilities": [
      "Develop reusable React components",
      "Integrate APIs with frontend UI",
      "Fix bugs and improve performance",
      "Collaborate with backend and design teams"
    ],
    "qualifications": [
      "Basic to strong knowledge of React",
      "Good understanding of JavaScript and ES6+",
      "Familiarity with Git and version control"
    ],
    "preferredSkills": [
      "Next.js",
      "Tailwind CSS",
      "Basic TypeScript knowledge"
    ],
    "postedDate": "2025-06-01",
    "active": true
  },
  {
    "id": "job-002",
    "title": "Node.js Backend Developer",
    "department": "Engineering",
    "location": "Remote / Hybrid",
    "employmentType": "Part-time",
    "experience": "Fresher with strong knowledge of Node.js and backend concepts",
    "description": "Build and maintain backend services and APIs for startup applications.",
    "responsibilities": [
      "Develop REST APIs using Node.js",
      "Work with databases and authentication",
      "Optimize backend performance",
      "Support frontend integration"
    ],
    "qualifications": [
      "Strong understanding of Node.js",
      "Basic knowledge of Express.js",
      "Understanding of REST APIs"
    ],
    "preferredSkills": [
      "MongoDB",
      "JWT authentication",
      "Basic cloud knowledge"
    ],
    "postedDate": "2025-06-01",
    "active": true
  },
  {
    "id": "job-003",
    "title": "Java Developer",
    "department": "Engineering",
    "location": "Remote / Hybrid",
    "employmentType": "Part-time",
    "experience": "Fresher with solid Java and OOP concepts",
    "description": "Assist in building backend services, utilities, and business logic using Java.",
    "responsibilities": [
      "Write clean and maintainable Java code",
      "Implement business logic",
      "Fix bugs and support testing",
      "Learn and follow coding standards"
    ],
    "qualifications": [
      "Strong understanding of Java",
      "Knowledge of OOP principles",
      "Basic understanding of data structures"
    ],
    "preferredSkills": [
      "Spring Boot basics",
      "REST API concepts",
      "SQL fundamentals"
    ],
    "postedDate": "2025-06-01",
    "active": true
  },
  {
    "id": "job-004",
    "title": "Content Creator",
    "department": "Marketing",
    "location": "Remote",
    "employmentType": "Part-time",
    "experience": "Fresher with strong writing and creative skills",
    "description": "Create engaging content for blogs, social media, and product documentation.",
    "responsibilities": [
      "Write clear and engaging content",
      "Research industry-related topics",
      "Collaborate with marketing and product teams",
      "Maintain content consistency"
    ],
    "qualifications": [
      "Strong written English skills",
      "Ability to explain technical topics simply",
      "Basic research skills"
    ],
    "preferredSkills": [
      "SEO basics",
      "Blog writing",
      "Social media content creation"
    ],
    "postedDate": "2025-06-01",
    "active": true
  },
  {
    "id": "job-005",
    "title": "Graphic Designer",
    "department": "Design",
    "location": "Remote / Hybrid",
    "employmentType": "Part-time",
    "experience": "Fresher with strong design fundamentals",
    "description": "Design visual assets for web, mobile apps, and marketing materials.",
    "responsibilities": [
      "Create UI and marketing designs",
      "Maintain brand consistency",
      "Work with developers on design implementation",
      "Revise designs based on feedback"
    ],
    "qualifications": [
      "Strong design sense",
      "Knowledge of design tools",
      "Understanding of color and typography"
    ],
    "preferredSkills": [
      "Figma",
      "Adobe Photoshop",
      "Illustrator"
    ],
    "postedDate": "2025-06-01",
    "active": true
  },
  {
    "id": "job-006",
    "title": "UI/UX Designer",
    "department": "Design",
    "location": "Remote",
    "employmentType": "Part-time",
    "experience": "Fresher with good UX thinking and design skills",
    "description": "Focus on improving user experience and interface design for startup products.",
    "responsibilities": [
      "Design user flows and wireframes",
      "Create interactive prototypes",
      "Conduct basic user research",
      "Collaborate with developers"
    ],
    "qualifications": [
      "Understanding of UX principles",
      "Basic wireframing skills",
      "Problem-solving mindset"
    ],
    "preferredSkills": [
      "Figma",
      "User research basics",
      "Design systems"
    ],
    "postedDate": "2025-06-01",
    "active": true
  },
  {
    "id": "job-007",
    "title": "QA / Software Tester",
    "department": "Quality Assurance",
    "location": "Remote",
    "employmentType": "Part-time",
    "experience": "Fresher with strong attention to detail",
    "description": "Test applications to ensure quality, usability, and reliability.",
    "responsibilities": [
      "Test features manually",
      "Report bugs clearly",
      "Verify bug fixes",
      "Ensure product quality before release"
    ],
    "qualifications": [
      "Basic understanding of software testing",
      "Good analytical skills",
      "Clear communication"
    ],
    "preferredSkills": [
      "Manual testing",
      "Basic automation awareness",
      "Test case writing"
    ],
    "postedDate": "2025-06-01",
    "active": true
  },
  {
    "id": "job-008",
    "title": "Digital Marketing Intern",
    "department": "Marketing",
    "location": "Remote",
    "employmentType": "Internship",
    "experience": "Fresher with interest in marketing and startups",
    "description": "Support digital marketing efforts and learn startup growth strategies.",
    "responsibilities": [
      "Assist in social media campaigns",
      "Track basic analytics",
      "Support content distribution",
      "Learn growth experiments"
    ],
    "qualifications": [
      "Interest in digital marketing",
      "Basic communication skills",
      "Willingness to learn"
    ],
    "preferredSkills": [
      "Social media platforms",
      "Basic analytics",
      "Canva"
    ],
    "postedDate": "2025-06-01",
    "active": true
  }
];

/**
 * Get all active job openings
 */
export function getActiveJobOpenings(): JobOpening[] {
  return jobOpenings.filter((job) => job.active);
}

/**
 * Get job opening by ID
 */
export function getJobOpeningById(id: string): JobOpening | undefined {
  return jobOpenings.find((job) => job.id === id);
}

/**
 * Get job openings by department
 */
export function getJobOpeningsByDepartment(department: string): JobOpening[] {
  return jobOpenings.filter((job) => job.active && job.department === department);
}

/**
 * Get all unique departments
 */
export function getAllDepartments(): string[] {
  const departments = new Set(jobOpenings.map((job) => job.department));
  return Array.from(departments).sort();
}
