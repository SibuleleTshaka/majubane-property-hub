import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, CalendarClock, Inbox, TrendingUp, Users } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { AiNotice } from "@/components/AiNotice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clients, enquiriesSeed, formatPrice, listings, notifications, tasksSeed } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | Majubane Properties" },
      {
        name: "description",
        content:
          "Majubane Properties management dashboard for listings, clients, enquiries, tasks and AI admin tools in Gqeberha, Eastern Cape.",
      },
      { property: "og:title", content: "Dashboard | Majubane Properties" },
      {
        property: "og:description",
        content: "Manage property listings, clients, enquiries and follow-ups for Majubane Properties.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const stats = [
    { label: "Active listings", value: listings.filter((l) => l.status === "Available").length, icon: Building2 },
    { label: "Clients", value: clients.length, icon: Users },
    { label: "Open enquiries", value: enquiriesSeed.filter((e) => e.status !== "Closed").length, icon: Inbox },
    { label: "Tasks due", value: tasksSeed.filter((t) => !t.done).length, icon: CalendarClock },
  ];

  return (
    <AppShell
      title="Welcome back, Bamanye"
      description="Your properties, clients and follow-ups at a glance."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="border-border">
              <CardContent className="flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AiNotice />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Latest demo listings</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link to="/properties">View all</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {listings.slice(0, 4).map((l) => (
                <div key={l.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <img
                    src={l.image}
                    alt={l.title}
                    loading="lazy"
                    width={80}
                    height={60}
                    className="h-14 w-20 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{l.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {l.suburb} · {l.beds} bed · {l.baths} bath
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatPrice(l)}</p>
                    <Badge variant="secondary" className="mt-1 text-[10px]">
                      Demo listing
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="rounded-lg bg-muted p-3">
                    <p className="text-sm">{n.text}</p>
                    <p className="text-xs text-muted-foreground">{n.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">Today's follow-ups</CardTitle>
                <TrendingUp className="h-4 w-4 text-brand-red" />
              </CardHeader>
              <CardContent className="space-y-3">
                {tasksSeed
                  .filter((t) => !t.done)
                  .slice(0, 4)
                  .map((t) => (
                    <div key={t.id} className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{t.title}</p>
                        <p className="text-xs text-muted-foreground">Due {t.due}</p>
                      </div>
                      <Badge variant={t.priority === "High" ? "destructive" : "secondary"}>{t.priority}</Badge>
                    </div>
                  ))}
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/tasks">Open task planner</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
