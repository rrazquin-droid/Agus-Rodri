"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconLock,
  IconCamera,
  IconTrash,
  IconCheck,
  IconChevronRight,
} from "@/components/Icons";
import { EventPhoto } from "@/components/EventPhoto";
import { useSim } from "@/lib/sim/SimContext";
export default function PrivacidadPage() {
  const { privacidad, setPrivacidad } = useSim();
  const autoBorrado = privacidad.autoBorrado;
  const captura = privacidad.capturaFotos;

  return (
    <div className="relative flex h-full flex-col bg-bone">
      <div className="flex items-center justify-between px-5 pt-3">
        <Link
          href="/ajustes"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-bone-soft border border-mist"
          aria-label="Volver"
        >
          <IconArrowLeft className="h-5 w-5 text-ink" />
        </Link>
        <span className="font-display text-[15px] font-semibold text-ink">Privacidad</span>
        <div className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-8">
        {/* Hero con candado */}
        <div className="rounded-[24px] bg-sage-lighter/50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage">
              <IconLock className="h-6 w-6 text-bone-soft" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="font-display text-[18px] font-semibold leading-tight text-ink">
                Esto queda entre ustedes.
              </p>
              <p className="mt-0.5 text-[13px] text-sage-dark">
                Ninguna foto se sube a nuestros servidores.
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <StatBlock value="47" label="Fotos en tu celular" />
            <StatBlock value="0" label="En la nube" accent />
          </div>
        </div>

        {/* Galería de las últimas fotos — candado en cada una */}
        <div className="mt-6 flex items-baseline justify-between">
          <h2 className="font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-shadow">
            Últimas fotos capturadas
          </h2>
          <button className="inline-flex items-center gap-0.5 text-[12px] font-medium text-sage-dark">
            Ver las 47
            <IconChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          <GalleryThumb moment="desayuno" caption="Hoy 9:03" />
          <GalleryThumb moment="cena" caption="Ayer 21:08" />
          <GalleryThumb moment="mediodia" caption="Ayer 14:12" />
          <GalleryThumb moment="desayuno" caption="Ayer 9:01" />
          <GalleryThumb moment="cena" caption="Lun 21:15" />
          <GalleryThumb moment="mediodia" caption="Lun 14:00" />
          <GalleryThumb moment="desayuno" caption="Lun 9:05" />
          <GalleryThumb moment="cena" caption="Dom 21:03" />
        </div>
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-shadow">
          <IconLock className="h-3 w-3" strokeWidth={2} />
          <span>Cada foto vive en tu teléfono, cifrada</span>
        </div>

        {/* Qué ve quién */}
        <h2 className="mt-6 mb-2 px-1 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-shadow">
          Flujo de los datos
        </h2>
        <div className="space-y-2">
          <DataFlowRow
            title="Pastillero → Tu celular"
            hint="Cifrado punta a punta por WiFi"
            state="ok"
          />
          <DataFlowRow
            title="Tu celular ↔ Familiares"
            hint="Se sincroniza cuando cada uno abre la app"
            state="ok"
          />
          <DataFlowRow
            title="Nuestros servidores"
            hint="Solo metadatos: horarios, estados. Nunca fotos."
            state="info"
          />
        </div>

        {/* Captura visual */}
        <h2 className="mt-6 mb-2 px-1 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-shadow">
          Cámara
        </h2>
        <div className="flex items-center gap-3 rounded-[20px] border border-mist bg-bone-soft p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne-light">
            <IconCamera className="h-[18px] w-[18px] text-champagne" />
          </div>
          <div className="flex-1">
            <p className="font-display text-[14px] font-semibold text-ink">
              Capturar foto al abrir
            </p>
            <p className="text-[12px] text-shadow">
              Solo se dispara cuando se abre un compartimento
            </p>
          </div>
          <Toggle active={captura} onClick={() => setPrivacidad({ capturaFotos: !captura })} />
        </div>

        {/* Auto-borrado */}
        <h2 className="mt-6 mb-2 px-1 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-shadow">
          Auto-borrado de fotos
        </h2>
        <div className="flex flex-col gap-2">
          <BorradoOption
            active={autoBorrado === "7"}
            onClick={() => setPrivacidad({ autoBorrado: "7" })}
            label="A los 7 días"
            hint="Más privado, menos historia"
          />
          <BorradoOption
            active={autoBorrado === "30"}
            onClick={() => setPrivacidad({ autoBorrado: "30" })}
            label="A los 30 días"
            hint="Recomendado"
            recommended
          />
          <BorradoOption
            active={autoBorrado === "90"}
            onClick={() => setPrivacidad({ autoBorrado: "90" })}
            label="A los 90 días"
            hint="Más contexto para el médico"
          />
          <BorradoOption
            active={autoBorrado === "nunca"}
            onClick={() => setPrivacidad({ autoBorrado: "nunca" })}
            label="Nunca"
            hint="Las guardás hasta que las borres a mano"
          />
        </div>

        {/* Destructivo */}
        <button
          type="button"
          className="mt-6 flex w-full items-center gap-3 rounded-[18px] border border-terracotta/30 bg-terracotta-lighter/30 px-4 py-3.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta-lighter">
            <IconTrash className="h-[18px] w-[18px] text-terracotta" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-display text-[14px] font-semibold text-terracotta">
              Borrar todas las fotos ahora
            </p>
            <p className="text-[12px] text-shadow">Esta acción no se puede deshacer</p>
          </div>
        </button>

        <p className="mt-6 text-center text-[12px] leading-relaxed text-shadow">
          Al desinstalar medy, todas las fotos locales se borran<br />automáticamente del celular.
        </p>
      </div>
    </div>
  );
}

function GalleryThumb({
  moment,
  caption,
}: {
  moment: "desayuno" | "mediodia" | "cena";
  caption: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <div className="overflow-hidden rounded-[12px]">
          <div className="aspect-square w-full">
            <EventPhoto moment={moment} size="xs" className="!h-full !w-full !rounded-[12px]" />
          </div>
        </div>
        <div className="absolute -left-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink/85">
          <IconLock className="h-2.5 w-2.5 text-bone-soft" strokeWidth={2.4} />
        </div>
      </div>
      <span className="truncate text-center text-[10px] leading-tight text-shadow">{caption}</span>
    </div>
  );
}

function StatBlock({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex-1 rounded-[16px] px-3 py-2.5 ${
        accent ? "bg-champagne-light/50" : "bg-bone-soft"
      }`}
    >
      <p className={`font-display text-[22px] font-semibold leading-none ${accent ? "text-champagne" : "text-ink"}`}>
        {value}
      </p>
      <p className="mt-1 text-[11px] leading-tight text-shadow">{label}</p>
    </div>
  );
}

function DataFlowRow({
  title,
  hint,
  state,
}: {
  title: string;
  hint: string;
  state: "ok" | "info";
}) {
  return (
    <div className="flex items-center gap-3 rounded-[16px] border border-mist bg-bone-soft px-4 py-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          state === "ok" ? "bg-sage-lighter" : "bg-mist-soft"
        }`}
      >
        {state === "ok" ? (
          <IconCheck className="h-4 w-4 text-sage-dark" strokeWidth={2.4} />
        ) : (
          <IconLock className="h-[14px] w-[14px] text-shadow" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-display text-[13px] font-semibold text-ink">{title}</p>
        <p className="text-[11px] text-shadow">{hint}</p>
      </div>
    </div>
  );
}

function BorradoOption({
  active,
  onClick,
  label,
  hint,
  recommended,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hint: string;
  recommended?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-[16px] border px-4 py-3 text-left transition ${
        active ? "border-sage bg-sage-lighter/50" : "border-mist bg-bone-soft"
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          active ? "border-sage-dark" : "border-mist"
        }`}
      >
        {active ? <span className="h-2.5 w-2.5 rounded-full bg-sage-dark" /> : null}
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-display text-[14px] font-semibold text-ink">{label}</p>
          {recommended ? (
            <span className="rounded-full bg-champagne-light/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-champagne">
              Sugerido
            </span>
          ) : null}
        </div>
        <p className="text-[12px] text-shadow">{hint}</p>
      </div>
    </button>
  );
}

function Toggle({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
        active ? "bg-sage" : "bg-mist"
      }`}
      aria-pressed={active}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-bone-soft shadow-soft transition ${
          active ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  );
}
