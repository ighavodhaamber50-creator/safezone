import { createFileRoute } from "@tanstack/react-router";
import { alerts, children } from "@/lib/safetrace-data";
import { AlertTriangle, BatteryLow, MapPinOff, MapPin, Shield, Bell, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/alerts")({
  head: () => ({ meta: [{ title: "Alerts · SafeTrace" }] }),
  component: AlertsPage,
});

const iconMap = {
  sos: { Icon: AlertTriangle, tone: "destructive" },
  low_battery: { Icon: BatteryLow, tone: "warning" },
  geofence_exit: { Icon: MapPinOff, tone: "warning" },
  geofence_enter: { Icon: MapPin, tone: "primary" },
  tamper: { Icon: Shield, tone: "destructive" },
  safe_arrival: { Icon: CheckCircle2, tone: "success" },
} as const;

const toneBg: Record<string, string> = {
  destructive: "bg-destructive/10 text-destructive",
  warning: "bg-warning/15 text-warning-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/15 text-success",
};

const filters = ["All", "Unread", "Critical"] as const;

function AlertsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = alerts.filter((a) => {
    if (filter === "Unread") return !a.read;
    if (filter === "Critical") return a.type === "sos" || a.type === "tamper";
    return true;
  });

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold flex items-center gap-2">
            <Bell className="w-7 h-7 text-primary" /> Alerts
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{alerts.filter((a) => !a.read).length} unread · last 7 days</p>
        </div>
      </div>

      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {visible.map((a) => {
          const child = children.find((c) => c.id === a.childId)!;
          const { Icon, tone } = iconMap[a.type];
          return (
            <li
              key={a.id}
              className={`p-4 rounded-2xl bg-card border shadow-soft flex gap-3 items-start ${
                a.read ? "border-border" : "border-primary/40"
              }`}
            >
              <div className={`w-10 h-10 shrink-0 rounded-xl grid place-items-center ${toneBg[tone]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{a.title}</h3>
                  {!a.read && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{a.message}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-5 h-5 rounded-full grid place-items-center text-white text-[10px] font-bold" style={{ background: child.avatarColor }}>
                    {child.initials}
                  </span>
                  {child.name.split(" ")[0]} · {a.time}
                </div>
              </div>
            </li>
          );
        })}
        {visible.length === 0 && (
          <li className="p-10 text-center text-sm text-muted-foreground rounded-2xl bg-card border border-border">
            Nothing here. You're all caught up.
          </li>
        )}
      </ul>
    </div>
  );
}
