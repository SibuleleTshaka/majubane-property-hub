import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enquiriesSeed, type Enquiry } from "@/lib/data";

export const Route = createFileRoute("/enquiries")({
  head: () => ({
    meta: [
      { title: "Buyer & Renter Enquiries | Majubane Properties" },
      {
        name: "description",
        content: "Manage incoming buyer and renter enquiries, assign statuses and schedule follow-ups in one place.",
      },
      { property: "og:title", content: "Buyer & Renter Enquiries | Majubane Properties" },
      {
        property: "og:description",
        content: "Track enquiry status and follow-ups from website, email, phone and WhatsApp.",
      },
    ],
  }),
  component: Enquiries,
});

const statuses: Enquiry["status"][] = ["New", "In progress", "Follow-up", "Closed"];

function Enquiries() {
  const [items, setItems] = useState<Enquiry[]>(enquiriesSeed);
  const [filter, setFilter] = useState<string>("All");

  const visible = filter === "All" ? items : items.filter((e) => e.status === filter);

  return (
    <AppShell title="Enquiries" description="Buyer and renter enquiries with follow-up tracking (demo data).">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All statuses</SelectItem>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">{visible.length} enquiries</p>
        </div>

        {visible.map((e) => (
          <Card key={e.id}>
            <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{e.client}</p>
                  <Badge variant="secondary">{e.channel}</Badge>
                  <Badge variant={e.status === "Closed" ? "outline" : "default"}>{e.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{e.listing} · received {e.received}</p>
                <p className="mt-2 text-sm">{e.message}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select
                  value={e.status}
                  onValueChange={(v) =>
                    setItems((prev) =>
                      prev.map((x) => (x.id === e.id ? { ...x, status: v as Enquiry["status"] } : x)),
                    )
                  }
                >
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => toast.success(`Follow-up reminder set for ${e.client}`)}>
                  Set follow-up
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
