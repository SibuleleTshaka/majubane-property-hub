import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Bot,
  Building2,
  CheckSquare,
  Inbox,
  LayoutDashboard,
  Mail,
  Menu,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import logoAsset from "@/assets/majubane-logo.png.asset.json";

const logo = logoAsset.url;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COMPANY, notifications } from "@/lib/data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/properties", label: "Properties", icon: Building2 },
  { to: "/clients", label: "Clients", icon: Users },
  { to: "/enquiries", label: "Enquiries", icon: Inbox },
  { to: "/tasks", label: "Task Planner", icon: CheckSquare },
  { to: "/assistant", label: "AI Assistant", icon: Bot },
  { to: "/email-assistant", label: "AI Email Assistant", icon: Mail },
  { to: "/summariser", label: "AI Summariser", icon: Sparkles },
] as const;

export function Brand() {
  return (
    <Link to="/" className="flex items-center" aria-label="Majubane Properties home">
      <img src={logo} alt="Majubane Properties logo" className="h-10 w-auto object-contain" />
    </Link>
  );
}


export function AppShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Brand />
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="space-y-1 p-3">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mx-3 mt-4 rounded-lg border border-sidebar-border bg-sidebar-accent p-3 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">{COMPANY.director}</p>
          <p>Director</p>
          <p className="mt-2 break-all">{COMPANY.email}</p>
          <p className="mt-1">{COMPANY.location}</p>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 bg-foreground/40 lg:hidden" onClick={() => setOpen(false)} aria-hidden />
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card px-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search properties, clients or enquiries" className="pl-9" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-red" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((n) => (
                  <DropdownMenuItem key={n.id} className="flex-col items-start gap-1">
                    <span className="text-sm">{n.text}</span>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              BM
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
            {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
          </div>
          {children}
        </main>

        <footer className="border-t border-border px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} {COMPANY.name} · Director {COMPANY.director} · {COMPANY.email} ·{" "}
          {COMPANY.location}. Listings shown are demo examples for illustration only.
        </footer>
      </div>
    </div>
  );
}
