import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { children } from "@/lib/safetrace-data";
import { Battery, BatteryLow, Signal, SignalLow, SignalZero, MapPin, Navigation, Phone, MessageCircle, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Live · SafeTrace" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [selectedId, setSelectedId] = useState(children[0].id);
  const selected = children.find((c) => c.id === selectedId)!;

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Good afternoon, Sarah</p>
          <h1 className="text-2xl lg:text-3xl font-extrabold">Everyone is accounted for</h1>
        </div>
        <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold">
          <Navigation className="w-4 h-4" /> Recenter
        </button>
      </div>

      {/* Child selector */}
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 lg:mx-0 lg:px-0">
        {children.map((c) => {
          const active = c.id === selectedId;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`shrink-0 flex items-center gap-3 pl-2 pr-4 py-2 rounded-2xl border transition ${
                active ? "bg-card border-primary shadow-soft" : "bg-card/60 border-border hover:bg-card"
              }`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full grid place-items-center text-white font-bold text-sm" style={{ background: c.avatarColor }}>
                  {c.initials}
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-card ${
                  c.status === "safe" ? "bg-success" : c.status === "alert" ? "bg-warning" : "bg-muted-foreground"
                }`} />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold leading-tight">{c.name.split(" ")[0]}</div>
                <div className="text-[11px] text-muted-foreground">{c.lastSeen}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Map + side info */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden border border-border shadow-soft h-[420px] map-grid">
          {/* Geofence circle */}
          <div className="absolute" style={{ left: `${selected.pin.x}%`, top: `${selected.pin.y}%`, transform: "translate(-50%, -50%)" }}>
            <div className="w-48 h-48 rounded-full border-2 border-primary/40 bg-primary/10" />
          </div>
          {/* Pins for all kids */}
          {children.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${c.pin.x}%`, top: `${c.pin.y}%` }}
            >
              <div className={`relative ${c.id === selectedId ? "scale-110" : ""} transition`}>
                {c.id === selectedId && (
                  <span className="absolute inset-0 rounded-full pulse-ring text-primary" />
                )}
                <div className="relative w-12 h-12 rounded-full ring-4 ring-card shadow-soft grid place-items-center text-white font-bold" style={{ background: c.avatarColor }}>
                  {c.initials}
                </div>
              </div>
              <div className="mt-1 px-2 py-0.5 rounded-full bg-card text-[10px] font-semibold shadow-soft whitespace-nowrap mx-auto w-fit">
                {c.name.split(" ")[0]}
              </div>
            </button>
          ))}

          {/* Top-left badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-card/95 backdrop-blur text-xs font-semibold flex items-center gap-2 shadow-soft">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-success" />
            </span>
            Live tracking
          </div>

          {/* SOS button */}
          <button className="absolute bottom-5 right-5 w-16 h-16 rounded-full bg-gradient-sos text-destructive-foreground font-extrabold text-sm shadow-glow grid place-items-center">
            SOS
          </button>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-card border border-border shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl grid place-items-center text-white font-bold text-lg" style={{ background: selected.avatarColor }}>
                {selected.initials}
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">{selected.name}</div>
                <div className="text-xs text-muted-foreground">Device {selected.deviceId}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">{selected.location.label}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">Updated {selected.lastSeen}</div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat
                icon={selected.battery < 30 ? BatteryLow : Battery}
                label="Battery"
                value={`${selected.battery}%`}
                tone={selected.battery < 30 ? "warning" : "success"}
              />
              <Stat
                icon={selected.signal === "lost" ? SignalZero : selected.signal === "weak" ? SignalLow : Signal}
                label="Signal"
                value={selected.signal[0].toUpperCase() + selected.signal.slice(1)}
                tone={selected.signal === "strong" ? "success" : selected.signal === "weak" ? "warning" : "destructive"}
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <ActionBtn icon={Phone} label="Call" />
              <ActionBtn icon={MessageCircle} label="Ping" />
              <ActionBtn icon={Navigation} label="Route" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-card border border-border shadow-soft">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <h3 className="font-bold text-sm">Recent activity</h3>
            </div>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-success" />
                <div>
                  <div className="font-medium">Entered "Lincoln Elementary"</div>
                  <div className="text-xs text-muted-foreground">8:05 AM</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-warning" />
                <div>
                  <div className="font-medium">Low battery warning</div>
                  <div className="text-xs text-muted-foreground">Yesterday, 6:12 PM</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-primary" />
                <div>
                  <div className="font-medium">Safe arrival at Home</div>
                  <div className="text-xs text-muted-foreground">Yesterday, 3:28 PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; tone: "success" | "warning" | "destructive" }) {
  const toneClass = tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-destructive";
  return (
    <div className="p-3 rounded-2xl bg-secondary">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        <Icon className={`w-3.5 h-3.5 ${toneClass}`} />
        {label}
      </div>
      <div className="mt-1 font-bold">{value}</div>
    </div>
  );
}

function ActionBtn({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-secondary text-secondary-foreground hover:bg-accent transition">
      <Icon className="w-4 h-4" />
      <span className="text-[11px] font-semibold">{label}</span>
    </button>
  );
}
