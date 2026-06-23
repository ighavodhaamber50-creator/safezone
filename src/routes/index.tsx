import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, MapPin, Bell, Users, History, ArrowRight, CheckCircle2 } from "lucide-react";
import familyAsset from "@/assets/family.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafeTrace — Know they're safe, always" },
      { name: "description", content: "Real-time GPS tracking, SOS alerts, geofencing and location history for your child's wearable tracker." },
      { property: "og:title", content: "SafeTrace — Child Safety GPS Tracking" },
      { property: "og:description", content: "Peace of mind for parents. Live location, safe zones, and instant SOS." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: MapPin, title: "Real-time GPS", desc: "See exactly where your child is at every moment, updated live." },
  { icon: Shield, title: "Safe zones", desc: "Get alerts when they arrive at school or leave the playground." },
  { icon: Bell, title: "Instant SOS", desc: "One press on the wearable sends an emergency alert to everyone." },
  { icon: History, title: "Location history", desc: "Review where they've been throughout the day, step by step." },
  { icon: Users, title: "Family access", desc: "Share live tracking with both parents, grandparents, or nannies." },
  { icon: CheckCircle2, title: "Safe arrival", desc: "Auto-notify when they reach home, school, or any trusted place." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="absolute top-0 inset-x-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-primary-foreground">
            <div className="relative w-10 h-10 rounded-2xl bg-white/15 backdrop-blur grid place-items-center ring-1 ring-white/30">
              <MapPin className="w-5 h-5" strokeWidth={2.5} fill="currentColor" fillOpacity={0.2} />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight text-lg">Safe<span className="opacity-80">Trace</span></div>
              <div className="text-[10px] uppercase tracking-[0.16em] opacity-75 font-semibold">Family safety</div>
            </div>
          </div>
          <Link
            to="/login"
            className="px-4 py-2 rounded-full bg-white/15 backdrop-blur text-primary-foreground text-sm font-medium hover:bg-white/25 transition"
          >
            Sign in
          </Link>
        </div>
      </header>


      {/* Hero */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px, 60px 60px",
        }} />
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 lg:pt-40 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-success" /> Live tracking · SOS · Geofences
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
              Know they're safe.<br />
              <span className="opacity-80">Always.</span>
            </h1>
            <p className="mt-5 text-lg opacity-90 max-w-md">
              SafeTrace pairs a child-friendly GPS wearable with a parent app, so you can see where they are, get alerts when something's wrong, and breathe a little easier.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-primary font-semibold shadow-soft hover:translate-y-[-1px] transition"
              >
                Open dashboard <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/15 backdrop-blur text-primary-foreground font-semibold border border-white/25 hover:bg-white/25 transition"
              >
                Create account
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs opacity-80">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> End-to-end encrypted</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Battery-friendly</div>
            </div>
          </div>

          {/* Family illustration */}
          <div className="relative mx-auto w-full max-w-md animate-float-in">
            <div className="absolute -inset-6 bg-white/15 blur-3xl rounded-full" aria-hidden />
            <div className="absolute -top-4 -left-2 px-3 py-2 rounded-2xl bg-white text-foreground shadow-soft text-xs font-semibold flex items-center gap-2 animate-pop-in">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Ava arrived at school
            </div>
            <div className="absolute bottom-6 -right-2 px-3 py-2 rounded-2xl bg-white text-foreground shadow-soft text-xs font-semibold flex items-center gap-2 animate-pop-in-delayed">
              <Shield className="w-3.5 h-3.5 text-primary" />
              Safe zone active
            </div>
            <div className="absolute -bottom-2 left-4 px-3 py-2 rounded-2xl bg-white text-foreground shadow-soft text-xs font-semibold flex items-center gap-2 animate-pop-in-delayed2">
              <span className="w-6 h-6 rounded-full grid place-items-center text-white text-[10px] font-bold" style={{ background: "oklch(0.7 0.13 240)" }}>LC</span>
              Liam · 78% battery
            </div>
            <img
              src={familyAsset.url}
              alt="Illustration of a family with a child wearing a SafeTrace GPS tracker"
              className="relative w-full h-auto drop-shadow-2xl select-none"
              draggable={false}
            />
          </div>
        </div>
      </section>


      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Everything you need, nothing you don't.</h2>
          <p className="mt-3 text-muted-foreground">Built with input from real parents and child-safety experts.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground grid place-items-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row gap-3 items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>© 2026 SafeTrace. Made for families.</span>
          </div>
          <div className="flex gap-5">
            <a className="hover:text-foreground" href="#">Privacy</a>
            <a className="hover:text-foreground" href="#">Terms</a>
            <a className="hover:text-foreground" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
