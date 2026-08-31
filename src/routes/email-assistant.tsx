import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AiNotice } from "@/components/AiNotice";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { runAi } from "@/lib/ai.functions";

export const Route = createFileRoute("/email-assistant")({
  head: () => ({
    meta: [
      { title: "AI Email Assistant | Majubane Properties" },
      {
        name: "description",
        content:
          "Draft professional property emails, replies and follow-ups for buyers, sellers, tenants and landlords, ready for human review.",
      },
      { property: "og:title", content: "AI Email Assistant | Majubane Properties" },
      { property: "og:description", content: "Generate professional client emails, replies and follow-ups." },
    ],
  }),
  component: EmailAssistant,
});

function EmailAssistant() {
  const ask = useServerFn(runAi);
  const [kind, setKind] = useState("New enquiry reply");
  const [tone, setTone] = useState("Professional and warm");
  const [recipient, setRecipient] = useState("");
  const [context, setContext] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!context.trim()) {
      toast.error("Add some context about the email first.");
      return;
    }
    setLoading(true);
    try {
      const res = await ask({
        data: {
          system:
            "You write emails on behalf of Majubane Properties, an estate agency in Gqeberha (Port Elizabeth), Eastern Cape, South Africa. Director: Bamanye Majubane (bamanyemajubane@gmail.com). Use South African English, Rand amounts and a clear subject line. Keep emails concise, courteous and free of legal or financial guarantees. Output a Subject line followed by the email body, signed off by Bamanye Majubane, Majubane Properties.",
          prompt: `Email type: ${kind}\nTone: ${tone}\nRecipient: ${recipient || "the client"}\nContext and points to cover:\n${context}`,
        },
      });
      setDraft(res.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="AI Email Assistant" description="Draft emails, replies and follow-ups in seconds.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Email brief</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-1.5 block text-xs">Email type</Label>
                <Select value={kind} onValueChange={setKind}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[
                      "New enquiry reply",
                      "Viewing confirmation",
                      "Follow-up after viewing",
                      "Offer update",
                      "Lease renewal reminder",
                      "Outstanding documents request",
                    ].map((k) => (
                      <SelectItem key={k} value={k}>{k}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-xs">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Professional and warm", "Formal", "Friendly and brief", "Firm but polite"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block text-xs">Recipient</Label>
              <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Thandiwe Mbeki (buyer)" />
            </div>
            <div>
              <Label className="mb-1.5 block text-xs">Context / points to cover</Label>
              <Textarea
                rows={7}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g. Viewed MP-1001 in Summerstrand on Saturday, asking R3 450 000, wants to know about levies and school zoning."
              />
            </div>
            <Button className="w-full" onClick={() => void generate()} disabled={loading}>
              {loading ? "Drafting…" : "Generate email"}
            </Button>
            <AiNotice text="Every generated email must be read, corrected and approved by a person before it is sent to a client." />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Draft (for review)</CardTitle>
            {draft && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  void navigator.clipboard.writeText(draft);
                  toast.success("Draft copied — remember to review before sending.");
                }}
              >
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {draft ? (
              <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={22} className="text-sm" />
            ) : (
              <p className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                Your draft will appear here, fully editable before you send it.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
