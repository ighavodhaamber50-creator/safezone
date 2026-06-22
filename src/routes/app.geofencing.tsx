import { createFileRoute } from "@tanstack/react-router";
import { geofences, children } from "@/lib/safetrace-data";
import { Shield, Plus, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/geofencing")({
  head: () => ({ meta: [{ title: "Safe zones · SafeTrace" }] }),
  component: GeofencingPage,
});

function GeofencingPage() {
  const [list, setList] = useState(geofences);

  const toggle = (id: string) =>
    setList((prev) => prev.map((g) => (g.id === id ? { ...g, active: !g.active } : g)));

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold flex items-center gap-2">
            <Shield className="w-7 h-7 text-primary" /> Safe zones
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Get notified the moment they arrive or leave.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-soft">
          <Plus className="w-4 h-4" /> Add zone
        </button>
      </div>

      {/* Map preview */}
      <div className="relative h-64 rounded-3xl overflow-hidden border border-border shadow-soft map-grid">
        {list.map((g, i) => (
          <div
            key={g.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition ${g.active ? "opacity-100" : "opacity-30"}`}
            style={{ left: `${20 + i * 22}%`, top: `${30 + (i % 2) * 30}%` }}
          >
            <div className="w-28 h-28 rounded-full border-2 opacity-60" style={{ borderColor: g.color, background: `${g.color.replace(")", " / 0.15)").replace("oklch(", "oklch(")}` }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-card text-[11px] font-bold shadow-soft whitespace-nowrap">
              {g.name}
            </div>
          </div>
        ))}
      </div>

      <ul className="grid sm:grid-cols-2 gap-3">
        {list.map((g) => (
          <li key={g.id} className="p-4 rounded-2xl bg-card border border-border shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-xl grid place-items-center" style={{ background: `color-mix(in oklch, ${g.color} 22%, transparent)`, color: g.color }}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold truncate">{g.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{g.address}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Radius {g.radius} m</p>
                </div>
              </div>
              <button
                onClick={() => toggle(g.id)}
                className={`relative w-11 h-6 rounded-full transition ${g.active ? "bg-primary" : "bg-muted"}`}
                aria-label="Toggle zone"
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-soft transition ${g.active ? "translate-x-5" : ""}`} />
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <div className="flex -space-x-2">
                {g.assigned.map((cid) => {
                  const c = children.find((ch) => ch.id === cid)!;
                  return (
                    <div key={cid} className="w-7 h-7 rounded-full ring-2 ring-card grid place-items-center text-white text-[10px] font-bold" style={{ background: c.avatarColor }} title={c.name}>
                      {c.initials}
                    </div>
                  );
                })}
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {g.active ? "Active" : "Paused"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
