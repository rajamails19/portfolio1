import { Outlet, createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid, KanbanSquare, Target, FileEdit, Send, BellRing,
  BarChart3, User2, PanelLeftClose, PanelLeftOpen, RefreshCw, Moon, Sun, Search, Bell,
} from "lucide-react";
import { useEffect } from "react";
import { useUI } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_shell")({
  component: ShellLayout,
});

type NavItem = { to: string; label: string; icon: typeof LayoutGrid; exact?: boolean };
const nav: NavItem[] = [
  { to: "/", label: "Feed", icon: LayoutGrid, exact: true },
  { to: "/pipeline", label: "Pipeline", icon: KanbanSquare },
  { to: "/focus", label: "Focus Mode", icon: Target },
  { to: "/tailor", label: "Resume Tailor", icon: FileEdit },
  { to: "/applications", label: "Applications", icon: Send },
  { to: "/follow-ups", label: "Follow Ups", icon: BellRing },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User2 },
];

function ShellLayout() {
  const { sidebarCollapsed, toggleSidebar, theme, toggleTheme, filters, setFilters } = useUI();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  return (
    <div className="relative flex min-h-screen w-full text-foreground">
      {/* Ambient animated aurora — subtle green/amber, premium */}
      <div className="aurora-bg" aria-hidden><span /></div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-background/70 backdrop-saturate-150" aria-hidden />
      <div className="relative z-10 flex min-h-screen w-full">

      {/* Sidebar */}
      <aside
        className={cn(
          "sticky top-0 flex h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200",
          sidebarCollapsed ? "w-[64px]" : "w-[232px]",
        )}
      >
        <div className={cn("flex h-14 items-center gap-2 border-b border-sidebar-border px-3", sidebarCollapsed && "justify-center px-0")}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground font-display text-sm font-bold">J</div>
          {!sidebarCollapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-display text-[15px] font-semibold">JobOps</span>
              <span className="text-[10.5px] text-muted-foreground">Command center</span>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-0.5 p-2">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to as "/"}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-2.5 py-2 text-[13.5px] font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                  sidebarCollapsed && "justify-center px-0",
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", active && "text-brand")} />
                {!sidebarCollapsed && <span>{item.label}</span>}
                {!sidebarCollapsed && active && <span className="ml-auto h-1 w-1 rounded-full bg-brand" />}
              </Link>
            );
          })}
        </nav>

        <div className={cn("border-t border-sidebar-border p-2 space-y-1", sidebarCollapsed && "px-1")}>
          {!sidebarCollapsed && (
            <div className="flex items-center justify-between rounded-md px-2 py-1.5 text-[11.5px] text-muted-foreground">
              <span>Last synced 2h ago</span>
              <button className="rounded p-1 hover:bg-sidebar-accent" title="Refresh sources">
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          <div className={cn("flex items-center gap-2 rounded-md px-2 py-1.5", sidebarCollapsed && "justify-center px-0")}>
            {!sidebarCollapsed && (
              <>
                <Sun className="h-3.5 w-3.5 text-muted-foreground" />
                <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} className="scale-90" />
                <Moon className="h-3.5 w-3.5 text-muted-foreground" />
              </>
            )}
            {sidebarCollapsed && (
              <button onClick={toggleTheme} className="rounded p-1.5 hover:bg-sidebar-accent">
                {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className={cn("flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[12px] text-muted-foreground hover:bg-sidebar-accent", sidebarCollapsed && "justify-center")}
          >
            {sidebarCollapsed ? <PanelLeftOpen className="h-3.5 w-3.5" /> : <><PanelLeftClose className="h-3.5 w-3.5" /><span>Collapse</span></>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 backdrop-blur-md px-4">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filters.search ?? ""}
              onChange={(e) => setFilters({ search: e.target.value })}
              placeholder="Search roles, companies, skills…"
              className="h-8 pl-8 text-[13px] bg-surface border-border"
            />
          </div>
          <div className="hidden lg:flex items-center gap-1.5">
            {["Frontend Engineer", "React", "Next.js", "AI Tools"].map((k) => (
              <Badge key={k} variant="outline" className="rounded-full px-2 py-0.5 text-[11px] font-normal bg-surface">
                {k}
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="h-6 rounded-full text-[11px] text-muted-foreground">+ chip</Button>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <label className="hidden md:flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <Switch
                checked={!!filters.fullTimeOnly}
                onCheckedChange={(v) => setFilters({ fullTimeOnly: v })}
                className="scale-90"
              />
              Full-time only
            </label>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8 border border-border">
              <AvatarFallback className="bg-brand/10 text-brand text-xs font-semibold">AM</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
      </div>
    </div>
  );
}

