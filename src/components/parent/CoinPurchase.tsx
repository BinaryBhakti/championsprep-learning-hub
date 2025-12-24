import { Coins, Sparkles, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { coinPackages } from '@/lib/mockParentData';
import { toast } from 'sonner';

interface CoinPurchaseProps {
  childName: string;
}

export function CoinPurchase({ childName }: CoinPurchaseProps) {
  const handlePurchase = (packageId: string, coins: number) => {
    toast.success(`Purchased ${coins} coins for ${childName}!`, {
      description: 'Demo mode - no actual purchase made',
    });
  };

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-gold" />
          Buy Coins for {childName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {coinPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`rounded-2xl relative overflow-hidden transition-all hover:shadow-lg ${
                pkg.popular ? 'border-2 border-primary' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">{pkg.label}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Coins className="h-8 w-8 text-gold" />
                  <span className="text-3xl font-bold">{pkg.coins}</span>
                </div>
                <p className="text-2xl font-bold text-primary mb-4">₹{pkg.price}</p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6 text-left">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    Instant delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    No expiry
                  </li>
                  {pkg.popular && (
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      +20 bonus coins
                    </li>
                  )}
                </ul>
                <Button
                  className="w-full rounded-full"
                  variant={pkg.popular ? 'default' : 'outline'}
                  onClick={() => handlePurchase(pkg.id, pkg.coins)}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Generation Costs Info */}
        <div className="mt-6 p-4 rounded-2xl bg-muted/50">
          <p className="text-sm font-medium mb-3">Coin Usage Guide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-2 rounded-xl bg-background">
              <p className="text-muted-foreground">Easy</p>
              <p className="font-semibold">2 coins</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-background">
              <p className="text-muted-foreground">Medium</p>
              <p className="font-semibold">3 coins</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-background">
              <p className="text-muted-foreground">Hard</p>
              <p className="font-semibold">5 coins</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-background">
              <p className="text-muted-foreground">Full Mock</p>
              <p className="font-semibold">25 coins</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
