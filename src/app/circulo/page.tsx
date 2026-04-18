"use client";

import Link from "next/link";
import { TabBar } from "@/components/TabBar";
import { Avatar } from "@/components/Avatar";
import {
  IconArrowLeft,
  IconPlus,
  IconChevronRight,
  IconCheck,
  IconTrash,
} from "@/components/Icons";
import { useSim } from "@/lib/sim/SimContext";
import type { Miembro } from "@/lib/sim/types";

function formatSent(at: number): string {
  const minutes = Math.floor((Date.now() - at) / 60000);
  if (minutes < 1) return "Enviada recién";
  if (minutes < 60) return `Enviada hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Enviada hace ${hours} h`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Enviada ayer" : `Enviada hace ${days} d`;
}

export default function CirculoPage() {
  const { miembros, pendientes, removePendiente } = useSim();
  return (
    <div className="relative flex h-full flex-col bg-bone">
      <div className="flex items-center justify-between px-5 pt-3">
        <Link
          href="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-bone-soft border border-mist"
          aria-label="Volver"
        >
          <IconArrowLeft className="h-5 w-5 text-ink" />
        </Link>
        <span className="font-display text-[15px] font-semibold text-ink">Círculo</span>
        <div className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-28">
        {/* Hero */}
        <div>
          <h1 className="font-display text-[26px] font-medium leading-tight text-ink">
            Cerca de mamá,<br />juntos.
          </h1>
          <p className="mt-2 text-[14px] text-ink-soft">
            Todos ven lo mismo al mismo tiempo. Los avisos llegan al celular de cada uno.
          </p>
        </div>

        {/* Silvia — propietaria del pastillero */}
        <div className="mt-5 rounded-[20px] bg-sage-lighter/60 p-4">
          <div className="flex items-center gap-3">
            <Avatar name="Silvia" size="md" />
            <div className="flex-1">
              <p className="font-display text-[15px] font-semibold text-ink">Silvia Pereira</p>
              <p className="text-[12px] text-sage-dark">72 años · Pastillero activo</p>
            </div>
            <span className="rounded-full bg-sage px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-bone-soft">
              Pastillero
            </span>
          </div>
        </div>

        {/* Miembros */}
        <h2 className="mt-6 mb-2 px-1 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-shadow">
          Familiares ({miembros.length})
        </h2>
        <div className="flex flex-col overflow-hidden rounded-[20px] border border-mist bg-bone-soft">
          {miembros.map((m) => (
            <MiembroRow key={m.id} miembro={m} />
          ))}
        </div>

        {/* Invitación pendiente */}
        {pendientes.length > 0 ? (
          <>
            <h2 className="mt-6 mb-2 px-1 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-shadow">
              Invitaciones pendientes
            </h2>
            <div className="flex flex-col overflow-hidden rounded-[20px] border border-mist bg-bone-soft">
              {pendientes.map((p) => (
                <div key={p.id} className="flex items-center gap-3 border-b border-mist px-4 py-3 last:border-b-0">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mist text-shadow font-display font-semibold">
                    {p.nombre.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-display text-[14px] font-semibold text-ink">{p.nombre}</p>
                    <p className="truncate text-[12px] text-shadow">
                      {formatSent(p.enviadaAt)} · {p.contacto}
                    </p>
                  </div>
                  <span className="rounded-full border border-champagne/60 bg-champagne-light/40 px-2 py-0.5 text-[11px] font-medium text-champagne">
                    Pendiente
                  </span>
                  <button
                    type="button"
                    onClick={() => removePendiente(p.id)}
                    aria-label="Cancelar invitación"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-shadow hover:bg-mist"
                  >
                    <IconTrash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {/* Invitar */}
        <Link
          href="/invitar"
          className="mt-5 flex items-center gap-3 rounded-[20px] border border-dashed border-sage/60 bg-sage-lighter/30 px-4 py-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage">
            <IconPlus className="h-5 w-5 text-bone-soft" strokeWidth={2.2} />
          </div>
          <div className="flex-1">
            <p className="font-display text-[14px] font-semibold text-ink">Invitar familiar</p>
            <p className="text-[12px] text-shadow">Por email o WhatsApp</p>
          </div>
          <IconChevronRight className="h-4 w-4 text-shadow" />
        </Link>

        <p className="mt-6 text-center text-[12px] leading-relaxed text-shadow">
          Los administradores pueden editar horarios y privacidad.<br />
          Los miembros solo reciben avisos.
        </p>
      </div>

      <TabBar active="circulo" />
    </div>
  );
}

function MiembroRow({ miembro }: { miembro: Miembro }) {
  const { nombre, relacion, rol, you, ultimoVisto, colorClass } = miembro;
  const initial = nombre.charAt(0);

  return (
    <div className="flex items-center gap-3 border-b border-mist px-4 py-3.5 last:border-b-0">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full font-display text-[16px] font-semibold ${colorClass}`}
      >
        {initial}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-display text-[14px] font-semibold text-ink">{nombre}</p>
          {you ? (
            <span className="rounded-full bg-ink px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-bone-soft">
              Vos
            </span>
          ) : null}
        </div>
        <p className="text-[12px] text-shadow">
          {relacion} · {ultimoVisto}
        </p>
      </div>
      <RolBadge rol={rol} />
    </div>
  );
}

function RolBadge({ rol }: { rol: "Admin" | "Miembro" }) {
  if (rol === "Admin") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-champagne-light/70 px-2 py-0.5 text-[11px] font-semibold text-champagne">
        <IconCheck className="h-3 w-3" strokeWidth={2.4} />
        Admin
      </span>
    );
  }
  return (
    <span className="rounded-full bg-mist-soft px-2 py-0.5 text-[11px] font-medium text-shadow">
      Miembro
    </span>
  );
}
