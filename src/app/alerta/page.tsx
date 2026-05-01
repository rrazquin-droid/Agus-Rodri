"use client";

import AppLink from "@/components/AppLink";
import {
  IconArrowLeft,
  IconPhone,
  IconClock,
  IconCheck,
  IconPill,
} from "@/components/Icons";
import { useSim } from "@/lib/sim/SimContext";
import { useClock, formatRelative } from "@/hooks/useClock";

export default function AlertaPage() {
  const { events } = useSim();
  const now = useClock(30000);

  const omitido = events.find((e) => e.state === "omitido");

  // Si no hay alerta activa, mostrar estado vacío (no rompe el prototipo)
  if (!omitido) {
    return (
      <div className="relative flex h-full flex-col bg-bone">
        <div className="flex items-center justify-between px-5 pt-3">
          <AppLink
            href="/dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-bone-soft border border-mist"
            aria-label="Volver"
          >
            <IconArrowLeft className="h-5 w-5 text-ink" />
          </AppLink>
          <span className="font-display text-[15px] font-semibold text-ink">Alertas</span>
          <div className="h-10 w-10" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-lighter">
            <IconCheck className="h-8 w-8 text-sage-dark" strokeWidth={2.2} />
          </div>
          <p className="mt-4 font-display text-[22px] font-medium text-ink">
            Sin alertas activas.
          </p>
          <p className="mt-2 text-[14px] text-ink-soft">
            Usá el panel de <span className="font-semibold">Demo</span> abajo a la derecha para simular una.
          </p>
        </div>
      </div>
    );
  }

  // Calcular "hace X minutos" simulado — el alerta "se disparó" hace 47 min
  const msAgo = now ? Math.max(0, Date.now() - (Date.now() - 47 * 60 * 1000)) : 47 * 60 * 1000;
  const ago = formatRelative(msAgo);

  return (
    <div className="relative flex h-full flex-col bg-terracotta-lighter/50">
      <div className="flex items-center justify-between px-5 pt-3">
        <AppLink
          href="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-bone-soft border border-mist"
          aria-label="Volver"
        >
          <IconArrowLeft className="h-5 w-5 text-ink" />
        </AppLink>
        <span className="font-display text-[15px] font-semibold text-ink">Requiere atención</span>
        <div className="h-10 w-10" />
      </div>

      <div className="flex flex-col items-center pt-8">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <span className="absolute h-full w-full animate-breathe rounded-full bg-terracotta/25" />
          <span className="absolute h-20 w-20 rounded-full bg-terracotta/40" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-terracotta">
            <IconClock className="h-7 w-7 text-bone-soft" strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="px-6 pt-6 text-center">
        <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-terracotta">
          Toma de las {omitido.scheduledAt} · {omitido.label}
        </p>
        <h1 className="mt-2 font-display text-[26px] font-medium leading-tight text-ink">
          Silvia no tomó sus<br />pastillas todavía.
        </h1>
        <p className="mt-3 px-3 text-[14px] leading-relaxed text-ink-soft">
          Hace <span className="font-semibold">{ago}</span> que debía abrir el compartimento.
        </p>
      </div>

      <div className="px-6 pt-6">
        <div className="rounded-[20px] border border-terracotta-light bg-bone-soft p-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium uppercase tracking-[0.1em] text-shadow">
              Última actividad
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-mist-soft px-2 py-0.5 text-[11px] text-shadow">
              hace 2 h
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-lighter">
              <IconCheck className="h-5 w-5 text-sage-dark" strokeWidth={2.2} />
            </div>
            <div className="flex-1">
              <p className="font-display text-[15px] font-semibold text-ink">
                Tomó la medicación del martes de las 21:00
              </p>
              <p className="mt-0.5 text-[13px] text-shadow">Ayer a las 21:08 · En ventana</p>
            </div>
          </div>
          <div className="mt-3 h-px bg-mist" />
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mist">
              <IconPill className="h-5 w-5 text-shadow" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-shadow">
                El pastillero está <span className="font-semibold text-ink">conectado</span>. El compartimento sigue cerrado.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <div className="px-6 pb-8">
        <button
          type="button"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-sage-dark text-[15px] font-semibold text-bone-soft shadow-soft"
        >
          <IconPhone className="h-5 w-5" strokeWidth={2} />
          Llamar a mamá
        </button>
        <AppLink
          href={`/motivo?event=${omitido.id}`}
          className="mt-2.5 flex h-14 w-full items-center justify-center rounded-full border border-ink/80 text-[15px] font-semibold text-ink"
        >
          Registrar motivo
        </AppLink>
        <p className="mt-4 text-center text-[12px] leading-relaxed text-shadow">
          Lucía y Andrés también recibieron este aviso.<br />
          Podés coordinarlo con ellos.
        </p>
      </div>
    </div>
  );
}
