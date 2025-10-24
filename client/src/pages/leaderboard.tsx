import { useQuery } from "@tanstack/react-query";
import { Trophy, Medal, Award, MessageCircle } from "lucide-react";
import { SiDiscord, SiTelegram } from "react-icons/si";
import { CountdownTimer } from "@/components/countdown-timer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { LeaderboardEntry, LeaderboardSettings } from "@shared/schema";

export default function Leaderboard() {
  const { data: settings, isLoading: settingsLoading } = useQuery<LeaderboardSettings>({
    queryKey: ["/api/leaderboard/settings"],
  });

  const { data: entries = [], isLoading: entriesLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard/entries"],
  });

  const isLoading = settingsLoading || entriesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-7 h-7 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-7 h-7 text-gray-400" />;
    if (rank === 3) return <Award className="w-7 h-7 text-amber-700" />;
    return null;
  };

  const getRankClass = (rank: number) => {
    if (rank === 1) return "border-yellow-500/20 bg-yellow-500/5";
    if (rank === 2) return "border-gray-400/20 bg-gray-400/5";
    if (rank === 3) return "border-amber-700/20 bg-amber-700/5";
    return "";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Monthly Leaderboard
          </h1>
          <p className="text-muted-foreground">Compete for the top prizes</p>
        </div>

        {/* Contact Banner */}
        <Card className="p-6 border">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Want to Join the Leaderboard?</h3>
          </div>
          <p className="text-center text-muted-foreground mb-6 text-sm">
            Send me a private message with your <span className="font-semibold text-foreground">Username</span> and <span className="font-semibold text-foreground">Gamdom ID</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              asChild
              className="bg-[#5865F2] hover:bg-[#5865F2]/90 text-white min-w-[180px]"
              data-testid="button-contact-discord"
            >
              <a href="https://discord.com/users/mojotxkick" target="_blank" rel="noopener noreferrer">
                <SiDiscord className="w-4 h-4 mr-2" />
                Discord: mojotxkick
              </a>
            </Button>
            <Button
              asChild
              className="bg-[#26A5E4] hover:bg-[#26A5E4]/90 text-white min-w-[180px]"
              data-testid="button-contact-telegram"
            >
              <a href="https://t.me/mojotx" target="_blank" rel="noopener noreferrer">
                <SiTelegram className="w-4 h-4 mr-2" />
                Telegram: mojotx
              </a>
            </Button>
          </div>
        </Card>

        {/* Countdown Timer */}
        {settings && (
          <div className="space-y-4" data-testid="section-countdown">
            <h2 className="text-xl font-semibold text-center">Time Remaining</h2>
            <CountdownTimer endDate={new Date(settings.endDate)} />
          </div>
        )}

        {/* Prize Pool */}
        {settings && (
          <Card className="p-8 border text-center">
            <p className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-2">
              Total Prize Pool
            </p>
            <p className="text-5xl md:text-6xl font-bold text-foreground" data-testid="text-prize-pool">
              ${Number(settings.totalPrizePool).toLocaleString()}
            </p>
          </Card>
        )}

        {/* Leaderboard Entries */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Rankings</h2>
          {entries && entries.length > 0 ? (
            <div className="space-y-3">
              {entries.map((entry) => (
                <Card
                  key={entry.id}
                  className={`p-5 hover-elevate transition-all ${getRankClass(entry.rank)}`}
                  data-testid={`card-leaderboard-${entry.rank}`}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    {/* Rank */}
                    <div className="flex items-center justify-center min-w-[50px]">
                      {getRankIcon(entry.rank) || (
                        <span className="text-3xl font-bold text-muted-foreground">
                          #{entry.rank}
                        </span>
                      )}
                    </div>

                    {/* Username */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold truncate" data-testid={`text-username-${entry.rank}`}>
                        {entry.username}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Wagered: ${Number(entry.wagered).toLocaleString()}
                      </p>
                    </div>

                    {/* Prize */}
                    <div className="text-right">
                      <Badge variant="outline" className="text-base font-semibold px-3 py-1.5">
                        <span className="text-primary" data-testid={`text-prize-${entry.rank}`}>
                          ${Number(entry.prize).toLocaleString()}
                        </span>
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No leaderboard entries yet</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
