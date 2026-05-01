"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useSim } from "@/lib/sim/SimContext";
import { IconSettings, IconBell, IconCheck, IconTrash } from "./Icons";

export function DemoPanel({ force = false }: { force?: boolean } = {}) {
  const [open, setOpen] = useState(false);
  const { demoMode, triggerAlerta, confirmToma, reset, events } = useSim();
  const router = useAppRouter();
  const pathname = usePathname();

  // En la home `/` el panel se monta adentro del MockupShell con `force` para
  // usar el router interno. Si no, lo escondemos para no duplicar.
  if (!force && pathname === "/") return null;

  const hasAlert = events.some((e) => e.state === "omitido");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Controles de demo"
        className="fixed bottom-4 right-4 z-50 flex h-10 items-center gap-1.5 rounded-full bg-ink/90 px-3 text-[11px] font-semibold uppercase tracking-wider text-bone-soft shadow-phone backdrop-blur"
      >
        <span className="flex h-1.5 w-1.5 rounded-full bg-sage animate-breathe" />
        Demo
      </button>

      {open ? (
        <div className="fixed bottom-16 right-4 z-50 w-72 rounded-[20px] border border-mist bg-bone-soft p-4 shadow-phone">
          <div className="flex items-center justify-between">
            <span className="font-display text-[13px] font-semibold text-ink">
              Controles de demo
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[11px] text-shadow"
            >
              Cerrar
            </button>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-shadow">
            Estado actual:{" "}
            <span className="font-semibold text-ink">
              {demoMode === "alerta" ? "Alerta activa" : "Todo en orden"}
            </span>
          </p>

          <div className="mt-3 flex flex-col gap-1.5">
            <DemoButton
              icon={<IconBell className="h-4 w-4" />}
              label="Disparar alerta (9:00 omitida)"
              onClick={() => {
                triggerAlerta();
                router.push("/alerta");
                setOpen(false);
              }}
              disabled={hasAlert}
              tone="terracotta"
            />
            <DemoButton
              icon={<IconCheck className="h-4 w-4" strokeWidth={2.4} />}
              label="Confirmar próxima toma (14:00)"
              onClick={() => {
                confirmToma("mediodia", "14:07");
                setOpen(false);
              }}
              tone="sage"
            />
            <DemoButton
              icon={<IconSettings className="h-4 w-4" />}
              label="Ir al dashboard"
              onClick={() => {
                router.push("/dashboard");
                setOpen(false);
              }}
            />
            <DemoButton
              icon={<IconTrash className="h-4 w-4" />}
              label="Reset (borra todo)"
              onClick={() => {
                reset();
                router.push("/dashboard");
                setOpen(false);
              }}
              tone="muted"
            />
          </div>
          <p className="mt-3 text-[10px] leading-relaxed text-shadow">
            Datos simulados en localStorage · nada viaja a un servidor
          </p>
        </div>
      ) : null}
    </>
  );
}

function DemoButton({
  icon,
  label,
  onClick,
  disabled,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  tone?: "sage" | "terracotta" | "muted";
}) {
  const bg =
    tone === "sage"
      ? "bg-sage-lighter/60 text-sage-dark hover:bg-sage-lighter"
      : tone === "terracotta"
        ? "bg-terracotta-lighter/70 text-terracotta hover:bg-terracotta-lighter"
        : tone === "muted"
          ? "bg-mist-soft text-shadow hover:bg-mist"
          : "bg-bone text-ink hover:bg-mist-soft border border-mist";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-medium transition ${bg} disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
