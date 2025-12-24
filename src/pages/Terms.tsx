import { Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using ChampionsPrep ("the Service"), you agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use our Service.
              These terms apply to all users, including students, parents, and administrators.
            </p>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              2. Description of Service
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ChampionsPrep is an AI-powered educational platform designed for Indian Commerce 
              students in Class 11 and 12. The Service includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>AI-generated quiz questions, flashcards, and case studies</li>
              <li>Mock examinations with AI evaluation</li>
              <li>Interactive study materials and AI tutoring</li>
              <li>Progress tracking and gamification features</li>
              <li>Parent monitoring capabilities</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              3. User Accounts
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To use certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the security of your password and account</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              4. Coin System & Payments
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ChampionsPrep uses a coin-based system for accessing AI-generated content:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>New users receive a welcome bonus of 100 coins</li>
              <li>Coins can be purchased through our payment partner (PhonePe)</li>
              <li>Purchased coins are non-refundable except as required by law</li>
              <li>Coins have no cash value and cannot be transferred</li>
              <li>We reserve the right to modify coin pricing with notice</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              5. Acceptable Use
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Use the Service for any unlawful purpose</li>
              <li>Share your account credentials with others</li>
              <li>Attempt to reverse-engineer or exploit the AI systems</li>
              <li>Distribute or commercially use generated content without permission</li>
              <li>Interfere with the Service's operation or other users' access</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, features, and functionality of the Service are owned by ChampionsPrep 
              and protected by intellectual property laws. AI-generated content is provided for 
              personal educational use only. The curriculum content is based on publicly available 
              educational standards.
            </p>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              7. Disclaimer
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service is provided "as is" without warranties of any kind. While we strive for 
              accuracy, AI-generated content may contain errors. ChampionsPrep is a supplementary 
              learning tool and should not replace formal education. We are not responsible for 
              exam results or academic outcomes.
            </p>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              8. Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms, please contact us at{" "}
              <a href="mailto:support@championsprep.com" className="text-primary hover:underline">
                support@championsprep.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
