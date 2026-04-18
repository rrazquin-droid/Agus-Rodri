import Link from "next/link";
import { IconArrowLeft, IconCheck, IconPill } from "@/components/Icons";
import { Avatar } from "@/components/Avatar";
import { EventPhoto } from "@/components/EventPhoto";

export default function EventoPage() {
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
        <span className="font-display text-[15px] font-semibold text-ink">Detalle de la toma</span>
        <div className="h-10 w-10" />
      </div>

      {/* Foto del evento — capsule shape */}
      <div className="px-6 pt-5">
        <div className="relative">
          <EventPhoto moment="desayuno" size="lg" showLock />
          {/* Badge estado */}
          <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-sage px-3 py-1.5 text-[12px] font-semibold text-bone-soft shadow-soft">
            <IconCheck className="h-4 w-4" strokeWidth={2.4} />
            Tomado en ventana
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-6 pt-5">
        <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-shadow">
          Miércoles 15 de abril
        </p>
        <h1 className="mt-1 font-display text-[28px] font-medium leading-tight text-ink">
          Mamá tomó sus<br />pastillas a las 9:03.
        </h1>
        <p className="mt-2 text-[14px] text-shadow">
          Abrió el compartimento 3 minutos después del horario previsto.
        </p>
      </div>

      {/* Datos contextuales */}
      <div className="mt-5 px-6">
        <div className="rounded-[20px] border border-mist bg-bone-soft p-4">
          <Row label="Momento del día">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-champagne-light">
                <IconPill className="h-4 w-4 text-champagne" />
              </div>
              <span className="font-display text-[15px] font-semibold text-ink">Desayuno</span>
            </div>
          </Row>
          <Divider />
          <Row label="Compartimento">
            <span className="text-[15px] text-ink">Miércoles (día 3)</span>
          </Row>
          <Divider />
          <Row label="Ventana prevista">
            <span className="text-[15px] text-ink">09:00 – 09:30</span>
          </Row>
          <Divider />
          <Row label="Quién ve este evento">
            <div className="flex items-center -space-x-1.5">
              <Avatar name="Rodrigo" size="sm" />
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-champagne text-bone-soft font-display font-semibold">
                A
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-dark text-bone-soft font-display font-semibold">
                L
              </div>
            </div>
          </Row>
        </div>
      </div>

      {/* Microcopy final */}
      <div className="mt-6 px-6">
        <p className="text-center text-[13px] leading-relaxed text-shadow">
          Podés seguir con tu día. <span className="text-sage-dark">Te avisamos si algo cambia.</span>
        </p>
      </div>

      <div className="flex-1" />

      {/* CTA volver */}
      <div className="px-6 pb-8">
        <Link
          href="/dashboard"
          className="flex h-14 items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-bone-soft shadow-soft"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-[13px] text-shadow">{label}</span>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-mist" />;
}
