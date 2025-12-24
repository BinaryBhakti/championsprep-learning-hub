import { Navbar } from "@/components/layout/Navbar";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  HelpCircle, 
  Mail, 
  MessageSquare, 
  BookOpen,
  Coins,
  Shield,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const faqs = [
  {
    category: "Getting Started",
    icon: BookOpen,
    questions: [
      {
        q: "How do I start learning on ChampionsPrep?",
        a: "After signing up, you'll receive 100 free coins. Head to your dashboard, select a subject and topic, then choose a learning mode like MCQ Quiz or Flash Cards to begin!"
      },
      {
        q: "What subjects are available?",
        a: "We cover all Commerce subjects for Class 11 & 12: Accountancy, Business Studies, Economics, Mathematics, and Applied Mathematics."
      },
      {
        q: "How do I change my grade or board?",
        a: "Go to Settings > Academic section. You can change your grade (11 or 12) and education board (CBSE, ICSE, State Board, or IB) anytime."
      }
    ]
  },
  {
    category: "Coins & Payments",
    icon: Coins,
    questions: [
      {
        q: "How does the coin system work?",
        a: "Coins are used to generate AI-powered content. Different modes cost different amounts: Easy questions cost 2 coins, Medium 3 coins, and Hard 5 coins. Reviewing saved flashcards is always free!"
      },
      {
        q: "How do I buy more coins?",
        a: "Go to Settings and scroll to the 'Coins & Subscription' section. Choose a coin pack and complete the payment via PhonePe."
      },
      {
        q: "What if my payment fails?",
        a: "If your payment fails, no coins will be deducted from your account. Try again or contact support if the issue persists."
      }
    ]
  },
  {
    category: "Learning Modes",
    icon: Zap,
    questions: [
      {
        q: "What is Adaptive Quiz?",
        a: "Adaptive Quiz adjusts difficulty based on your performance. Get 2 right in a row and it gets harder; get 2 wrong and it becomes easier. It costs a flat 15 coins regardless of questions answered."
      },
      {
        q: "How do Flash Cards work?",
        a: "Flash Cards use spaced repetition (SRS) to help you remember concepts. Cards you know well appear less frequently, while difficult ones appear more often."
      },
      {
        q: "What is the AI Tutor?",
        a: "The AI Tutor is a chat-based assistant that can explain concepts, answer questions, and help you understand difficult topics. It's free to use!"
      }
    ]
  },
  {
    category: "Account & Privacy",
    icon: Shield,
    questions: [
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login page, enter your email, and we'll send you a reset link."
      },
      {
        q: "Can parents monitor my progress?",
        a: "Yes! Parents can create a parent account and link it to your student account using your email. They can view your progress, streaks, and achievements."
      },
      {
        q: "Is my data secure?",
        a: "Yes, we use industry-standard encryption and never share your personal data with third parties. See our Privacy Policy for details."
      }
    ]
  }
];

export default function Support() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/20 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Help & Support
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Find answers to common questions or reach out to our support team.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Frequently Asked Questions
            </h2>

            {faqs.map((category) => (
              <section 
                key={category.category}
                className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {category.category}
                  </h3>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((item, idx) => (
                    <AccordionItem 
                      key={idx} 
                      value={`${category.category}-${idx}`}
                      className="border-border/50"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:text-primary">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
                  <MessageSquare className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Contact Us
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="contact-email">Your Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue or question..."
                    required
                    rows={5}
                    className="mt-1.5"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground text-center">
                  We typically respond within 24 hours on business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
