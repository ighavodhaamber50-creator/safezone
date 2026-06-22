import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Settings as SettingsIcon, Bell, Moon, Shield, Smartphone, LogOut, ChevronRight, Wifi, Volume2 } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings · SafeTrace" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [toggles, setToggles] = useState({
    push: true,
    email: false,
    sos: true,
    geofence: true,
    battery: true,
    tamper: true,
    dark: false,
    sound: true,
  });
  const set = (k: keyof typeof toggles) => setToggles((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold flex items-center gap-2">
          <SettingsIcon className="w-7 h-7 text-primary" /> Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Tune SafeTrace to your family's routine.</p>
      </div>

      {/* Profile */}
      <section className="p-5 rounded-3xl bg-gradient-hero text-primary-foreground shadow-soft">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur grid place-items-center font-extrabold text-lg">SC</div>
          <div>
            <div className="font-bold text-lg">Sarah Carter</div>
            <div className="text-sm opacity-90">sarah@safetrace.app · Parent</div>
          </div>
        </div>
      </section>

      <Group title="Notifications" icon={Bell}>
        <ToggleRow label="Push notifications" desc="Alerts on this device" checked={toggles.push} onChange={() => set("push")} />
        <ToggleRow label="Email summaries" desc="Daily digest at 8 PM" checked={toggles.email} onChange={() => set("email")} />
        <ToggleRow label="Notification sound" desc="Play a chime for alerts" checked={toggles.sound} onChange={() => set("sound")} icon={Volume2} />
      </Group>

      <Group title="Alert types" icon={Shield}>
        <ToggleRow label="SOS alerts" desc="Always-on for emergencies" checked={toggles.sos} onChange={() => set("sos")} />
        <ToggleRow label="Geofence events" desc="Arrivals & departures" checked={toggles.geofence} onChange={() => set("geofence")} />
        <ToggleRow label="Low battery" desc="When tracker drops below 30%" checked={toggles.battery} onChange={() => set("battery")} />
        <ToggleRow label="Tamper detection" desc="Device strap or case opened" checked={toggles.tamper} onChange={() => set("tamper")} />
      </Group>

      <Group title="Devices" icon={Smartphone}>
        <LinkRow label="Ava's tracker" detail="ST-9821-AV · 78% battery" />
        <LinkRow label="Liam's tracker" detail="ST-9822-LM · 24% battery" />
        <LinkRow label="Mia's tracker" detail="ST-9823-MI · 91% battery" />
        <LinkRow label="Pair new device" detail="Bluetooth + QR code" highlight />
      </Group>

      <Group title="Appearance" icon={Moon}>
        <ToggleRow label="Dark mode" desc="Easier on the eyes at night" checked={toggles.dark} onChange={() => set("dark")} />
      </Group>

      <Group title="Connection" icon={Wifi}>
        <LinkRow label="Backend status" detail="Awaiting backend team · using demo data" />
      </Group>

      <Link to="/" className="block w-full p-4 rounded-2xl bg-card border border-border text-destructive font-semibold text-center hover:bg-destructive/5 transition">
        <LogOut className="w-4 h-4 inline mr-2" /> Sign out
      </Link>

      <p className="text-center text-xs text-muted-foreground">SafeTrace · v0.1 · Made for families</p>
    </div>
  );
}

function Group({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5" /> {title}
      </h2>
      <div className="rounded-2xl bg-card border border-border shadow-soft divide-y divide-border overflow-hidden">
        {children}
      </div>
    </section>
  );
}

function ToggleRow({ label, desc, checked, onChange, icon: Icon }: { label: string; desc: string; checked: boolean; onChange: () => void; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="p-4 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="font-semibold flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
          {label}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition shrink-0 ${checked ? "bg-primary" : "bg-muted"}`}
        aria-label={label}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-soft transition ${checked ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}

function LinkRow({ label, detail, highlight }: { label: string; detail: string; highlight?: boolean }) {
  return (
    <button className="w-full p-4 flex items-center gap-3 text-left hover:bg-secondary/50 transition">
      <div className="flex-1 min-w-0">
        <div className={`font-semibold ${highlight ? "text-primary" : ""}`}>{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{detail}</div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}
