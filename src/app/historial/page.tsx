import Link from "next/link";
import { TabBar } from "@/components/TabBar";
import { EventPhoto } from "@/components/EventPhoto";
import {
  IconArrowLeft,
  IconArrowRight,
  IconDownload,
  IconLock,
} from "@/components/Icons";

type DayState = "perfect" | "partial" | "missed" | "future" | "empty";

// 30 días simulados, con patrón creíble
const days: DayState[] = [
  // semana 1
  "empty", "empty", "perfect", "perfect", "partial", "perfect", "perfect",
  // semana 2
  "perfect", "perfect", "perfect", "missed", "perfect", "perfect", "perfect",
  // semana 3
  "perfect", "partial", "perfect", "perfect", "perfect", "perfect", "perfect",
  // semana 4
  "perfect", "perfect", "perfect", "partial", "perfect", "perfect", "perfect",
  // último
  "perfect", "perfect", "empty",
];

const today = 15;

export default function HistorialPage() {
  return (
    <div className="relative flex h-full flex-col bg-bone">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-3">
        <Link
          href="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-bone-soft border border-mist"
          aria-label="Volver"
        >
          <IconArrowLeft className="h-5 w-5 text-ink" />
        </Link>
        <span className="font-display text-[15px] font-semibold text-ink">Historial</span>
        <div className="h-10 w-10" />
      </div>

      {/* Resumen del mes */}
      <div className="px-6 pt-4">
        <h1 className="font-display text-[26px] font-medium leading-tight text-ink">
          Abril, todo en orden.
        </h1>
        <div className="mt-4 flex items-center gap-2">
          <StatChip value="94%" label="Adherencia" tone="sage" />
          <StatChip value="26" label="Tomadas en ventana" tone="neutral" />
        </div>
      </div>

      {/* Navegador de mes */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-mist-soft">
            <IconArrowLeft className="h-4 w-4 text-ink" />
          </button>
          <span className="font-display text-[17px] font-semibold text-ink">Abril 2026</span>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-mist-soft opacity-40">
            <IconArrowRight className="h-4 w-4 text-ink" />
          </button>
        </div>

        {/* Días de la semana */}
        <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
          {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
            <span key={i} className="text-[11px] font-medium uppercase text-shadow">
              {d}
            </span>
          ))}
        </div>

        {/* Grilla */}
        <div className="mt-2 grid grid-cols-7 gap-1.5">
          {days.map((state, idx) => {
            const dayNum = idx - 1; // desfasaje para que arranque martes 1
            const isToday = dayNum === today;
            return <DayCell key={idx} day={dayNum > 0 ? dayNum : null} state={state} isToday={isToday} />;
          })}
        </div>

        {/* Leyenda */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-shadow">
          <LegendDot color="bg-sage" label="Completo" />
          <LegendDot color="bg-champagne" label="Parcial" />
          <LegendDot color="bg-terracotta" label="Omisión" />
          <LegendDot color="bg-mist" label="Sin datos" />
        </div>
      </div>

      {/* Día de hoy preview con fotos */}
      <div className="px-6 pt-6">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-shadow">
            Últimas tomas
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-shadow">
            <IconLock className="h-3 w-3" strokeWidth={2} />
            47 fotos locales
          </span>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <HistorialPhotoRow
            moment="desayuno"
            title="Hoy · 09:03"
            hint="Desayuno · Tomado en ventana"
            href="/evento"
          />
          <HistorialPhotoRow
            moment="cena"
            title="Ayer · 21:08"
            hint="Cena · Tomado en ventana"
          />
          <HistorialPhotoRow
            moment="mediodia"
            title="Ayer · 14:12"
            hint="Mediodía · Tomado en ventana"
          />
        </div>
      </div>

      <div className="flex-1" />

      {/* Exportar */}
      <div className="px-6 pb-28">
        <button className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-ink/80 text-[14px] font-semibold text-ink">
          <IconDownload className="h-4 w-4" strokeWidth={2} />
          Exportar reporte para el médico (PDF)
        </button>
      </div>

      <TabBar active="historial" />
    </div>
  );
}

function DayCell({
  day,
  state,
  isToday,
}: {
  day: number | null;
  state: DayState;
  isToday: boolean;
}) {
  if (day === null) {
    return <div className="aspect-square" />;
  }

  const bg =
    state === "perfect"
      ? "bg-sage text-bone-soft"
      : state === "partial"
        ? "bg-champagne text-bone-soft"
        : state === "missed"
          ? "bg-terracotta text-bone-soft"
          : state === "future"
            ? "bg-transparent text-shadow"
            : "bg-mist-soft text-shadow";

  return (
    <div
      className={`relative flex aspect-square items-center justify-center rounded-[12px] text-[13px] font-display font-semibold ${bg} ${
        isToday ? "ring-2 ring-ink ring-offset-2 ring-offset-bone" : ""
      }`}
    >
      {day}
      {isToday ? (
        <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ink" />
      ) : null}
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function HistorialPhotoRow({
  moment,
  title,
  hint,
  href,
}: {
  moment: "desayuno" | "mediodia" | "cena";
  title: string;
  hint: string;
  href?: string;
}) {
  const body = (
    <div className="flex items-center gap-3 rounded-[20px] border border-mist bg-bone-soft p-2.5">
      <div className="relative">
        <EventPhoto moment={moment} size="sm" />
        <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-sage ring-2 ring-bone-soft">
          <svg className="h-3 w-3 text-bone-soft" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </div>
        <div className="absolute -left-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink/85">
          <IconLock className="h-2.5 w-2.5 text-bone-soft" strokeWidth={2.4} />
        </div>
      </div>
      <div className="flex-1 pl-1">
        <p className="font-display text-[14px] font-semibold text-ink">{title}</p>
        <p className="text-[12px] text-shadow">{hint}</p>
      </div>
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}

function StatChip({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone: "sage" | "neutral";
}) {
  const bg = tone === "sage" ? "bg-sage-lighter text-sage-dark" : "bg-mist-soft text-ink";
  return (
    <div className={`flex-1 rounded-[20px] ${bg} px-4 py-3`}>
      <p className="font-display text-[22px] font-semibold leading-none">{value}</p>
      <p className="mt-1 text-[12px] leading-tight opacity-80">{label}</p>
    </div>
  );
}
