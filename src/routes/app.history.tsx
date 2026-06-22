import { createFileRoute } from "@tanstack/react-router";
import { children, historyByChild } from "@/lib/safetrace-data";
import { useState } from "react";
import { Clock, MapPin, Route as RouteIcon } from "lucide-react";

export const Route = createFileRoute("/app/history")({
  head: () => ({ meta: [{ title: "History · SafeTrace" }] }),
  component: HistoryPage,
});

function HistoryPage() {
  const [childId, setChildId] = useState(children[0].id);
  const child = children.find((c) => c.id === childId)!;
  const points = historyByChild[childId] ?? [];

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold flex items-center gap-2">
          <RouteIcon className="w-7 h-7 text-primary" /> Location history
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Today's timeline of places visited.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {children.map((c) => (
          <button
            key={c.id}
            onClick={() => setChildId(c.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-semibold border transition ${
              childId === c.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border"
            }`}
          >
            {c.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-3xl bg-card border border-border shadow-soft">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="w-12 h-12 rounded-2xl grid place-items-center text-white font-bold" style={{ background: child.avatarColor }}>
            {child.initials}
          </div>
          <div>
            <div className="font-bold">{child.name}</div>
            <div className="text-xs text-muted-foreground">Monday, June 22 · {points.length} stops</div>
          </div>
        </div>

        <ol className="mt-5 relative pl-6">
          <span className="absolute left-2 top-2 bottom-2 w-px bg-border" />
          {points.map((p, i) => (
            <li key={i} className="relative pb-5 last:pb-0">
              <span className={`absolute -left-[18px] top-1 w-3 h-3 rounded-full ring-4 ring-card ${
                p.type === "stop" ? "bg-primary" : "bg-warning"
              }`} />
              <div className="flex items-baseline gap-3">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground">{p.time}</span>
              </div>
              <div className="mt-1 font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> {p.place}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{p.duration}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
