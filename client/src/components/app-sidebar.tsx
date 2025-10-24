import { Trophy, Award, Target, Gift, Users, ExternalLink, HelpCircle, Store } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SiDiscord, SiX, SiInstagram, SiKick } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mainMenuItems = [
  {
    title: "Leaderboard",
    url: "/",
    icon: Trophy,
  },
  {
    title: "Milestones",
    url: "/milestones",
    icon: Award,
  },
];

const communityMenuItems = [
  {
    title: "Challenges",
    url: "/challenges",
    icon: Target,
  },
  {
    title: "Free Spins",
    url: "/free-spins",
    icon: Gift,
  },
];

const socialLinks = [
  {
    name: "Discord",
    url: "https://discord.gg/mojotx",
    icon: SiDiscord,
    color: "text-[#5865F2]",
  },
  {
    name: "Kick",
    url: "https://kick.com/mojotx",
    icon: SiKick,
    color: "text-[#53FC18]",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/MojoTxOnX",
    icon: SiX,
    color: "text-foreground",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/MojoTxKick",
    icon: SiInstagram,
    color: "text-[#E4405F]",
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <img 
            src="https://files.kick.com/images/user/565379/profile_image/conversion/6165ea43-dffd-419e-b4ea-b3ebde51a45e-fullsize.webp" 
            alt="MojoTX Logo" 
            className="w-10 h-10 rounded-full ring-2 ring-primary/20"
          />
          <div>
            <h1 className="text-lg font-bold text-foreground">
              MojoTX
            </h1>
            <p className="text-xs text-muted-foreground">Rewards Hub</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {/* MAIN Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider font-bold text-muted-foreground px-3 py-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                    >
                      <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* COMMUNITY Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider font-bold text-muted-foreground px-3 py-2">
            Community
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communityMenuItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                    >
                      <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* STORE Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider font-bold text-muted-foreground px-3 py-2">
            Gamdom
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location === "/referral"}>
                  <Link href="/referral" data-testid="link-referral">
                    <Users className="w-4 h-4" />
                    <span>Referral Program</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="https://gamdom.com/r/mojokick" target="_blank" rel="noopener noreferrer" data-testid="link-gamdom-store">
                    <Store className="w-4 h-4" />
                    <span>Gamdom Sign Up</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* SUPPORT Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider font-bold text-muted-foreground px-3 py-2">
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="https://discord.gg/mojotx" target="_blank" rel="noopener noreferrer" data-testid="link-support-discord">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help & Support</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="space-y-4">
          <Button 
            asChild 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            data-testid="button-gamdom"
          >
            <a href="https://gamdom.com/r/mojokick" target="_blank" rel="noopener noreferrer">
              Play on Gamdom
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
          
          <Separator />
          
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider text-center font-semibold">
              Follow MojoTX
            </p>
            <div className="grid grid-cols-4 gap-2">
              {socialLinks.map((social) => (
                <Button 
                  key={social.name}
                  asChild 
                  size="icon" 
                  variant="ghost"
                  className={`hover-elevate ${social.color} transition-colors`}
                  data-testid={`button-social-${social.name.toLowerCase()}`}
                >
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    <social.icon className="w-4 h-4" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
