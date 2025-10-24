import { useQuery } from "@tanstack/react-query";
import { Gift, CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CopyButton } from "@/components/copy-button";
import { CountdownTimer } from "@/components/countdown-timer";
import type { FreeSpinsOffer } from "@shared/schema";

export default function FreeSpins() {
  const { data: offers = [], isLoading } = useQuery<FreeSpinsOffer[]>({
    queryKey: ["/api/free-spins"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading offers...</p>
        </div>
      </div>
    );
  }

  const activeOffers = offers.filter((o) => o.isActive && new Date(o.expiresAt) > new Date());

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Free Spins
          </h1>
          <p className="text-muted-foreground">Claim your exclusive free spins offers</p>
        </div>

        {/* Offers */}
        {activeOffers.length > 0 ? (
          <div className="space-y-6">
            {activeOffers.map((offer) => {
              const claimProgress = ((offer.totalClaims - offer.claimsRemaining) / offer.totalClaims) * 100;
              
              return (
                <Card
                  key={offer.id}
                  className="overflow-hidden"
                  data-testid={`card-offer-${offer.id}`}
                >
                  <div className="p-8 space-y-6">
                    {/* Code Section */}
                    <div className="text-center space-y-4">
                      <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                        Promo Code
                      </p>
                      <div className="inline-flex items-center gap-4 bg-muted p-4 rounded-lg">
                        <code className="text-2xl font-mono font-bold text-primary" data-testid="text-promo-code">
                          {offer.code}
                        </code>
                        <CopyButton text={offer.code} />
                      </div>
                    </div>

                    {/* Game Info */}
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={offer.gameImage}
                          alt={offer.gameName}
                          className="w-48 h-48 object-cover rounded-lg"
                          data-testid={`img-game-${offer.id}`}
                        />
                      </div>

                      <div className="flex-1 space-y-4 text-center md:text-left">
                        <div>
                          <h2 className="text-2xl font-bold" data-testid={`text-game-name-${offer.id}`}>
                            {offer.gameName}
                          </h2>
                          <p className="text-muted-foreground" data-testid={`text-provider-${offer.id}`}>by {offer.gameProvider}</p>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                          <Badge variant="outline" className="text-sm px-3 py-1.5" data-testid={`badge-spins-${offer.id}`}>
                            {offer.spinsCount} × ${Number(offer.spinValue)} spins
                          </Badge>
                          <Badge variant="outline" className="text-sm px-3 py-1.5" data-testid={`badge-claims-${offer.id}`}>
                            {offer.claimsRemaining} / {offer.totalClaims} claims left
                          </Badge>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <Progress value={claimProgress} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {Math.round(claimProgress)}% claimed
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Countdown */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 justify-center text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <p className="text-sm font-semibold uppercase tracking-wider">
                          Expires In
                        </p>
                      </div>
                      <CountdownTimer endDate={new Date(offer.expiresAt)} />
                    </div>

                    {/* Requirements */}
                    <div className="space-y-4" data-testid={`section-requirements-${offer.id}`}>
                      <h3 className="text-lg font-semibold">Requirements</h3>
                      <Card className="p-4 bg-muted">
                        <ul className="space-y-2">
                          {(offer.requirements || []).map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No active free spins offers at the moment</p>
          </Card>
        )}
      </div>
    </div>
  );
}
