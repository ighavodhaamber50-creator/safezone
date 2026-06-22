import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  MapPin,
  Bell,
  History,
  Shield,
  Users,
  Settings,
  AlertCircle,
} from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/app", label: "Live", icon: MapPin, exact: true },
  { to: "/app/alerts", label: "Alerts", icon: Bell },
  { to: "/app/history", label: "History", icon: History },
  { to: "/app/geofencing", label: "Zones", icon: Shield },
  { to: "/app/family", label: "Family", icon: Users },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children: pageChildren }: { children?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-border bg-sidebar">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-xl bg-gradient-hero grid place-items-center text-primary-foreground shadow-soft">
            <Shield className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-bold text-sidebar-foreground leading-tight">SafeTrace</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Family safety</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2.2} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="m-3 p-4 rounded-2xl bg-gradient-hero text-primary-foreground">
          <div className="flex items-center gap-2 text-xs font-semibold opacity-90">
            <AlertCircle className="w-3.5 h-3.5" /> EMERGENCY
          </div>
          <div className="mt-1 text-sm font-bold">Call 911</div>
          <p className="text-xs opacity-90 mt-1">Use SOS only for real emergencies.</p>
        </div>
      </aside>

      {/* Mobile top header */}
      <header className="lg:hidden sticky top-0 z-30 h-14 flex items-center justify-between px-4 border-b border-border bg-background/90 backdrop-blur">
        <Link to="/app" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-hero grid place-items-center text-primary-foreground">
            <Shield className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <span className="font-bold">SafeTrace</span>
        </Link>
        <Link
          to="/app/alerts"
          className="relative w-9 h-9 grid place-items-center rounded-full bg-secondary text-secondary-foreground"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </Link>
      </header>

      {/* Page */}
      <main className="lg:pl-64 pb-24 lg:pb-0">
        {pageChildren ?? <Outlet />}
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-background/95 backdrop-blur">
        <ul className="grid grid-cols-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to, item.exact);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
