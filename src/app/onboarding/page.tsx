import Link from "next/link";
import { IconArrowLeft, IconQr, IconWifi, IconHeart } from "@/components/Icons";

export default function OnboardingPage() {
  return (
    <div className="relative flex h-full flex-col bg-bone">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-3">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-bone-soft border border-mist"
          aria-label="Volver"
        >
          <IconArrowLeft className="h-5 w-5 text-ink" />
        </Link>
        <span className="font-display text-[13px] font-medium text-shadow">Paso 2 de 3</span>
        <div className="h-10 w-10" />
      </div>

      {/* Progress */}
      <div className="px-6 pt-2">
        <div className="flex gap-1.5">
          <span className="h-1 flex-1 rounded-full bg-sage" />
          <span className="h-1 flex-1 rounded-full bg-sage" />
          <span className="h-1 flex-1 rounded-full bg-mist" />
        </div>
      </div>

      {/* Pastillero ilustrado + QR */}
      <div className="flex flex-1 flex-col justify-center px-6">
        <div className="relative mx-auto flex h-[260px] w-full items-center justify-center">
          {/* base */}
          <div className="absolute bottom-4 h-4 w-48 rounded-full bg-ink/10 blur-md" />

          {/* Pastillero vista aérea — cápsula */}
          <div className="relative h-[180px] w-[300px]">
            {/* sombra */}
            <div className="absolute inset-x-0 top-8 h-[160px] rounded-[90px] bg-bone-soft shadow-phone" />
            {/* cuerpo */}
            <div className="absolute inset-x-2 top-10 flex h-[140px] items-center justify-around rounded-[80px] border border-mist bg-bone-soft px-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-16 w-16 rounded-full ${
                    i === 2 ? "bg-sage" : "bg-mist-soft"
                  } flex items-center justify-center`}
                >
                  {i === 2 ? (
                    <div className="h-2 w-2 animate-breathe rounded-full bg-bone-soft" />
                  ) : null}
                </div>
              ))}
              {/* anillo champagne (cámara) */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-champagne bg-bone">
                <div className="h-3 w-3 rounded-full bg-ink" />
              </div>
            </div>
          </div>

          {/* QR flotando */}
          <div className="absolute right-6 top-0 flex flex-col items-center gap-1 rounded-[20px] bg-ink p-3 shadow-soft">
            <QrPattern />
            <span className="text-[9px] font-semibold uppercase tracking-wider text-bone-soft">
              medy · A3F9
            </span>
          </div>
        </div>

        {/* Copy */}
        <div className="mt-8">
          <h1 className="font-display text-[28px] font-medium leading-tight text-ink">
            Ahora vamos a<br />emparejar el pastillero.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            Escaneá el código QR que está en la base del pastillero. Lo vamos a conectar al WiFi de la casa de mamá y listo.
          </p>
        </div>

        {/* Pasos */}
        <div className="mt-6 space-y-2.5">
          <StepRow
            icon={<IconQr className="h-5 w-5 text-sage-dark" strokeWidth={1.8} />}
            title="Escaneá el QR"
            hint="Está debajo del pastillero"
          />
          <StepRow
            icon={<IconWifi className="h-5 w-5 text-sage-dark" strokeWidth={1.8} />}
            title="Conectá al WiFi"
            hint="Necesitás la clave de casa"
          />
          <StepRow
            icon={<IconHeart className="h-5 w-5 text-sage-dark" strokeWidth={1.8} />}
            title="Invitá a tu familia"
            hint="Todos reciben las mismas avisos"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-8 pt-4">
        <Link
          href="/dashboard"
          className="flex h-14 items-center justify-center rounded-full bg-sage-dark text-[15px] font-semibold text-bone-soft shadow-soft"
        >
          Escanear pastillero
        </Link>
        <button className="mt-2 flex h-12 w-full items-center justify-center text-[14px] font-medium text-shadow">
          Lo hago después
        </button>
      </div>
    </div>
  );
}

function StepRow({
  icon,
  title,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  hint: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[18px] border border-mist bg-bone-soft px-4 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-lighter">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-display text-[14px] font-semibold text-ink">{title}</p>
        <p className="text-[12px] text-shadow">{hint}</p>
      </div>
    </div>
  );
}

function QrPattern() {
  // Patrón QR decorativo (no escanea — es un mockup)
  const cells = [
    "1110111",
    "1000001",
    "1011101",
    "1010101",
    "1011101",
    "1000001",
    "1110111",
  ];
  return (
    <div className="grid grid-cols-7 gap-[1px] rounded-md bg-bone p-1.5">
      {cells.flatMap((row, r) =>
        row.split("").map((c, cIdx) => (
          <span
            key={`${r}-${cIdx}`}
            className={`h-2 w-2 ${c === "1" ? "bg-ink" : "bg-bone"}`}
          />
        )),
      )}
    </div>
  );
}
