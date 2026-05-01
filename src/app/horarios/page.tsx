"use client";

import AppLink from "@/components/AppLink";
import {
  IconArrowLeft,
  IconPlus,
  IconPill,
  IconChevronRight,
  IconSun,
  IconMoon,
  IconClock,
} from "@/components/Icons";
import { useSim } from "@/lib/sim/SimContext";
import type { Horario as HorarioType, Moment } from "@/lib/sim/types";

type DisplayHorario = HorarioType & {
  Icon: typeof IconSun;
  tone: "champagne" | "sage" | "shadow";
};

const momentMeta: Record<Moment, { Icon: typeof IconSun; tone: "champagne" | "sage" | "shadow" }> = {
  desayuno: { Icon: IconSun, tone: "champagne" },
  mediodia: { Icon: IconPill, tone: "sage" },
  cena: { Icon: IconMoon, tone: "shadow" },
};

export default function HorariosPage() {
  const { horarios, updateHorario } = useSim();
  const firstId = horarios[0]?.id;
  const selectedTolerancia = horarios.find((h) => h.id === firstId)?.ventanaMinutos ?? 30;

  const displayList: DisplayHorario[] = horarios.map((h) => ({
    ...h,
    ...momentMeta[h.moment],
  }));

  const setToleranciaAll = (min: 15 | 30 | 45 | 60) => {
    horarios.forEach((h) => updateHorario(h.id, { ventanaMinutos: min }));
  };

  return (
    <div className="relative flex h-full flex-col bg-bone">
      <div className="flex items-center justify-between px-5 pt-3">
        <AppLink
          href="/ajustes"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-bone-soft border border-mist"
          aria-label="Volver"
        >
          <IconArrowLeft className="h-5 w-5 text-ink" />
        </AppLink>
        <span className="font-display text-[15px] font-semibold text-ink">Horarios</span>
        <div className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-8">
        <h1 className="font-display text-[26px] font-medium leading-tight text-ink">
          La rutina de Silvia.
        </h1>
        <p className="mt-2 text-[14px] text-ink-soft">
          Tres tomas al día. Si cambia algo con el médico, ajustalo acá.
        </p>

        {/* Lista de horarios */}
        <div className="mt-5 flex flex-col gap-3">
          {displayList.map((h, idx) => (
            <HorarioCard key={h.id} horario={h} delay={idx * 60} />
          ))}
        </div>

        {/* Agregar */}
        <button
          type="button"
          className="mt-3 flex w-full items-center gap-3 rounded-[20px] border border-dashed border-mist bg-transparent px-4 py-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-lighter/60">
            <IconPlus className="h-5 w-5 text-sage-dark" strokeWidth={2} />
          </div>
          <div className="flex-1 text-left">
            <p className="font-display text-[14px] font-semibold text-ink">Agregar un horario</p>
            <p className="text-[12px] text-shadow">Para una medicación extra</p>
          </div>
        </button>

        {/* Ventana de tolerancia global */}
        <div className="mt-6 rounded-[20px] border border-mist bg-bone-soft p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-champagne-light">
              <IconClock className="h-[18px] w-[18px] text-champagne" />
            </div>
            <div className="flex-1">
              <p className="font-display text-[14px] font-semibold text-ink">
                Ventana de tolerancia
              </p>
              <p className="text-[12px] text-shadow">
                Tiempo antes de marcar omisión
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-1.5">
            {([15, 30, 45, 60] as const).map((m) => {
              const active = selectedTolerancia === m;
              const label = m === 60 ? "1 h" : `${m} min`;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setToleranciaAll(m)}
                  className={`flex-1 rounded-full py-2 text-center text-[12px] font-medium transition ${
                    active
                      ? "bg-sage text-bone-soft"
                      : "border border-mist text-ink hover:bg-mist-soft"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Info privacidad */}
        <p className="mt-6 text-center text-[12px] leading-relaxed text-shadow">
          Los cambios de horario se sincronizan con el pastillero<br />en los próximos minutos.
        </p>
      </div>
    </div>
  );
}

function HorarioCard({ horario, delay }: { horario: DisplayHorario; delay: number }) {
  const { nombre, hora, ventanaMinutos, compartimento, Icon, tone } = horario;
  const iconBg =
    tone === "champagne"
      ? "bg-champagne-light text-champagne"
      : tone === "sage"
        ? "bg-sage-lighter text-sage-dark"
        : "bg-mist-soft text-shadow";

  return (
    <button
      type="button"
      className="flex items-center gap-4 rounded-[20px] border border-mist bg-bone-soft p-4 text-left animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`flex h-11 w-11 items-center justify-center rounded-full ${iconBg}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[18px] font-semibold tabular-nums text-ink">
            {hora}
          </span>
          <span className="text-[14px] text-ink">· {nombre}</span>
        </div>
        <p className="mt-0.5 text-[12px] text-shadow">
          {compartimento} · ±{ventanaMinutos} min
        </p>
      </div>
      <IconChevronRight className="h-4 w-4 text-shadow" />
    </button>
  );
}
