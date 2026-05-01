"use client";

import AppLink from "@/components/AppLink";
import { Suspense, useState } from "react";
import { useAppRouter, useAppSearchParams } from "@/hooks/useAppRouter";
import { useSim } from "@/lib/sim/SimContext";
import type { MotivoKey } from "@/lib/sim/types";
import {
  IconArrowLeft,
  IconCheck,
  IconCheckCircle,
} from "@/components/Icons";

const opciones: Array<{ key: MotivoKey; title: string; hint: string }> = [
  {
    key: "ya-tomo",
    title: "Ya tomó, se olvidó de confirmar",
    hint: "Ocurre a veces. Lo marcamos como tomado.",
  },
  {
    key: "consultorio",
    title: "Está en el consultorio",
    hint: "Hoy no usa el pastillero",
  },
  {
    key: "viaje",
    title: "Se fue de viaje",
    hint: "Pausar avisos por unos días",
  },
  {
    key: "otro",
    title: "Otro motivo",
    hint: "Contanos qué pasó",
  },
];

export default function MotivoPage() {
  return (
    <Suspense fallback={<div className="h-full bg-bone" />}>
      <MotivoContent />
    </Suspense>
  );
}

function MotivoContent() {
  const { events, resolveMotivo } = useSim();
  const router = useAppRouter();
  const searchParams = useAppSearchParams();
  const [seleccion, setSeleccion] = useState<MotivoKey | null>(null);
  const [comentario, setComentario] = useState("");
  const [saving, setSaving] = useState(false);

  const explicitId = searchParams.get("event");
  // Priorizar el event ID del query; si no, tomar el primer omitido
  const eventId =
    explicitId ?? events.find((e) => e.state === "omitido")?.id ?? "desayuno";
  const event = events.find((e) => e.id === eventId);
  const horario = event?.scheduledAt ?? "9:00";

  const handleSave = async () => {
    if (!seleccion || !event) return;
    setSaving(true);
    // Pequeño delay para que se vea la transición
    await new Promise((r) => setTimeout(r, 250));
    resolveMotivo(event.id, seleccion, comentario || undefined);
    router.push("/dashboard");
  };

  return (
    <div className="relative flex h-full flex-col bg-bone">
      <div className="flex items-center justify-between px-5 pt-3">
        <AppLink
          href="/alerta"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-bone-soft border border-mist"
          aria-label="Volver"
        >
          <IconArrowLeft className="h-5 w-5 text-ink" />
        </AppLink>
        <span className="font-display text-[15px] font-semibold text-ink">Registrar motivo</span>
        <div className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-4">
        <h1 className="font-display text-[26px] font-medium leading-tight text-ink">
          ¿Qué pasó con<br />la toma de las {horario.replace(":00", "")}?
        </h1>
        <p className="mt-2 text-[14px] text-ink-soft">
          Esto nos ayuda a entender el contexto y avisarle al resto del círculo.
        </p>

        <div className="mt-5 flex flex-col gap-2">
          {opciones.map((o) => (
            <MotivoOption
              key={o.key}
              active={seleccion === o.key}
              onClick={() => setSeleccion(o.key)}
              title={o.title}
              hint={o.hint}
            />
          ))}
        </div>

        {seleccion === "otro" ? (
          <div className="mt-4">
            <label className="mb-2 block font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-shadow">
              Contanos más
            </label>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Ej: cambió el horario de la consulta médica"
              rows={3}
              className="w-full resize-none rounded-[16px] border border-mist bg-bone-soft px-4 py-3 font-body text-[14px] text-ink placeholder:text-shadow/60 focus:border-sage focus:outline-none"
            />
          </div>
        ) : null}

        <div className="mt-6 flex items-center gap-3 rounded-[16px] bg-sage-lighter/50 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage">
            <IconCheckCircle className="h-4 w-4 text-bone-soft" strokeWidth={2.4} />
          </div>
          <p className="flex-1 text-[12px] leading-relaxed text-sage-dark">
            Lucía y Andrés verán el motivo y no recibirán un segundo aviso.
          </p>
        </div>
      </div>

      <div className="px-6 pb-8 pt-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={!seleccion || saving}
          className={`flex h-14 w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold shadow-soft transition ${
            seleccion && !saving
              ? "bg-sage-dark text-bone-soft"
              : "bg-mist text-shadow cursor-not-allowed"
          }`}
        >
          <IconCheck className="h-5 w-5" strokeWidth={2.2} />
          {saving ? "Guardando…" : "Guardar y cerrar alerta"}
        </button>
      </div>
    </div>
  );
}

function MotivoOption({
  active,
  onClick,
  title,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-[18px] border px-4 py-3.5 text-left transition ${
        active ? "border-sage bg-sage-lighter/50" : "border-mist bg-bone-soft"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
          active ? "border-sage-dark" : "border-mist"
        }`}
      >
        {active ? <span className="h-2.5 w-2.5 rounded-full bg-sage-dark" /> : null}
      </span>
      <div className="flex-1">
        <p className="font-display text-[14px] font-semibold text-ink">{title}</p>
        <p className="text-[12px] text-shadow">{hint}</p>
      </div>
    </button>
  );
}
