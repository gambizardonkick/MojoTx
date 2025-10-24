import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Award, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { LevelMilestone } from "@shared/schema";

export default function Milestones() {
  const [selectedMilestone, setSelectedMilestone] = useState<LevelMilestone | null>(null);

  const { data: milestones, isLoading } = useQuery<LevelMilestone[]>({
    queryKey: ["/api/milestones"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading milestones...</p>
        </div>
      </div>
    );
  }

  const sortedMilestones = milestones?.sort((a, b) => a.tier - b.tier) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Level Milestones
          </h1>
          <p className="text-muted-foreground">Unlock exclusive rewards as you level up on Gamdom</p>
        </div>

        {/* Info Card */}
        <Card className="p-6 border bg-card">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">How to Claim</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reach a milestone level on Gamdom and claim your rewards by creating a ticket on our Discord server
              </p>
            </div>
          </div>
        </Card>

        {/* Milestone Grid */}
        {sortedMilestones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedMilestones.map((milestone) => (
              <Card
                key={milestone.id}
                className="p-6 hover-elevate transition-all"
                data-testid={`card-milestone-${milestone.tier}`}
              >
                <div className="space-y-4">
                  {/* Badge Image */}
                  <div className="flex justify-center">
                    <img
                      src={milestone.imageUrl}
                      alt={milestone.name}
                      className="w-32 h-32 object-contain"
                      data-testid={`img-badge-${milestone.tier}`}
                    />
                  </div>

                  {/* Milestone Name */}
                  <h3 className="text-xl font-bold text-center" data-testid={`text-milestone-name-${milestone.tier}`}>
                    {milestone.name}
                  </h3>

                  {/* Rewards Preview */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                      Rewards:
                    </p>
                    <ul className="space-y-1 text-sm">
                      {milestone.rewards.slice(0, 2).map((reward, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span className="text-card-foreground">{reward}</span>
                        </li>
                      ))}
                      {milestone.rewards.length > 2 && (
                        <li className="text-muted-foreground text-xs">
                          +{milestone.rewards.length - 2} more...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Claim Button */}
                  <Button
                    className="w-full"
                    onClick={() => setSelectedMilestone(milestone)}
                    data-testid={`button-claim-${milestone.tier}`}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No milestones available yet</p>
          </Card>
        )}
      </div>

      {/* Claim Modal */}
      <Dialog open={!!selectedMilestone} onOpenChange={() => setSelectedMilestone(null)}>
        <DialogContent className="max-w-md" data-testid="dialog-claim-milestone">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedMilestone?.name}
            </DialogTitle>
            <DialogDescription>
              Create a ticket on Discord to claim your rewards
            </DialogDescription>
          </DialogHeader>

          {selectedMilestone && (
            <div className="space-y-6">
              {/* Badge Image */}
              <div className="flex justify-center">
                <img
                  src={selectedMilestone.imageUrl}
                  alt={selectedMilestone.name}
                  className="w-40 h-40 object-contain"
                />
              </div>

              {/* Full Rewards List */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  All Rewards
                </h4>
                <ul className="space-y-2">
                  {selectedMilestone.rewards.map((reward, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{reward}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Discord Button */}
              <Button
                asChild
                className="w-full bg-[#5865F2] hover:bg-[#5865F2]/90 text-white"
                data-testid="button-claim-discord"
              >
                <a href="https://discord.gg/mojotx" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Claim on Discord
                </a>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
