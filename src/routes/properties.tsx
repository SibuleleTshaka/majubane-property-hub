import { createFileRoute } from "@tanstack/react-router";
import { Bath, BedDouble, Car, MapPin, Maximize, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice, listings } from "@/lib/data";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties for Sale & Rent | Majubane Properties" },
      {
        name: "description",
        content:
          "Search demo property listings in Gqeberha and the Eastern Cape by location, price, bedrooms, bathrooms, property type and sale or rent.",
      },
      { property: "og:title", content: "Properties for Sale & Rent | Majubane Properties" },
      {
        property: "og:description",
        content: "Filter Eastern Cape demo listings by location, price, bedrooms, bathrooms and type.",
      },
    ],
  }),
  component: Properties,
});

const ANY = "any";

function Properties() {
  const [q, setQ] = useState("");
  const [deal, setDeal] = useState(ANY);
  const [type, setType] = useState(ANY);
  const [beds, setBeds] = useState(ANY);
  const [baths, setBaths] = useState(ANY);
  const [maxPrice, setMaxPrice] = useState("");

  const results = useMemo(
    () =>
      listings.filter((l) => {
        const text = `${l.title} ${l.suburb} ${l.city} ${l.id}`.toLowerCase();
        if (q && !text.includes(q.toLowerCase())) return false;
        if (deal !== ANY && l.deal !== deal) return false;
        if (type !== ANY && l.type !== type) return false;
        if (beds !== ANY && l.beds < Number(beds)) return false;
        if (baths !== ANY && l.baths < Number(baths)) return false;
        if (maxPrice && l.price > Number(maxPrice)) return false;
        return true;
      }),
    [q, deal, type, beds, baths, maxPrice],
  );

  return (
    <AppShell
      title="Properties"
      description="All listings below are clearly labelled demo examples used to showcase the platform."
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-6">
            <div className="xl:col-span-2">
              <Label className="mb-1.5 block text-xs">Location or keyword</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="e.g. Summerstrand"
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block text-xs">Sale / Rent</Label>
              <Select value={deal} onValueChange={setDeal}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Any</SelectItem>
                  <SelectItem value="Sale">For sale</SelectItem>
                  <SelectItem value="Rent">To rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 block text-xs">Property type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Any</SelectItem>
                  {["House", "Apartment", "Townhouse", "Vacant Land", "Commercial"].map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="mb-1.5 block text-xs">Beds</Label>
                <Select value={beds} onValueChange={setBeds}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY}>Any</SelectItem>
                    {[1, 2, 3, 4].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n}+</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-xs">Baths</Label>
                <Select value={baths} onValueChange={setBaths}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY}>Any</SelectItem>
                    {[1, 2, 3].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n}+</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block text-xs">Max price (R)</Label>
              <Input
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                placeholder="e.g. 3000000"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{results.length} demo listings found</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQ("");
              setDeal(ANY);
              setType(ANY);
              setBeds(ANY);
              setBaths(ANY);
              setMaxPrice("");
            }}
          >
            Clear filters
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((l) => (
            <Card key={l.id} className="overflow-hidden p-0">
              <div className="relative">
                <img
                  src={l.image}
                  alt={l.title}
                  loading="lazy"
                  width={1024}
                  height={683}
                  className="h-48 w-full object-cover"
                />
                <Badge className="absolute left-3 top-3 bg-brand-red text-primary-foreground">Demo listing</Badge>
                <Badge className="absolute right-3 top-3" variant="secondary">
                  {l.deal === "Sale" ? "For sale" : "To rent"}
                </Badge>
              </div>
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-lg font-bold">{formatPrice(l)}</p>
                  <Badge variant={l.status === "Available" ? "secondary" : "outline"}>{l.status}</Badge>
                </div>
                <div>
                  <p className="font-semibold leading-snug">{l.title}</p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {l.suburb}, {l.city}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 border-t border-border pt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" />{l.beds}</span>
                  <span className="flex items-center gap-1"><Bath className="h-4 w-4" />{l.baths}</span>
                  <span className="flex items-center gap-1"><Car className="h-4 w-4" />{l.garages}</span>
                  <span className="flex items-center gap-1"><Maximize className="h-4 w-4" />{l.size} m²</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-muted-foreground">{l.id} · {l.agent}</span>
                  <Button size="sm">Enquire</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {results.length === 0 && (
          <p className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No listings match your filters. Try widening your search.
          </p>
        )}
      </div>
    </AppShell>
  );
}
