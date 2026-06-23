import { MapPin } from "lucide-react";

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <div
      className="relative grid place-items-center rounded-2xl bg-gradient-hero text-primary-foreground shadow-soft"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <MapPin className="w-1/2 h-1/2" strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />
      <span className="absolute inset-0 rounded-2xl ring-1 ring-white/30" />
    </div>
  );
}

export function LogoWordmark({ subtitle = true }: { subtitle?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark />
      <div className="leading-tight">
        <div className="font-extrabold tracking-tight">
          Safe<span className="text-primary">Trace</span>
        </div>
        {subtitle && (
          <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
            Family safety
          </div>
        )}
      </div>
    </div>
  );
}
