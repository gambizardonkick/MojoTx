import { ExternalLink, DollarSign, Users, Gift } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";

export default function Referral() {
  const referralCode = "mojokick";

  const payoutTiers = [
    { wager: "< $10,000", payout: "$25" },
    { wager: "$10,000 - $50,000", payout: "$100" },
    { wager: "$50,000 - $100,000", payout: "$250" },
    { wager: "$100,000 - $250,000", payout: "$500" },
    { wager: "$250,000 - $500,000", payout: "$1,000" },
    { wager: "$500,000 - $1,000,000", payout: "$1,500" },
    { wager: "> $1,000,000", payout: "$2,500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Referral Program
          </h1>
          <p className="text-muted-foreground">Earn up to $2,500 per referral!</p>
        </div>

        {/* Hero Card */}
        <Card className="p-8 md:p-10 border text-center">
          <div className="space-y-4">
            <Gift className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-2xl md:text-3xl font-bold">
              Gamdom Referral Program
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Invite players who play big and earn up to <span className="text-primary font-bold">$2,500</span> per player!
            </p>
          </div>
        </Card>

        {/* How It Works */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center space-y-4 hover-elevate">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold">Share Your Code</h3>
              <p className="text-sm text-muted-foreground">
                Share code <span className="font-mono font-bold text-primary">{referralCode}</span> with friends
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover-elevate">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold">They Play</h3>
              <p className="text-sm text-muted-foreground">
                After they wager for a full month, you get paid
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover-elevate">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold">Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">
                The more they play, the higher your payout
              </p>
            </Card>
          </div>
        </div>

        {/* Referral Code */}
        <Card className="p-8" data-testid="card-referral-code">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold">Your Referral Code</h3>
            <div className="inline-flex items-center gap-4 bg-muted p-4 rounded-lg">
              <code className="text-2xl font-mono font-bold text-primary" data-testid="text-referral-code">
                {referralCode}
              </code>
              <CopyButton text={referralCode} />
            </div>
          </div>
        </Card>

        {/* Payout Tiers */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Payout Tiers</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="text-left p-4 font-semibold">Monthly Wager</th>
                    <th className="text-right p-4 font-semibold">Your Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutTiers.map((tier, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-border last:border-0 hover-elevate transition-all"
                      data-testid={`row-tier-${idx}`}
                    >
                      <td className="p-4">{tier.wager}</td>
                      <td className="p-4 text-right">
                        <span className={`font-bold ${idx === payoutTiers.length - 1 ? 'text-primary text-lg' : ''}`}>
                          {tier.payout}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Bonus Info */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Bonus Cash!</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              For every first deposit your friends make (minimum $25), you'll get <span className="text-primary font-bold">$2.50</span>!
            </p>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold">Ready to Start Earning?</h3>
          <p className="text-muted-foreground text-sm">
            Claim your rewards on Discord
          </p>
          <Button size="lg" className="gap-2" asChild data-testid="button-discord">
            <a
              href="https://discord.gg/mojotx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              Join Discord
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
