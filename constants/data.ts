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
  { value: "0-2", label: "0-2 years" },
  { value: "2-5", label: "2-5 years" },
  { value: "5-7", label: "5-7 years" },
  { value: "7-10", label: "7-10 years" },
  { value: "10+", label: "10+ years" },
] as const;

export const skillLevels = [
  { value: "entry-level", label: "Entry Level" },
  { value: "junior", label: "Junior" },
  { value: "mid-level", label: "Mid-Level" },
  { value: "senior", label: "Senior" },
  { value: "expert", label: "Expert" },
] as const;
