export const applications = [
  {
    id: 1,
    position: "Senior Product Designer",
    company: "TechCorp",
    status: "pending",
    appliedDate: "2 days ago",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
  },
  {
    id: 2,
    position: "Full Stack Developer",
    company: "StartupXYZ",
    status: "accepted",
    appliedDate: "5 days ago",
    location: "New York, NY",
    salary: "$100k - $130k",
  },
  {
    id: 3,
    position: "Data Scientist",
    company: "DataInc",
    status: "rejected",
    appliedDate: "1 week ago",
    location: "Remote",
    salary: "$110k - $140k",
  },
];

export const savedJobs = [
  {
    id: 1,
    position: "Product Manager",
    company: "InnovateCo",
    location: "Boston, MA",
    salary: "$130k - $160k",
    savedDate: "3 days ago",
  },
  {
    id: 2,
    position: "DevOps Engineer",
    company: "CloudSystems",
    location: "Austin, TX",
    salary: "$105k - $135k",
    savedDate: "1 week ago",
  },
];

export const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
] as const;

export const skillsGroupOptions = [
  {
    heading: "Frontend Frameworks",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue.js" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
    ],
  },
  {
    heading: "Backend Technologies",
    options: [
      { value: "nodejs", label: "Node.js" },
      { value: "django", label: "Django" },
      { value: "rails", label: "Ruby on Rails" },
      { value: "spring", label: "Spring Boot" },
    ],
  },
  {
    heading: "Databases",
    options: [
      { value: "postgresql", label: "PostgreSQL" },
      { value: "mongodb", label: "MongoDB" },
      { value: "redis", label: "Redis" },
      { value: "mysql", label: "MySQL" },
    ],
  },
];

export const experienceOps = [
  { value: "0-1", label: "0-1 years" },
  { value: "2-3", label: "2-3 years" },
  { value: "3-4", label: "3-4 years" },
  { value: "4-5", label: "4-5 years" },
  { value: "5-7", label: "5-7 years" },
  { value: "6-8", label: "6-8 years" },
  { value: "8-10", label: "8-10 years" },
  { value: "10+", label: "10+ years" },
] as const;

export const skillLevels = [
  { value: "entry-level", label: "Entry Level" },
  { value: "junior", label: "Junior" },
  { value: "mid-level", label: "Mid-Level" },
  { value: "senior", label: "Senior" },
  { value: "expert", label: "Expert" },
] as const;

export const companySizeOps = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000-5000", label: "1000-5000 employees" },
  { value: "5000+", label: "5000+ employees" },
] as const;

export const industries = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "hospitality", label: "Hospitality" },
  { value: "construction", label: "Construction" },
  { value: "transportation", label: "Transportation" },
  { value: "energy", label: "Energy" },
] as const;

export const jobTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "cantact", label: "Contract" },
  { value: "emporary", label: "Temporary" },
  { value: "internship", label: "Internship" },
];

export const jobBenefits = [
  { label: "Health Insurance", value: "Health Insurance" },
  { label: "Life Insurance", value: "Life Insurance" },
  { label: "Remote Work", value: "Remote Work" },
  { label: "Paid Time Off (PTO)", value: "Paid Time Off (PTO)" },
  { label: "Work From Home", value: "Work From Home" },
  { label: "Flexible Schedule", value: "Flexible Schedule" },
  { label: "Performance Bonus", value: "Performance Bonus" },
  { label: "Yearly Increment", value: "Yearly Increment" },
  { label: "Retirement Plan", value: "Retirement Plan" },
  { label: "Lunch Provided", value: "Lunch Provided" },
  { label: "Snacks & Drinks", value: "Snacks & Drinks" },
  { label: "Transportation Allowance", value: "Transportation Allowance" },
  { label: "Medical Reimbursement", value: "Medical Reimbursement" },
  { label: "Stock Options (ESOP)", value: "Stock Options (ESOP)" },
  { label: "Employee Discount", value: "Employee Discount" },
  { label: "Parental Leave", value: "Parental Leave" },
  { label: "On-site Gym", value: "On-site Gym" },
  { label: "Training & Development", value: "Training & Development" },
  { label: "Professional Growth Support", value: "Professional Growth Support" },
  { label: "Internet Allowance", value: "Internet Allowance" },
  { label: "Housing Allowance", value: "Housing Allowance" },
  { label: "Commission Pay", value: "Commission Pay" },
];

export const languages = [
  { value: "english", label: "English" },
  { value: "bangla", label: "Bangla" },
  { value: "hindi", label: "Hindi" },
  { value: "urdu", label: "Urdu" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "mandarin", label: "Mandarin" },
  { value: "arabic", label: "Arabic" },
  { value: "russian", label: "Russian" },
  { value: "japanese", label: "Japanese" },
  { value: "portuguese", label: "Portuguese" },
];
