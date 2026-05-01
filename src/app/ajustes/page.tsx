"use client";

import AppLink from "@/components/AppLink";
import { TabBar } from "@/components/TabBar";
import { Avatar } from "@/components/Avatar";
import {
  IconArrowLeft,
  IconClock,
  IconUsers,
  IconShield,
  IconBell,
  IconHelp,
  IconLogOut,
  IconChevronRight,
  IconUser,
} from "@/components/Icons";
import { useSim } from "@/lib/sim/SimContext";

export default function AjustesPage() {
  const { miembros, pendientes, horarios, privacidad } = useSim();
  const otros = miembros.filter((m) => !m.you);
  const otrosText =
    otros.length === 0
      ? "Solo vos"
      : otros.length === 1
        ? `Vos y ${otros[0].nombre.split(" ")[0]}`
        : `Vos, ${otros[0].nombre.split(" ")[0]} y ${otros.length - 1} más`;
  const horariosText = `${horarios.length} tomas configuradas · ${horarios.map((h) => h.nombre.toLowerCase()).join(", ")}`;
  const borradoLabel =
    privacidad.autoBorrado === "nunca"
      ? "Auto-borrado desactivado"
      : `Auto-borrado a los ${privacidad.autoBorrado} días`;
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
        <span className="font-display text-[15px] font-semibold text-ink">Ajustes</span>
        <div className="h-10 w-10" />
      </div>

      {/* Perfil destacado */}
      <div className="px-6 pt-5">
        <AppLink
          href="/circulo"
          className="flex items-center gap-3 rounded-[24px] bg-sage-lighter/70 p-4"
        >
          <Avatar name="Silvia" size="lg" />
          <div className="flex-1">
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-sage-dark">
              Pastillero de
            </p>
            <p className="font-display text-[18px] font-semibold text-ink">Silvia Pereira</p>
            <p className="text-[12px] text-sage-dark">
              {miembros.length} familiares · {pendientes.length} pendiente{pendientes.length === 1 ? "" : "s"}
            </p>
          </div>
          <IconChevronRight className="h-5 w-5 text-sage-dark" />
        </AppLink>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-28">
        <Section title="Cuidado">
          <SettingRow
            href="/horarios"
            icon={<IconClock className="h-[18px] w-[18px] text-sage-dark" />}
            title="Horarios de toma"
            hint={horariosText}
          />
          <SettingRow
            href="/circulo"
            icon={<IconUsers className="h-[18px] w-[18px] text-sage-dark" />}
            title="Círculo familiar"
            hint={otrosText}
          />
        </Section>

        <Section title="Privacidad y datos">
          <SettingRow
            href="/privacidad"
            icon={<IconShield className="h-[18px] w-[18px] text-sage-dark" />}
            title="Privacidad"
            hint={borradoLabel}
            badge="Local"
          />
          <SettingRow
            href="/ajustes"
            icon={<IconBell className="h-[18px] w-[18px] text-sage-dark" />}
            title="Notificaciones"
            hint="Push activas · Modo nocturno 22:30 → 07:00"
          />
        </Section>

        <Section title="Cuenta">
          <SettingRow
            href="/ajustes"
            icon={<IconUser className="h-[18px] w-[18px] text-sage-dark" />}
            title="Tu perfil"
            hint="rodrigorazquin@gmail.com"
          />
          <SettingRow
            href="/ajustes"
            icon={<IconHelp className="h-[18px] w-[18px] text-sage-dark" />}
            title="Ayuda y soporte"
            hint="Preguntas frecuentes, contactanos"
          />
          <SettingRow
            href="/ajustes"
            icon={<IconLogOut className="h-[18px] w-[18px] text-terracotta" />}
            title="Cerrar sesión"
            tone="muted"
          />
        </Section>

        <p className="mt-6 text-center text-[11px] text-shadow">
          ReMedy · versión 0.1.0 (MVP)
        </p>
      </div>

      <TabBar active="ajustes" />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="mb-2 px-1 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-shadow">
        {title}
      </h2>
      <div className="flex flex-col overflow-hidden rounded-[20px] border border-mist bg-bone-soft">
        {children}
      </div>
    </div>
  );
}

function SettingRow({
  href,
  icon,
  title,
  hint,
  badge,
  tone,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  hint?: string;
  badge?: string;
  tone?: "muted";
}) {
  return (
    <AppLink
      href={href}
      className="flex items-center gap-3 border-b border-mist px-4 py-3.5 last:border-b-0"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-lighter/60">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`font-display text-[14px] font-semibold ${
            tone === "muted" ? "text-terracotta" : "text-ink"
          }`}
        >
          {title}
        </p>
        {hint ? <p className="truncate text-[12px] text-shadow">{hint}</p> : null}
      </div>
      {badge ? (
        <span className="rounded-full bg-sage-lighter px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sage-dark">
          {badge}
        </span>
      ) : null}
      <IconChevronRight className="h-4 w-4 text-shadow" />
    </AppLink>
  );
}
