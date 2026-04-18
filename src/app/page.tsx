import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import DashboardPage from "./dashboard/page";
import EventoPage from "./evento/page";
import AlertaPage from "./alerta/page";
import HistorialPage from "./historial/page";
import OnboardingPage from "./onboarding/page";
import AjustesPage from "./ajustes/page";
import HorariosPage from "./horarios/page";
import CirculoPage from "./circulo/page";
import InvitarPage from "./invitar/page";
import PrivacidadPage from "./privacidad/page";
import MotivoPage from "./motivo/page";

type Screen = {
  title: string;
  subtitle: string;
  href: string;
  Screen: () => React.JSX.Element;
};

const prioritarias: Screen[] = [
  {
    title: "01 · Onboarding",
    subtitle: "Emparejar pastillero",
    href: "/onboarding",
    Screen: OnboardingPage,
  },
  {
    title: "02 · Dashboard",
    subtitle: "Home del familiar",
    href: "/dashboard",
    Screen: DashboardPage,
  },
  {
    title: "03 · Evento positivo",
    subtitle: "Detalle de una toma",
    href: "/evento",
    Screen: EventoPage,
  },
  {
    title: "04 · Alerta activa",
    subtitle: "Estado 1% del tiempo",
    href: "/alerta",
    Screen: AlertaPage,
  },
  {
    title: "05 · Historial",
    subtitle: "Bitácora mensual",
    href: "/historial",
    Screen: HistorialPage,
  },
];

const mvpCompleto: Screen[] = [
  {
    title: "06 · Ajustes",
    subtitle: "Hub de configuración",
    href: "/ajustes",
    Screen: AjustesPage,
  },
  {
    title: "07 · Horarios",
    subtitle: "Rutina diaria de toma",
    href: "/horarios",
    Screen: HorariosPage,
  },
  {
    title: "08 · Círculo familiar",
    subtitle: "Miembros y roles",
    href: "/circulo",
    Screen: CirculoPage,
  },
  {
    title: "09 · Invitar",
    subtitle: "Sumar a un familiar",
    href: "/invitar",
    Screen: InvitarPage,
  },
  {
    title: "10 · Privacidad",
    subtitle: "Datos locales, candado visible",
    href: "/privacidad",
    Screen: PrivacidadPage,
  },
  {
    title: "11 · Motivo de omisión",
    subtitle: "Cerrar la alerta con contexto",
    href: "/motivo",
    Screen: MotivoPage,
  },
];

const flujos = [
  {
    nombre: "Happy path",
    descripcion: "Recepción de confirmación positiva",
    tone: "sage",
    steps: [
      { label: "Notificación push", href: null },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Detalle del evento", href: "/evento" },
      { label: "Volver al inicio", href: "/dashboard" },
    ],
  },
  {
    nombre: "Alerta",
    descripcion: "Resolver una omisión con el círculo",
    tone: "terracotta",
    steps: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Alerta activa", href: "/alerta" },
      { label: "Registrar motivo", href: "/motivo" },
      { label: "Volver al inicio", href: "/dashboard" },
    ],
  },
  {
    nombre: "Configuración",
    descripcion: "Ajustar la rutina desde el hub",
    tone: "champagne",
    steps: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Ajustes", href: "/ajustes" },
      { label: "Horarios", href: "/horarios" },
      { label: "Privacidad", href: "/privacidad" },
    ],
  },
  {
    nombre: "Círculo",
    descripcion: "Sumar un familiar al sistema",
    tone: "sage",
    steps: [
      { label: "Tab bar · Círculo", href: "/circulo" },
      { label: "Invitar familiar", href: "/invitar" },
      { label: "Volver al círculo", href: "/circulo" },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bone-soft">
      {/* Hero */}
      <header className="mx-auto max-w-6xl px-8 pt-16 pb-10">
        <div className="flex items-start justify-between gap-8">
          <div>
            <h1 className="font-display text-[52px] font-medium leading-[1.05] tracking-tight text-ink">
              medy<span className="text-sage">.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
              Convierte la ansiedad crónica en tranquilidad objetiva —
              sin llamadas diarias de verificación, sin saturación de datos, sin tono clínico.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[13px] font-semibold text-bone-soft"
              >
                Ver dashboard
              </Link>
              <Link
                href="/onboarding"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/70 px-5 text-[13px] font-semibold text-ink"
              >
                Empezar por onboarding
              </Link>
              <a
                href="#flujos"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-sage/60 bg-sage-lighter/40 px-5 text-[13px] font-semibold text-sage-dark"
              >
                Ver flujos
              </a>
            </div>
          </div>

          <TokenLegend />
        </div>
      </header>

      {/* Flujos clickables */}
      <section id="flujos" className="mx-auto max-w-6xl px-8 pb-20">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-[22px] font-semibold text-ink">Flujos clickables</h2>
          <span className="text-[13px] text-shadow">
            4 caminos · 11 pantallas · navegación real
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {flujos.map((f) => (
            <FlujoCard key={f.nombre} {...f} />
          ))}
        </div>
      </section>

      {/* Screens prioritarias */}
      <section className="mx-auto max-w-7xl px-8 pb-20">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-display text-[22px] font-semibold text-ink">
            Las 5 pantallas prioritarias
          </h2>
          <span className="text-[13px] text-shadow">iPhone 15 Pro · 390×844</span>
        </div>

        <ScreenGrid screens={prioritarias} />
      </section>

      {/* Screens MVP completo */}
      <section className="mx-auto max-w-7xl px-8 pb-24">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-display text-[22px] font-semibold text-ink">
            MVP completo
          </h2>
          <span className="text-[13px] text-shadow">
            Configuración, círculo, privacidad y flujos de soporte
          </span>
        </div>

        <ScreenGrid screens={mvpCompleto} />
      </section>

      {/* Principios */}
      <section className="mx-auto max-w-6xl px-8 pb-24">
        <div className="rounded-[32px] border border-mist bg-bone p-10">
          <h3 className="font-display text-[20px] font-semibold text-ink">
            Principios que guiaron el diseño
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="flex gap-4">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sage" />
                <div>
                  <p className="font-display text-[15px] font-semibold text-ink">{p.title}</p>
                  <p className="mt-0.5 text-[14px] leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-8 pb-16 text-center text-[12px] text-shadow">
        medy · prototipo de defensa MBA · {new Date().getFullYear()}
      </footer>
    </main>
  );
}

function ScreenGrid({ screens }: { screens: Screen[] }) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
      {screens.map(({ title, subtitle, href, Screen }) => (
        <div key={href} className="flex flex-col items-center gap-3">
          <div className="pointer-events-none origin-top scale-[0.72]" aria-hidden>
            <PhoneFrame>
              <Screen />
            </PhoneFrame>
          </div>
          <div className="mt-[-120px] flex flex-col items-center text-center">
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 font-display text-[13px] font-semibold text-bone-soft transition-transform hover:-translate-y-0.5"
            >
              {title} →
            </Link>
            <span className="mt-2 text-[13px] text-shadow">{subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FlujoCard({
  nombre,
  descripcion,
  tone,
  steps,
}: {
  nombre: string;
  descripcion: string;
  tone: "sage" | "terracotta" | "champagne";
  steps: Array<{ label: string; href: string | null }>;
}) {
  const toneClasses = {
    sage: "bg-sage",
    terracotta: "bg-terracotta",
    champagne: "bg-champagne",
  }[tone];

  return (
    <div className="rounded-[24px] border border-mist bg-bone p-5">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${toneClasses}`} />
        <h3 className="font-display text-[16px] font-semibold text-ink">{nombre}</h3>
      </div>
      <p className="mt-1 text-[13px] text-ink-soft">{descripcion}</p>
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {steps.map((step, idx) => (
          <span key={idx} className="flex items-center gap-1.5">
            {step.href ? (
              <Link
                href={step.href}
                className="rounded-full border border-ink/70 bg-bone-soft px-3 py-1.5 font-display text-[12px] font-semibold text-ink hover:bg-ink hover:text-bone-soft"
              >
                {step.label}
              </Link>
            ) : (
              <span className="rounded-full bg-mist-soft px-3 py-1.5 font-display text-[12px] font-medium text-shadow">
                {step.label}
              </span>
            )}
            {idx < steps.length - 1 ? (
              <span className="text-shadow/60">→</span>
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function TokenLegend() {
  const tokens = [
    { name: "Bone", hex: "#F5F1EA", cls: "bg-bone border border-mist" },
    { name: "Ink", hex: "#2B2A27", cls: "bg-ink" },
    { name: "Sage", hex: "#8FA68E", cls: "bg-sage" },
    { name: "Champagne", hex: "#C9A96E", cls: "bg-champagne" },
    { name: "Terracotta", hex: "#C67B5C", cls: "bg-terracotta" },
  ];
  return (
    <div className="hidden rounded-[24px] border border-mist bg-bone p-5 md:block">
      <p className="mb-4 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-shadow">
        Paleta
      </p>
      <div className="flex flex-col gap-2.5">
        {tokens.map((t) => (
          <div key={t.name} className="flex items-center gap-3">
            <span className={`h-8 w-8 rounded-full ${t.cls}`} />
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-ink">{t.name}</span>
              <span className="text-[11px] text-shadow tabular-nums">{t.hex}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const principles = [
  {
    title: "Tranquilidad sobre información",
    body:
      "Cuando todo está bien, la pantalla se siente en silencio. El dashboard comunica “podés seguir con tu día” en menos de 2 segundos.",
  },
  {
    title: "Las alertas son sagradas",
    body:
      "Sin rojo saturado. Terracotta y pulsación lenta — urgencia justa, nunca pánico. El 1% del tiempo que se usa, debe accionar sin asustar.",
  },
  {
    title: "Privacidad visible",
    body:
      "Las fotos viven en el teléfono. Candado explícito en cada imagen. Diseño que comunica “esto queda entre ustedes”.",
  },
  {
    title: "Diseño para un momento emocional",
    body:
      "Nada de gamificación, streaks ni badges. Tono cálido y humano, porque detrás de cada apertura hay preocupación por una madre o un padre.",
  },
];
