import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tasksSeed, type Task } from "@/lib/data";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Task Planner | Majubane Properties" },
      {
        name: "description",
        content: "Create, prioritise and track daily and weekly estate agency tasks, viewings and follow-ups.",
      },
      { property: "og:title", content: "Task Planner | Majubane Properties" },
      { property: "og:description", content: "Plan viewings, admin and follow-ups by priority and due date." },
    ],
  }),
  component: Tasks,
});

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(tasksSeed);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("Medium");
  const [category, setCategory] = useState<Task["category"]>("Follow-up");

  const add = () => {
    if (!title.trim()) return;
    setTasks((prev) => [
      { id: `T-${Date.now()}`, title: title.trim(), due: due || "No date", priority, category, done: false },
      ...prev,
    ]);
    setTitle("");
    setDue("");
  };

  const open = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  return (
    <AppShell title="Task Planner" description="Plan and prioritise your daily and weekly work.">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle className="text-base">New task</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-1.5 block text-xs">Task</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Call the Botha family" />
            </div>
            <div>
              <Label className="mb-1.5 block text-xs">Due date</Label>
              <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1.5 block text-xs">Priority</Label>
                <Select value={priority} onValueChange={(v) => setPriority(v as Task["priority"])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["High", "Medium", "Low"].map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-xs">Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as Task["category"])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Viewing", "Follow-up", "Admin", "Marketing"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full" onClick={add}>Add task</Button>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Open tasks ({open.length})</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {open.map((t) => (
                <TaskRow key={t.id} task={t} setTasks={setTasks} />
              ))}
              {open.length === 0 && <p className="text-sm text-muted-foreground">Nothing outstanding. Well done!</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Completed ({done.length})</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {done.map((t) => (
                <TaskRow key={t.id} task={t} setTasks={setTasks} />
              ))}
              {done.length === 0 && <p className="text-sm text-muted-foreground">No completed tasks yet.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function TaskRow({
  task,
  setTasks,
}: {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3">
      <Checkbox
        checked={task.done}
        onCheckedChange={() =>
          setTasks((prev) => prev.map((x) => (x.id === task.id ? { ...x, done: !x.done } : x)))
        }
        aria-label="Toggle task"
      />
      <div className="min-w-0 flex-1">
        <p className={task.done ? "text-sm line-through text-muted-foreground" : "text-sm font-medium"}>
          {task.title}
        </p>
        <p className="text-xs text-muted-foreground">Due {task.due} · {task.category}</p>
      </div>
      <Badge variant={task.priority === "High" ? "destructive" : "secondary"}>{task.priority}</Badge>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Delete task"
        onClick={() => setTasks((prev) => prev.filter((x) => x.id !== task.id))}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
