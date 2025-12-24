import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Coins, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [coinsAdded, setCoinsAdded] = useState<number | null>(null);

  const transactionId = searchParams.get("merchantTransactionId");

  useEffect(() => {
    // Simulate payment verification
    const verifyPayment = async () => {
      // In production, call POST /api/payments/verify
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCoinsAdded(220); // Mock value
      setIsVerifying(false);
    };

    verifyPayment();
  }, [transactionId]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Verifying Payment...
          </h1>
          <p className="text-muted-foreground">
            Please wait while we confirm your transaction.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Success Animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping rounded-full bg-green-500/20" />
          <div className="relative inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-500/20">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>

        {/* Content */}
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground mb-8">
          Your coins have been added to your account.
        </p>

        {/* Coins Added Card */}
        <div className="rounded-2xl border border-gold/30 bg-gold/10 p-6 mb-8">
          <div className="flex items-center justify-center gap-3">
            <Coins className="h-8 w-8 text-gold" />
            <span className="font-display text-4xl font-bold text-gold">
              +{coinsAdded}
            </span>
          </div>
          <p className="text-gold/80 mt-2">Coins added to your balance</p>
        </div>

        {/* Transaction ID */}
        {transactionId && (
          <p className="text-sm text-muted-foreground mb-8">
            Transaction ID: <code className="text-foreground">{transactionId}</code>
          </p>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/dashboard">
              Start Learning
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/settings">
              View Balance
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
