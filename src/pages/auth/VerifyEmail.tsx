import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Mock: 90% success rate
      if (Math.random() > 0.1) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Verifying Your Email...
          </h1>
          <p className="text-muted-foreground">
            Please wait while we confirm your email address.
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 animate-ping rounded-full bg-green-500/20" />
            <div className="relative inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-500/20">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>
          
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Email Verified!
          </h1>
          <p className="text-muted-foreground mb-8">
            Your email has been successfully verified. You can now access all features of ChampionsPrep.
          </p>

          <Button asChild className="w-full">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-destructive/20 mb-8">
          <XCircle className="h-12 w-12 text-destructive" />
        </div>
        
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Verification Failed
        </h1>
        <p className="text-muted-foreground mb-8">
          This verification link is invalid or has expired. Please request a new verification email.
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/auth/login">
              <Mail className="h-4 w-4 mr-2" />
              Resend Verification Email
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/support">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
