import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";

export default function Privacy() {
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
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect information you provide directly:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Account Information:</strong> Name, email, password, grade, education board</li>
              <li><strong>Profile Information:</strong> School name, phone number, date of birth</li>
              <li><strong>Usage Data:</strong> Quiz scores, study progress, learning preferences</li>
              <li><strong>Payment Information:</strong> Transaction records (payment details handled by PhonePe)</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide personalized learning content based on your grade and preferences</li>
              <li>Track your progress and generate performance analytics</li>
              <li>Enable parent monitoring features (when linked)</li>
              <li>Process coin purchases and maintain transaction history</li>
              <li>Improve our AI models and service quality</li>
              <li>Send important service updates and notifications</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              3. Information Sharing
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Linked Parents:</strong> Parents who link their account can view your progress data</li>
              <li><strong>Payment Processors:</strong> PhonePe for processing purchases (governed by their privacy policy)</li>
              <li><strong>AI Providers:</strong> Google (Gemini) for content generation (anonymized prompts only)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              4. Data Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures including encryption of data in 
              transit and at rest, secure password hashing, and regular security audits. However, 
              no method of transmission over the Internet is 100% secure. We encourage you to use 
              a strong, unique password for your account.
            </p>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              5. Children's Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service is designed for students in Class 11 and 12 (typically ages 16-18). 
              For users under 18, we encourage parental oversight through our parent linking 
              feature. We do not knowingly collect personal information from children under 13. 
              If we learn we have collected information from a child under 13, we will delete it promptly.
            </p>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              6. Your Rights
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access your personal data through your account settings</li>
              <li>Update or correct your information at any time</li>
              <li>Request deletion of your account and associated data</li>
              <li>Export your learning progress data</li>
              <li>Opt out of promotional communications</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              7. Cookies & Tracking
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use essential cookies to maintain your session and preferences. We may use 
              analytics tools to understand how users interact with our Service. You can control 
              cookie settings through your browser preferences.
            </p>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              8. Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy periodically. We will notify you of significant 
              changes via email or through the Service. Continued use after changes constitutes 
              acceptance of the updated policy.
            </p>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              9. Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy-related questions or to exercise your rights, contact us at{" "}
              <a href="mailto:privacy@championsprep.com" className="text-primary hover:underline">
                privacy@championsprep.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
