import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { clients } from "@/lib/data";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Client Profiles & Requirements | Majubane Properties" },
      {
        name: "description",
        content:
          "Track buyer, seller, tenant and landlord profiles, their requirements, enquiries and full communication history.",
      },
      { property: "og:title", content: "Client Profiles & Requirements | Majubane Properties" },
      {
        property: "og:description",
        content: "Buyer, seller, tenant and landlord profiles with requirements and communication history.",
      },
    ],
  }),
  component: Clients,
});

function Clients() {
  const [q, setQ] = useState("");
  const results = useMemo(
    () =>
      clients.filter((c) =>
        `${c.name} ${c.kind} ${c.requirements}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );

  return (
    <AppShell title="Clients" description="Demo client profiles, requirements and communication history.">
      <div className="space-y-6">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search clients" className="pl-9" />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {results.map((c) => (
            <Card key={c.id}>
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">{c.name}</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">{c.id} · {c.budget}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge>{c.kind}</Badge>
                  <Badge variant="secondary">{c.stage}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{c.requirements}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Phone className="h-4 w-4" />{c.phone}</span>
                  <span className="flex items-center gap-1 break-all"><Mail className="h-4 w-4" />{c.email}</span>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Communication history
                  </p>
                  <ul className="space-y-2">
                    {c.history.map((h, i) => (
                      <li key={i} className="text-sm">
                        <span className="font-medium">{h.date} · {h.channel}</span>
                        <span className="block text-muted-foreground">{h.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
