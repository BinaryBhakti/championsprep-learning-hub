export const SUBJECTS_BY_GRADE = {
  11: [
    {
      name: "Accountancy",
      topics: [
        "Introduction to Accounting",
        "Theory Base of Accounting",
        "Recording of Transactions - Journal",
        "Ledger and Trial Balance",
        "Bank Reconciliation Statement",
        "Depreciation, Provisions and Reserves",
        "Bills of Exchange",
        "Financial Statements",
        "Accounts from Incomplete Records",
      ],
    },
    {
      name: "Business Studies",
      topics: [
        "Nature and Purpose of Business",
        "Forms of Business Organisation",
        "Private, Public and Global Enterprises",
        "Business Services",
        "Emerging Modes of Business",
        "Social Responsibility of Business and Business Ethics",
        "Sources of Business Finance",
        "Small Business and Entrepreneurship",
        "Internal Trade",
        "International Business",
      ],
    },
    {
      name: "Economics",
      topics: [
        "Introduction to Microeconomics",
        "Consumer's Equilibrium and Demand",
        "Producer Behaviour and Supply",
        "Forms of Market and Price Determination",
      ],
    },
    {
      name: "Mathematics",
      topics: [
        "Sets and Functions",
        "Complex Numbers and Quadratic Equations",
        "Linear Inequalities",
        "Permutations and Combinations",
        "Binomial Theorem",
        "Sequence and Series",
        "Straight Lines",
        "Conic Sections",
        "Limits and Derivatives",
        "Statistics",
        "Probability",
      ],
    },
  ],
  12: [
    {
      name: "Accountancy",
      topics: [
        "Accounting for Not-for-Profit Organisation",
        "Accounting for Partnership: Basic Concepts",
        "Reconstitution of a Partnership Firm - Admission",
        "Reconstitution of a Partnership Firm - Retirement/Death",
        "Dissolution of Partnership Firm",
        "Accounting for Share Capital",
        "Issue and Redemption of Debentures",
        "Analysis of Financial Statements",
        "Accounting Ratios",
        "Cash Flow Statement",
      ],
    },
    {
      name: "Business Studies",
      topics: [
        "Nature and Significance of Management",
        "Principles of Management",
        "Business Environment",
        "Planning",
        "Organising",
        "Staffing",
        "Directing",
        "Controlling",
        "Financial Management",
        "Financial Markets",
        "Marketing Management",
        "Consumer Protection",
      ],
    },
    {
      name: "Economics",
      topics: [
        "National Income and Related Aggregates",
        "Money and Banking",
        "Determination of Income and Employment",
        "Government Budget and the Economy",
        "Balance of Payments",
      ],
    },
    {
      name: "Mathematics",
      topics: [
        "Relations and Functions",
        "Inverse Trigonometric Functions",
        "Matrices",
        "Determinants",
        "Continuity and Differentiability",
        "Application of Derivatives",
        "Integrals",
        "Application of Integrals",
        "Differential Equations",
        "Vector Algebra",
        "Three Dimensional Geometry",
        "Linear Programming",
      ],
    },
  ],
} as const;

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "te", name: "Telugu" },
  { code: "mr", name: "Marathi" },
  { code: "ta", name: "Tamil" },
  { code: "gu", name: "Gujarati" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
] as const;

export const EDUCATION_BOARDS = ["CBSE", "ICSE", "State Board", "IB"] as const;

export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export const LEARNING_MODES = [
  {
    id: "mcq",
    name: "MCQ Quiz",
    description: "Test your knowledge with multiple choice questions",
    icon: "Brain",
    cost: { Easy: 2, Medium: 3, Hard: 5 },
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "adaptive",
    name: "Adaptive Quiz",
    description: "AI adjusts difficulty based on your performance",
    icon: "Zap",
    cost: { fixed: 15 },
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "flashcards",
    name: "Flash Cards",
    description: "Memorize concepts with spaced repetition",
    icon: "Layers",
    cost: { Easy: 2, Medium: 3, Hard: 5 },
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "casestudy",
    name: "Case Study",
    description: "Apply concepts to real-world business scenarios",
    icon: "FileText",
    cost: { Easy: 2, Medium: 3, Hard: 5 },
    color: "from-orange-500 to-red-500",
  },
  {
    id: "study",
    name: "Study Mode",
    description: "Interactive slides with mind maps",
    icon: "BookOpen",
    cost: { Easy: 2, Medium: 3, Hard: 5 },
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "tutor",
    name: "AI Tutor",
    description: "Chat with an AI tutor for instant help",
    icon: "MessageCircle",
    cost: { free: true },
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "mockexam",
    name: "Mock Exam",
    description: "Full-length board exam simulation",
    icon: "GraduationCap",
    cost: { fixed: 25 },
    color: "from-yellow-500 to-orange-500",
  },
] as const;

export const COIN_PACKS = [
  { id: "coins_100", coins: 100, price: 99, name: "100 Coins", popular: false },
  { id: "coins_220", coins: 220, price: 199, name: "220 Coins", popular: true },
  { id: "coins_350", coins: 350, price: 299, name: "350 Coins", popular: false },
] as const;
