import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AiNotice } from "@/components/AiNotice";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { runAi } from "@/lib/ai.functions";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant | Majubane Properties" },
      {
        name: "description",
        content:
          "Ask the Majubane Properties AI assistant about listings, pricing, admin processes and South African property questions.",
      },
      { property: "og:title", content: "AI Assistant | Majubane Properties" },
      { property: "og:description", content: "A simple chat assistant for property and admin questions." },
    ],
  }),
  component: Assistant,
});

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM =
  "You are the internal assistant for Majubane Properties, an estate agency in Gqeberha (Port Elizabeth), Eastern Cape, South Africa, directed by Bamanye Majubane. Answer property, marketing and admin questions clearly and briefly in South African English, using Rand (R) amounts. If you are unsure, say so and suggest verifying with the relevant authority (e.g. PPRA, deeds office, or the client's bank).";

function Assistant() {
  const ask = useServerFn(runAi);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hello Bamanye. Ask me anything about your listings, pricing, tenant screening or day-to-day admin. Please review my answers before acting on them.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const history = [...messages, { role: "user" as const, content: text }];
    setMessages(history);
    setInput("");
    setLoading(true);
    try {
      const transcript = history.map((m) => `${m.role === "user" ? "Agent" : "Assistant"}: ${m.content}`).join("\n\n");
      const res = await ask({ data: { system: SYSTEM, prompt: transcript } });
      setMessages((prev) => [...prev, { role: "assistant", content: res.text }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="AI Assistant" description="A simple chat box for property and admin questions.">
      <div className="mx-auto max-w-3xl space-y-4">
        <AiNotice />
        <Card>
          <CardContent className="space-y-4 p-5">
            <div className="max-h-[55vh] space-y-4 overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm text-primary-foreground"
                      : "mr-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-muted px-4 py-3 text-sm"
                  }
                >
                  {m.content}
                </div>
              ))}
              {loading && <p className="text-sm text-muted-foreground">Thinking…</p>}
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. What documents do I need for a rental application?"
              />
              <Button type="submit" disabled={loading} aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
