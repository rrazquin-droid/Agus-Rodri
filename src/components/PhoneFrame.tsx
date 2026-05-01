import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  label?: string;
  tone?: "bone" | "sage" | "terracotta";
};

export function PhoneFrame({ children, label, tone = "bone" }: Props) {
  const bg =
    tone === "sage"
      ? "bg-sage-lighter"
      : tone === "terracotta"
        ? "bg-terracotta-lighter"
        : "bg-bone";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[390px] h-[844px] rounded-[54px] bg-ink p-[10px] shadow-phone">
        <div className={`relative h-full w-full overflow-hidden rounded-[44px] ${bg}`}>
          <StatusBar />
          <div className="absolute inset-0 overflow-hidden pt-11">{children}</div>
          <DynamicIsland />
        </div>
      </div>
      {label ? (
        <div className="flex flex-col items-center gap-0.5 text-center">
          <span className="font-display text-sm font-medium text-ink">{label}</span>
        </div>
      ) : null}
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex h-11 items-end justify-between px-8 pb-1.5 text-ink">
      <span className="font-display text-[15px] font-semibold tabular-nums">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="5" y="5" width="3" height="7" rx="0.5" />
          <rect x="10" y="2" width="3" height="10" rx="0.5" />
          <rect x="15" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path d="M2 5a10 10 0 0 1 12 0" strokeLinecap="round" />
          <path d="M4.5 7.5a6 6 0 0 1 7 0" strokeLinecap="round" />
          <path d="M6.5 10a3 3 0 0 1 3 0" strokeLinecap="round" />
        </svg>
        <div className="flex items-center gap-0.5">
          <div className="h-[11px] w-[22px] rounded-[3px] border border-ink/90">
            <div className="m-[1.5px] h-[6px] w-[15px] rounded-[1.5px] bg-ink/90" />
          </div>
          <div className="h-[4px] w-[1.5px] rounded-full bg-ink/50" />
        </div>
      </div>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[11px] h-[30px] w-[118px] -translate-x-1/2 rounded-full bg-ink" />
  );
}
