"use client";

import AppLink from "@/components/AppLink";
import { Avatar } from "@/components/Avatar";
import { TabBar } from "@/components/TabBar";
import { EventPhoto } from "@/components/EventPhoto";
import {
  IconBell,
  IconCheck,
  IconClock,
  IconPill,
  IconChevronRight,
  IconLock,
} from "@/components/Icons";
import { useSim } from "@/lib/sim/SimContext";
import { useClock, formatLongDate, formatTime } from "@/hooks/useClock";
import type { TomaEvent, EventState } from "@/lib/sim/types";

export default function DashboardPage() {
  const { events, demoMode } = useSim();
  const now = useClock(1000);

  const omitido = events.find((e) => e.state === "omitido");
  const tomado = events.filter((e) => e.state === "tomado" || e.state === "resuelto").length;
  const total = events.length;
  const next = events.find((e) => e.state === "proximo");

  const headline = omitido
    ? "Mamá necesita atención."
    : "Todo bien con mamá\nhoy.";

  return (
    <div className="relative flex h-full flex-col bg-bone">
      {/* Header */}
      <div className="px-6 pt-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-[17px] font-semibold tracking-wordmark text-ink">
            ReMedy<span className="text-sage">.</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="font-display text-[13px] font-medium tabular-nums text-shadow">
              {formatTime(now)}
            </span>
            <AppLink
              href="/ajustes"
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-mist-soft"
              aria-label="Notificaciones"
            >
              <IconBell className="h-[18px] w-[18px] text-ink" />
              {omitido ? (
                <span className="absolute right-1 top-1 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-breathe rounded-full bg-terracotta" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-terracotta" />
                </span>
              ) : null}
            </AppLink>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="px-6 pt-6">
        <p className="text-sm text-shadow">{formatLongDate(now) || "Cargando…"}</p>
        <h1 className="mt-1 whitespace-pre-line font-display text-[30px] font-medium leading-tight tracking-tight text-ink">
          {headline}
        </h1>

        {omitido ? (
          <AppLink
            href="/alerta"
            className="mt-4 flex items-center gap-3 rounded-[24px] border border-terracotta-light bg-terracotta-lighter/60 p-3 pr-4"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-terracotta">
              <IconClock className="h-5 w-5 text-bone-soft" strokeWidth={2} />
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-breathe rounded-full bg-terracotta ring-2 ring-terracotta-lighter" />
            </div>
            <div className="flex-1">
              <p className="font-display text-[14px] font-semibold text-ink">
                No tomó la toma de las {omitido.scheduledAt}
              </p>
              <p className="text-[12px] text-terracotta">Tocá para ver y llamar →</p>
            </div>
          </AppLink>
        ) : (
          <div className="mt-5 flex items-center gap-3 rounded-[24px] bg-sage-lighter/70 p-3 pr-4">
            <Avatar name="Silvia" size="md" />
            <div className="flex-1">
              <p className="font-display text-[15px] font-semibold text-ink">Silvia Pereira</p>
              <p className="text-[13px] text-sage-dark">
                Última actividad {tomado > 0 ? "hace 3h" : "hoy"} · Casa
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bone-soft">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-breathe rounded-full bg-sage opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage-dark" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Próxima toma */}
      {next && !omitido ? (
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between">
            <span className="font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-shadow">
              Próxima toma
            </span>
            <span className="text-[13px] font-medium text-shadow">{next.scheduledAt}</span>
          </div>
          <div className="mt-2 flex items-center gap-3 rounded-[24px] border border-mist bg-bone-soft p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-champagne-light">
              <IconPill className="h-5 w-5 text-champagne" />
            </div>
            <div className="flex-1">
              <p className="font-display text-[15px] font-semibold text-ink">{next.label}</p>
              <p className="text-[13px] text-shadow">{next.compartment}</p>
            </div>
            <IconClock className="h-5 w-5 text-shadow" />
          </div>
        </div>
      ) : null}

      {/* Timeline del día */}
      <div className="mt-6 flex-1 px-6">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-shadow">
            Tomas de hoy
          </span>
          <span className="text-[13px] font-medium text-sage-dark">
            {tomado} de {total} hecha{tomado !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {events.map((event, idx) => (
            <EventRow key={event.id} event={event} delay={idx * 60} />
          ))}
        </div>
      </div>

      {/* Pie con microcopy cálido */}
      <div className="px-6 pb-28 pt-5">
        <div className="flex items-center justify-center gap-2 text-[12px] text-shadow">
          <IconLock className="h-3 w-3 text-champagne" />
          <span>Las fotos viven solo en tu celular</span>
        </div>
      </div>

      <TabBar active="home" />
    </div>
  );
}

function EventRow({ event, delay }: { event: TomaEvent; delay: number }) {
  const isConfirmed = event.state === "tomado" || event.state === "resuelto";
  const href = isConfirmed ? "/evento" : event.state === "omitido" ? "/alerta" : undefined;

  const body = (
    <div
      className="flex items-center gap-3 rounded-[24px] border border-mist bg-bone-soft p-3 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <EventVisual event={event} />
      <div className="flex-1 pl-1">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[16px] font-semibold tabular-nums text-ink">
            {event.scheduledAt}
          </span>
          <span className="text-[15px] text-ink">· {event.label}</span>
        </div>
        <p className="mt-0.5 text-[13px] text-shadow">
          {event.state === "resuelto" && event.motivo
            ? motivoLabel(event.motivo)
            : event.compartment}
        </p>
      </div>
      <RightBadge event={event} />
    </div>
  );

  return href ? <AppLink href={href}>{body}</AppLink> : body;
}

function RightBadge({ event }: { event: TomaEvent }) {
  if (event.state === "tomado") {
    return (
      <div className="flex flex-col items-end gap-1 pr-1">
        <span className="inline-flex items-center gap-1 rounded-full bg-sage-lighter px-2.5 py-1 text-[12px] font-medium text-sage-dark">
          <IconCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
          {event.confirmedAt}
        </span>
        <IconChevronRight className="h-4 w-4 text-shadow" />
      </div>
    );
  }
  if (event.state === "resuelto") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-sage-lighter/60 px-2.5 py-1 text-[12px] font-medium text-sage-dark">
        Resuelto
      </span>
    );
  }
  if (event.state === "omitido") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-terracotta px-2.5 py-1 text-[12px] font-semibold text-bone-soft">
        Omitida
      </span>
    );
  }
  if (event.state === "proximo") {
    return (
      <span className="rounded-full bg-champagne-light/70 px-2.5 py-1 text-[12px] font-medium text-champagne">
        Próxima
      </span>
    );
  }
  return (
    <span className="rounded-full bg-mist px-2.5 py-1 text-[12px] font-medium text-shadow">
      Pendiente
    </span>
  );
}

function EventVisual({ event }: { event: TomaEvent }) {
  const isConfirmed = event.state === "tomado" || event.state === "resuelto";
  if (isConfirmed) {
    return (
      <div className="relative">
        <EventPhoto moment={event.moment} size="xs" />
        <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-sage ring-2 ring-bone-soft">
          <svg className="h-3 w-3 text-bone-soft" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </div>
        <div className="absolute -left-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink/85">
          <IconLock className="h-2.5 w-2.5 text-bone-soft" strokeWidth={2.4} />
        </div>
      </div>
    );
  }
  return <StateDot state={event.state} />;
}

function StateDot({ state }: { state: EventState }) {
  if (state === "omitido") {
    return (
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/90">
        <IconClock className="h-5 w-5 text-bone-soft" strokeWidth={2} />
        <span className="absolute inset-0 rounded-full bg-terracotta/40 animate-breathe" />
      </div>
    );
  }
  if (state === "proximo") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-champagne/60 bg-champagne-light/40">
        <div className="h-2.5 w-2.5 rounded-full bg-champagne" />
      </div>
    );
  }
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-mist">
      <div className="h-2 w-2 rounded-full bg-mist" />
    </div>
  );
}

function motivoLabel(motivo: string) {
  switch (motivo) {
    case "ya-tomo":
      return "Marcada como tomada · ya tomó";
    case "consultorio":
      return "Resuelto · está en el consultorio";
    case "viaje":
      return "Resuelto · se fue de viaje";
    default:
      return "Resuelto por la familia";
  }
}
