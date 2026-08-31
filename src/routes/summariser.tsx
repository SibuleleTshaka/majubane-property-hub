import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AiNotice } from "@/components/AiNotice";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export const Route = createFileRoute("/summariser")({
  head: () => ({
    meta: [
      { title: "AI Summariser | Majubane Properties" },
      {
        name: "description",
        content:
          "Turn long emails, meeting notes and property documents into key points, action items and deadlines for your team.",
      },
      { property: "og:title", content: "AI Summariser | Majubane Properties" },
      { property: "og:description", content: "Summarise emails, meetings and documents into actions and deadlines." },
    ],
  }),
  component: Summariser;
});

function Summariser() {
  const ask = useServerFn(runAi);
  const [source, setSource] = useState("Email thread");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (text.trim().length < 20) {
      toast.error("Paste the text you would like summarised.");
      return;
    }
    setLoading(true);
    try {
      const res = await ask({
        data: {
          system:
            "You summarise estate agency material for Majubane Properties in Gqeberha, South Africa. Always reply in three markdown-free sections with these exact headings: KEY POINTS, ACTION ITEMS (with owner where stated), DEADLINES AND DATES. Use short bullet lines starting with '- '. Never invent facts; write 'Not stated' where information is missing.",
          prompt: `Source type: ${source}\n\nContent:\n${text}`,
        },
      });
      setSummary(res.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="AI Summariser" description="Key points, actions and deadlines from any email, meeting or document.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Paste your content</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-1.5 block text-xs">Source type</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Email thread", "Meeting notes", "Lease or contract", "Valuation report", "WhatsApp conversation"].map(
                    (s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              rows={14}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the email, meeting notes or document text here…"
            />
            <Button className="w-full" onClick={() => void run()} disabled={loading}>
              {loading ? "Summarising…" : "Summarise"}
            </Button>
            <AiNotice text="Summaries can miss or misread detail. Check them against the original document before acting or replying to a client." />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Summary</CardTitle>
            {summary && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  void navigator.clipboard.writeText(summary);
                  toast.success("Summary copied.");
                }}
              >
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {summary ? (
              <pre className="whitespace-pre-wrap font-sans text-sm">{summary}</pre>
            ) : (
              <p className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                Key points, action items and deadlines will appear here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
