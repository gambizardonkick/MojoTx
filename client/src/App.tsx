import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Leaderboard from "@/pages/leaderboard";
import Milestones from "@/pages/milestones";
import Challenges from "@/pages/challenges";
import FreeSpins from "@/pages/free-spins";
import Referral from "@/pages/referral";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";
import { Menu } from "lucide-react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Leaderboard} />
      <Route path="/milestones" component={Milestones} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/free-spins" component={FreeSpins} />
      <Route path="/referral" component={Referral} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card sticky top-0 z-50">
                <div className="flex items-center gap-4">
                  <SidebarTrigger data-testid="button-sidebar-toggle" className="hover-elevate">
                    <Menu className="w-5 h-5" />
                  </SidebarTrigger>
                  <div className="hidden sm:flex items-center gap-3">
                    <img 
                      src="https://files.kick.com/images/user/565379/profile_image/conversion/6165ea43-dffd-419e-b4ea-b3ebde51a45e-fullsize.webp" 
                      alt="MojoTX" 
                      className="w-8 h-8 rounded-full"
                    />
                    <h1 className="text-lg font-bold text-foreground">
                      MojoTX Rewards
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href="https://gamdom.com/r/mojokick" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover-elevate active-elevate-2 transition-all"
                  >
                    Play on Gamdom
                  </a>
                </div>
              </header>
              <main className="flex-1 overflow-y-auto">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
