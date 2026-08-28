import { ShieldAlert } from "lucide-react";

export function AiNotice({ text }: { text?: string }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-brand-red/30 bg-brand-red/5 p-3 text-xs text-foreground">
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
      <p>
        <span className="font-semibold">Responsible AI: </span>
        {text ??
          "AI-generated content can be inaccurate. A human must review and approve every message, summary or recommendation before it is sent to a client."}
      </p>
    </div>
  );
}
