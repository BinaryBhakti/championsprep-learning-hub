import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import {
  Brain,
  Zap,
  Users,
  FileText,
  Coins,
  ArrowRight,
  CheckCircle,
  BarChart3,
  BookOpen,
  GraduationCap,
  Shield,
  Star,
  TrendingUp,
  Mail,
  Calendar,
  Share2,
} from "lucide-react";

export default function Landing() {
  const stats = [
    { value: "18,500+", label: "Commerce learners supported" },
    { value: "92%", label: "Average improvement in concept mastery" },
    { value: "120+", label: "Interactive syllabus topics covered" },
    { value: "4.8/5", label: "Parent satisfaction rating" },
  ];

  const features = [
    {
      icon: <Brain className="h-7 w-7" />,
      title: "Adaptive Concept Journeys",
      description:
        "Every unit begins with a diagnostic pulse. Students see a tailored lesson path focusing on exact CBSE competencies.",
      bullets: [
        "Video explainers",
        "AI-built flashcards",
        "Real-time difficulty adaptation",
      ],
    },
    {
      icon: <FileText className="h-7 w-7" />,
      title: "AI Practice (Board Exam Mirror)",
      description:
        "Generate question sets on-demand: Case studies, HOTS prompts, and Match-the-column.",
      bullets: [
        "Instant marking",
        "Structured explanations",
        "Printable PDFs for offline revision",
      ],
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Parent Command Centre",
      description:
        "Weekly mastery snapshots across Accountancy, Business Studies, and Economics.",
      bullets: [
        "Automated progress mailers",
        "Attendance tracking",
        "Shareable reports for mentors",
      ],
    },
  ];

  const coinPacks = [
    {
      name: "Start Free",
      price: "₹0",
      coins: 50,
      description: "Valid for 7 days",
      popular: false,
    },
    {
      name: "100 Coins",
      price: "₹99",
      coins: 100,
      description: "As you go",
      popular: false,
    },
    {
      name: "220 Coins",
      price: "₹199",
      coins: 220,
      description: "Best Value",
      popular: true,
    },
    {
      name: "350 Coins",
      price: "₹299",
      coins: 350,
      description: "Maximum Savings",
      popular: false,
    },
  ];

  const subjects = [
    {
      name: "Accountancy",
      topics: ["Partnership", "Company Accounts", "Financial Statements", "Cash Flow"],
    },
    {
      name: "Business Studies",
      topics: ["Management", "Marketing", "Financial Markets", "Entrepreneurship"],
    },
    {
      name: "Economics",
      topics: ["Micro", "Macro", "Indian Economic Development", "Budget & Fiscal Policy"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span>CBSE Commerce • Classes 11 & 12</span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Calmer board prep with an{" "}
              <span className="text-primary">AI mentor</span>{" "}
              parents can trust.
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              PrepWyse combines adaptive lessons, AI-generated practice, and
              transparent parent dashboards so every learner walks into board
              exams confident and ready.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/dashboard">
                <Button size="xl" className="group rounded-2xl px-8">
                  View Plans
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="#proof">
                <Button variant="outline" size="xl" className="rounded-2xl px-8">
                  See proof of outcomes
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals / Stats Section */}
      <section id="proof" className="border-y border-border/50 bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">
              The <span className="text-primary">Core Learning Loop</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything designed to help you master CBSE Commerce
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground mb-5">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Coin System Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-gold">
              <Coins className="h-4 w-4" />
              <span>Coin System</span>
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Pay as you <span className="text-primary">Learn</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              No subscriptions. Buy coins and use them for what you need.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {coinPacks.map((pack) => (
              <div
                key={pack.name}
                className={`relative rounded-3xl border bg-card p-6 text-center transition-all duration-300 hover:shadow-lg ${
                  pack.popular
                    ? "border-primary shadow-lg ring-2 ring-primary/20"
                    : "border-border/50 hover:border-primary/30"
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Best Value
                  </div>
                )}
                <div className="mb-4 inline-flex items-center justify-center gap-1 rounded-full bg-gold/10 px-3 py-1">
                  <Coins className="h-4 w-4 text-gold" />
                  <span className="font-semibold text-gold">{pack.coins}</span>
                </div>
                <h3 className="text-lg font-semibold">{pack.name}</h3>
                <p className="text-3xl font-bold mt-2">{pack.price}</p>
                <p className="text-sm text-muted-foreground mt-2">{pack.description}</p>
                <Button
                  variant={pack.popular ? "default" : "outline"}
                  className="w-full mt-6 rounded-xl"
                >
                  {pack.price === "₹0" ? "Start Free" : "Buy Now"}
                </Button>
              </div>
            ))}
          </div>

          {/* Coin Cost Footnote */}
          <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-border/50 bg-background p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Generation Costs
            </h4>
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <p className="text-muted-foreground mb-2">Question Difficulty:</p>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-lg bg-success/10 px-3 py-1 text-success">Easy: 2 coins</span>
                  <span className="rounded-lg bg-warning/10 px-3 py-1 text-warning">Medium: 3 coins</span>
                  <span className="rounded-lg bg-destructive/10 px-3 py-1 text-destructive">Hard: 5 coins</span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Practice Modes:</p>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-lg bg-primary/10 px-3 py-1 text-primary">Adaptive Quizzes: 15 coins</span>
                  <span className="rounded-lg bg-secondary/10 px-3 py-1 text-secondary-foreground">Full Mocks: 25 coins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subject Coverage Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Complete <span className="text-primary">Curriculum</span> Coverage
            </h2>
            <p className="mt-4 text-muted-foreground">
              All CBSE Commerce subjects with comprehensive topic coverage
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
            {subjects.map((subject) => (
              <div
                key={subject.name}
                className="rounded-3xl border border-border/50 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{subject.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {subject.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-xl bg-muted px-3 py-1.5 text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-gold/5 p-8 sm:p-12 max-w-4xl mx-auto text-center">
            <Shield className="mx-auto mb-6 h-16 w-16 text-primary" />
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to start your{" "}
              <span className="text-primary">board exam journey</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join thousands of Commerce students and parents who trust PrepWyse
              for confident exam preparation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="xl" className="group rounded-2xl px-8">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/support">
                <Button variant="outline" size="xl" className="rounded-2xl px-8">
                  Talk to us
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              50 free coins included • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <span className="text-lg font-bold text-primary-foreground">P</span>
              </div>
              <span className="text-xl font-semibold">PrepWyse</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="/support" className="hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 PrepWyse. Made for Indian Students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
