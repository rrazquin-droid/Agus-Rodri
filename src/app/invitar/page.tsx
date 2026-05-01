"use client";

import AppLink from "@/components/AppLink";
import { useState } from "react";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useSim } from "@/lib/sim/SimContext";
import {
  IconArrowLeft,
  IconMail,
  IconWhatsapp,
  IconCheck,
} from "@/components/Icons";

type Metodo = "whatsapp" | "email";
type Rol = "admin" | "miembro";

export default function InvitarPage() {
  const { addPendiente } = useSim();
  const router = useAppRouter();
  const [metodo, setMetodo] = useState<Metodo>("whatsapp");
  const [rol, setRol] = useState<Rol>("miembro");
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [sending, setSending] = useState(false);

  const canSend = nombre.trim().length > 1 && contacto.trim().length > 3;

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 300));
    addPendiente({
      nombre: nombre.trim(),
      contacto: contacto.trim(),
      metodo,
      rol: rol === "admin" ? "Admin" : "Miembro",
    });
    router.push("/circulo");
  };

  return (
    <div className="relative flex h-full flex-col bg-bone">
      <div className="flex items-center justify-between px-5 pt-3">
        <AppLink
          href="/circulo"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-bone-soft border border-mist"
          aria-label="Volver"
        >
          <IconArrowLeft className="h-5 w-5 text-ink" />
        </AppLink>
        <span className="font-display text-[15px] font-semibold text-ink">Invitar</span>
        <div className="h-10 w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-4">
        <h1 className="font-display text-[26px] font-medium leading-tight text-ink">
          Sumá a alguien<br />al círculo.
        </h1>
        <p className="mt-2 text-[14px] text-ink-soft">
          Le va a llegar una invitación. Al aceptarla, descarga la app y ya empieza a ver las tomas de Silvia.
        </p>

        {/* Método */}
        <div className="mt-6">
          <label className="mb-2 block font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-shadow">
            Cómo la enviamos
          </label>
          <div className="grid grid-cols-2 gap-2">
            <MetodoOption
              active={metodo === "whatsapp"}
              onClick={() => setMetodo("whatsapp")}
              icon={<IconWhatsapp className="h-5 w-5" />}
              label="WhatsApp"
            />
            <MetodoOption
              active={metodo === "email"}
              onClick={() => setMetodo("email")}
              icon={<IconMail className="h-5 w-5" />}
              label="Email"
            />
          </div>
        </div>

        {/* Nombre */}
        <div className="mt-5">
          <label className="mb-2 block font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-shadow">
            Nombre
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Lucía Razquin"
            className="h-12 w-full rounded-[16px] border border-mist bg-bone-soft px-4 font-body text-[15px] text-ink placeholder:text-shadow/60 focus:border-sage focus:outline-none"
          />
        </div>

        {/* Contacto */}
        <div className="mt-4">
          <label className="mb-2 block font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-shadow">
            {metodo === "whatsapp" ? "Número con código de país" : "Email"}
          </label>
          <input
            type={metodo === "whatsapp" ? "tel" : "email"}
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            placeholder={metodo === "whatsapp" ? "+598 99 123 456" : "lucia@mail.com"}
            className="h-12 w-full rounded-[16px] border border-mist bg-bone-soft px-4 font-body text-[15px] text-ink placeholder:text-shadow/60 focus:border-sage focus:outline-none"
          />
        </div>

        {/* Rol */}
        <div className="mt-6">
          <label className="mb-2 block font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-shadow">
            Qué rol tendrá
          </label>
          <div className="flex flex-col gap-2">
            <RolOption
              active={rol === "miembro"}
              onClick={() => setRol("miembro")}
              label="Miembro"
              hint="Recibe avisos y ve el historial"
            />
            <RolOption
              active={rol === "admin"}
              onClick={() => setRol("admin")}
              label="Administrador"
              hint="Además, puede editar horarios y privacidad"
            />
          </div>
        </div>

        {/* Preview mensaje */}
        <div className="mt-6 rounded-[20px] border border-mist bg-mist-soft p-4">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-shadow">
            Vista previa del mensaje
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
            Hola {nombre || "Lucía"}, Rodrigo te invita al círculo de ReMedy para acompañar a Silvia. Descargá la app acá: <span className="text-sage-dark underline">remedy.app/i/A3F9</span>
          </p>
        </div>
      </div>

      <div className="px-6 pb-8 pt-4">
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend || sending}
          className={`flex h-14 w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold shadow-soft transition ${
            canSend && !sending
              ? "bg-sage-dark text-bone-soft"
              : "bg-mist text-shadow cursor-not-allowed"
          }`}
        >
          <IconCheck className="h-5 w-5" strokeWidth={2.2} />
          {sending ? "Enviando…" : "Enviar invitación"}
        </button>
      </div>
    </div>
  );
}

function MetodoOption({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1.5 rounded-[18px] border px-4 py-4 transition ${
        active
          ? "border-sage bg-sage-lighter/70 text-sage-dark"
          : "border-mist bg-bone-soft text-shadow"
      }`}
    >
      {icon}
      <span className="font-display text-[14px] font-semibold">{label}</span>
    </button>
  );
}

function RolOption({
  active,
  onClick,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-[18px] border px-4 py-3 text-left transition ${
        active ? "border-sage bg-sage-lighter/60" : "border-mist bg-bone-soft"
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
        <p className="font-display text-[14px] font-semibold text-ink">{label}</p>
        <p className="text-[12px] text-shadow">{hint}</p>
      </div>
    </button>
  );
}
