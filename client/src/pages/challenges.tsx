import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Target, DollarSign, TrendingUp, Trophy, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Challenge } from "@shared/schema";

export default function Challenges() {
  const { data: challenges = [], isLoading } = useQuery<Challenge[]>({
    queryKey: ["/api/challenges"],
  });

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [username, setUsername] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const { toast } = useToast();

  const claimMutation = useMutation({
    mutationFn: async (data: { id: string; username: string; discordUsername: string }) => {
      return apiRequest("POST", `/api/challenges/${data.id}/claim`, {
        username: data.username,
        discordUsername: data.discordUsername,
      });
    },
    onSuccess: () => {
      toast({
        title: "Prize Claimed!",
        description: "Join our Discord server and open a ticket to receive your prize.",
      });
      setSelectedChallenge(null);
      setUsername("");
      setDiscordUsername("");
      
      window.open("https://discord.gg/mojotx", "_blank");
    },
    onError: () => {
      toast({
        title: "Claim Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleClaim = () => {
    if (!selectedChallenge || !username.trim() || !discordUsername.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    claimMutation.mutate({
      id: selectedChallenge.id,
      username: username.trim(),
      discordUsername: discordUsername.trim(),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading challenges...</p>
        </div>
      </div>
    );
  }

  const activeChallenges = challenges.filter((c) => c.isActive && c.claimStatus !== "claimed");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Challenges
          </h1>
          <p className="text-muted-foreground">
            Complete challenges on your favorite slots to win exclusive rewards
          </p>
        </div>

        {/* Info Card */}
        <Card className="p-6 border bg-card">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">How Challenges Work</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Choose a Challenge</h4>
                  <p className="text-sm text-muted-foreground">
                    Select an active challenge and play the specified slot game
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Hit the Target</h4>
                  <p className="text-sm text-muted-foreground">
                    Achieve the required multiplier with the minimum bet or higher
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Win Rewards</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete the challenge to win your share of the prize pool
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-amber-600 dark:text-amber-500 font-semibold border-t pt-4">
              Important: Only bets made after the challenge starts count towards completion.
            </p>
          </div>
        </Card>

        {/* Challenges Grid */}
        {activeChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="overflow-hidden hover-elevate transition-all"
                data-testid={`card-challenge-${challenge.id}`}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-primary text-primary-foreground border-0" data-testid={`badge-status-${challenge.id}`}>
                    Active
                  </Badge>
                </div>

                {/* Game Image */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={challenge.gameImage}
                    alt={challenge.gameName}
                    className="w-full h-full object-cover"
                    data-testid={`img-game-${challenge.id}`}
                  />
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Game Name */}
                  <h3 className="text-lg font-semibold" data-testid={`text-game-name-${challenge.id}`}>
                    {challenge.gameName}
                  </h3>

                  {/* Requirements */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1 p-3 rounded-lg bg-muted">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">
                        <TrendingUp className="w-3 h-3" />
                        Min Multiplier
                      </div>
                      <p className="text-xl font-bold text-primary" data-testid={`text-multiplier-${challenge.id}`}>
                        {Number(challenge.minMultiplier)}x
                      </p>
                    </div>

                    <div className="space-y-1 p-3 rounded-lg bg-muted">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">
                        <DollarSign className="w-3 h-3" />
                        Min Bet
                      </div>
                      <p className="text-xl font-bold" data-testid={`text-min-bet-${challenge.id}`}>
                        ${Number(challenge.minBet)}
                      </p>
                    </div>
                  </div>

                  {/* Prize */}
                  <div className="pt-4 border-t border-border space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Prize</p>
                      <p className="text-3xl font-bold text-foreground" data-testid={`text-prize-${challenge.id}`}>
                        ${Number(challenge.prize).toLocaleString()}
                      </p>
                    </div>
                    <Button 
                      onClick={() => setSelectedChallenge(challenge)} 
                      className="w-full"
                      data-testid={`button-claim-${challenge.id}`}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Claim Prize
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-xl font-semibold mb-2">No Active Challenges</p>
            <p className="text-muted-foreground">Check back later for new challenges and opportunities to win!</p>
          </Card>
        )}
      </div>

      {/* Claim Prize Modal */}
      <Dialog open={!!selectedChallenge} onOpenChange={(open) => !open && setSelectedChallenge(null)}>
        <DialogContent data-testid="dialog-claim-prize">
          <DialogHeader>
            <DialogTitle>Claim Your Prize</DialogTitle>
            <DialogDescription>
              Fill in your details to claim your prize for {selectedChallenge?.gameName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Gamdom Username</Label>
              <Input
                id="username"
                placeholder="Enter your Gamdom username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                data-testid="input-username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discord">Discord Username</Label>
              <Input
                id="discord"
                placeholder="Enter your Discord username"
                value={discordUsername}
                onChange={(e) => setDiscordUsername(e.target.value)}
                data-testid="input-discord"
              />
            </div>
            <Card className="p-4 bg-muted">
              <p className="text-sm text-muted-foreground">
                After claiming, you'll be redirected to join our Discord server. Open a ticket to verify your win and receive your prize.
              </p>
            </Card>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedChallenge(null)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button 
              onClick={handleClaim} 
              disabled={claimMutation.isPending}
              data-testid="button-submit-claim"
            >
              {claimMutation.isPending ? "Claiming..." : "Claim & Join Discord"}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
