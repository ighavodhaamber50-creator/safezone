import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shield, Mail, Lock, ArrowRight, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · SafeTrace" },
      { name: "description", content: "Sign in to your SafeTrace family account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("sarah@safetrace.app");
  const [password, setPassword] = useState("••••••••");

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex flex-col p-8 lg:p-12">
        <Link to="/" className="flex items-center gap-2.5 self-start">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-hero grid place-items-center text-primary-foreground shadow-soft ring-1 ring-white/30">
            <MapPin className="w-5 h-5" strokeWidth={2.5} fill="currentColor" fillOpacity={0.2} />
          </div>
          <span className="font-extrabold tracking-tight">Safe<span className="text-primary">Trace</span></span>
        </Link>


        <div className="flex-1 grid place-items-center">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-extrabold">Welcome back</h1>
            <p className="mt-2 text-muted-foreground text-sm">Sign in to keep watch over your family.</p>

            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/app" });
              }}
            >
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                <div className="mt-1.5 flex items-center gap-2 px-3 rounded-xl border border-input bg-card focus-within:ring-2 focus-within:ring-ring transition">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 py-3 bg-transparent outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</label>
                <div className="mt-1.5 flex items-center gap-2 px-3 rounded-xl border border-input bg-card focus-within:ring-2 focus-within:ring-ring transition">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 py-3 bg-transparent outline-none text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" defaultChecked className="rounded border-input" /> Remember me
                </label>
                <a className="text-primary font-semibold" href="#">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-hero text-primary-foreground font-semibold shadow-soft hover:translate-y-[-1px] transition flex items-center justify-center gap-2"
              >
                Sign in <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-center text-muted-foreground pt-2">
                New to SafeTrace? <a href="#" className="text-primary font-semibold">Create a family account</a>
              </p>
            </form>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">Demo build · backend not connected yet.</p>
      </div>

      {/* Right: visual */}
      <div className="hidden lg:block relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 30% 40%, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        <div className="relative h-full flex flex-col justify-center px-12 text-primary-foreground">
          <div className="max-w-md">
            <Shield className="w-10 h-10 mb-6" />
            <h2 className="text-4xl font-extrabold leading-tight">A safer world for your family starts here.</h2>
            <p className="mt-4 opacity-90">Live GPS, instant SOS, and gentle peace of mind — all in one app.</p>
            <div className="mt-10 p-5 rounded-2xl bg-white/15 backdrop-blur border border-white/25">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full grid place-items-center text-white font-bold" style={{ background: "oklch(0.75 0.13 25)" }}>AC</div>
                <div className="text-sm">
                  <div className="font-semibold">Ava just arrived at school</div>
                  <div className="opacity-80">8:05 AM · Lincoln Elementary</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
