import { Link, useSearchParams } from "react-router-dom";
import { XCircle, RefreshCw, ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentFailure() {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("merchantTransactionId");
  const errorCode = searchParams.get("code");

  const getErrorMessage = (code: string | null) => {
    switch (code) {
      case "PAYMENT_DECLINED":
        return "Your payment was declined. Please check your payment method and try again.";
      case "INSUFFICIENT_FUNDS":
        return "Insufficient funds in your account. Please try a different payment method.";
      case "TIMEOUT":
        return "The payment session timed out. Please try again.";
      case "CANCELLED":
        return "You cancelled the payment. No charges were made to your account.";
      default:
        return "Something went wrong with your payment. Please try again or contact support.";
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Failure Icon */}
        <div className="relative mb-8">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-destructive/20">
            <XCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        {/* Content */}
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Payment Failed
        </h1>
        <p className="text-muted-foreground mb-8">
          {getErrorMessage(errorCode)}
        </p>

        {/* Error Details */}
        <div className="rounded-2xl border border-border/50 bg-card/50 p-6 mb-8 text-left">
          <h3 className="font-semibold text-foreground mb-3">What happened?</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• No coins were added to your account</li>
            <li>• No charges were made to your payment method</li>
            <li>• You can safely try the payment again</li>
          </ul>
        </div>

        {/* Transaction ID */}
        {transactionId && (
          <p className="text-sm text-muted-foreground mb-8">
            Reference: <code className="text-foreground">{transactionId}</code>
          </p>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/settings">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <Button variant="ghost" asChild className="w-full">
            <Link to="/support">
              <HelpCircle className="h-4 w-4 mr-2" />
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
