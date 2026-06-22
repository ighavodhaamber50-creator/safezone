import { createFileRoute } from "@tanstack/react-router";
import { family, children } from "@/lib/safetrace-data";
import { Users, UserPlus, Mail, MoreVertical, Shield } from "lucide-react";

export const Route = createFileRoute("/app/family")({
  head: () => ({ meta: [{ title: "Family · SafeTrace" }] }),
  component: FamilyPage,
});

function FamilyPage() {
  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold flex items-center gap-2">
            <Users className="w-7 h-7 text-primary" /> Family
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Share live tracking with people you trust.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-soft">
          <UserPlus className="w-4 h-4" /> Invite
        </button>
      </div>

      {/* Children section */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Children · {children.length}</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {children.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-card border border-border shadow-soft text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl grid place-items-center text-white font-bold text-xl" style={{ background: c.avatarColor }}>
                {c.initials}
              </div>
              <div className="mt-2 font-bold">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.deviceId}</div>
              <div className={`mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                c.status === "safe" ? "bg-success/15 text-success" : "bg-warning/15 text-warning-foreground"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${c.status === "safe" ? "bg-success" : "bg-warning"}`} />
                {c.status === "safe" ? "Safe" : "Needs attention"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guardians */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Guardians · {family.length}</h2>
        <ul className="rounded-2xl bg-card border border-border shadow-soft divide-y divide-border overflow-hidden">
          {family.map((m) => (
            <li key={m.id} className="p-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full grid place-items-center text-white font-bold" style={{ background: m.color }}>
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate">{m.name}</span>
                  {m.role === "Parent" && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase">
                      <Shield className="w-3 h-3" /> {m.role}
                    </span>
                  )}
                  {m.role !== "Parent" && (
                    <span className="px-1.5 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[10px] font-bold uppercase">
                      {m.role}
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3 h-3" /> {m.email}
                </div>
              </div>
              {m.status === "invited" ? (
                <span className="text-[11px] font-bold uppercase tracking-wider text-warning-foreground bg-warning/15 px-2 py-1 rounded-md">Pending</span>
              ) : (
                <button className="w-8 h-8 grid place-items-center rounded-full hover:bg-secondary">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
