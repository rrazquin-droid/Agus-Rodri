"use client";

import { AppNavProvider, useAppNav } from "@/lib/app-nav/AppNavContext";
import { PhoneFrame } from "./PhoneFrame";
import { DemoPanel } from "./DemoPanel";
import OnboardingPage from "@/app/onboarding/page";
import DashboardPage from "@/app/dashboard/page";
import EventoPage from "@/app/evento/page";
import AlertaPage from "@/app/alerta/page";
import HistorialPage from "@/app/historial/page";
import AjustesPage from "@/app/ajustes/page";
import HorariosPage from "@/app/horarios/page";
import CirculoPage from "@/app/circulo/page";
import InvitarPage from "@/app/invitar/page";
import PrivacidadPage from "@/app/privacidad/page";
import MotivoPage from "@/app/motivo/page";
import { Suspense } from "react";

const screens: Record<string, () => React.JSX.Element> = {
  "/": DashboardPage,
  "/onboarding": OnboardingPage,
  "/dashboard": DashboardPage,
  "/evento": EventoPage,
  "/alerta": AlertaPage,
  "/historial": HistorialPage,
  "/ajustes": AjustesPage,
  "/horarios": HorariosPage,
  "/circulo": CirculoPage,
  "/invitar": InvitarPage,
  "/privacidad": PrivacidadPage,
  "/motivo": MotivoPage,
};

const flujos = [
  {
    nombre: "Happy path",
    descripcion: "Recepción de confirmación positiva",
    tone: "sage" as const,
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
    tone: "terracotta" as const,
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
    tone: "champagne" as const,
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
    tone: "sage" as const,
    steps: [
      { label: "Tab bar · Círculo", href: "/circulo" },
      { label: "Invitar familiar", href: "/invitar" },
      { label: "Volver al círculo", href: "/circulo" },
    ],
  },
];

const pantallas: Array<{ key: string; label: string; href: string }> = [
  { key: "onboarding", label: "Onboarding", href: "/onboarding" },
  { key: "dashboard", label: "Dashboard", href: "/dashboard" },
  { key: "evento", label: "Evento", href: "/evento" },
  { key: "alerta", label: "Alerta", href: "/alerta" },
  { key: "historial", label: "Historial", href: "/historial" },
  { key: "ajustes", label: "Ajustes", href: "/ajustes" },
  { key: "horarios", label: "Horarios", href: "/horarios" },
  { key: "circulo", label: "Círculo", href: "/circulo" },
  { key: "invitar", label: "Invitar", href: "/invitar" },
  { key: "privacidad", label: "Privacidad", href: "/privacidad" },
  { key: "motivo", label: "Motivo", href: "/motivo" },
];

export function LandingDesktop() {
  return (
    <AppNavProvider initialPath="/dashboard">
      <main className="hidden min-h-screen bg-bone-soft md:block">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr_minmax(420px,460px)] gap-12 px-10 py-14">
          {/* Lado izquierdo — copy + controles */}
          <div className="flex flex-col gap-10">
            <Hero />
            <PantallaSwitcher />
            <FlujosSection />
            <PrinciplesSection />
            <Footer />
          </div>

          {/* Lado derecho — mockup sticky */}
          <aside className="sticky top-6 self-start">
            <div className="flex flex-col items-center gap-3">
              <PathBadge />
              <div className="origin-top scale-[0.85]">
                <PhoneFrame>
                  <ActiveScreen />
                </PhoneFrame>
              </div>
              <p className="-mt-24 max-w-[360px] text-center text-[12px] leading-relaxed text-shadow">
                Navegá la app real desde acá. Los toques dentro del mockup actualizan solo esta pantalla.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <DemoPanel force />
    </AppNavProvider>
  );
}

// MockupShell still re-exports its own copy for direct use elsewhere if needed.

function ActiveScreen() {
  const nav = useAppNav();
  const Screen = screens[nav?.pathname ?? "/dashboard"] ?? DashboardPage;
  return (
    <Suspense fallback={<div className="h-full bg-bone" />}>
      <Screen />
    </Suspense>
  );
}

function PathBadge() {
  const nav = useAppNav();
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-mist bg-bone px-3 py-1.5">
      <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-sage" />
      <span className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-shadow">
        {nav?.pathname ?? "/dashboard"}
      </span>
    </div>
  );
}

function Hero() {
  return (
    <header>
      <h1 className="font-display text-[52px] font-medium leading-[1.05] tracking-tight text-ink">
        ReMedy<span className="text-sage">.</span>
      </h1>
      <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-soft">
        Convierte la ansiedad crónica en tranquilidad objetiva — sin llamadas
        diarias de verificación, sin saturación de datos, sin tono clínico.
      </p>
      <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-shadow">
        Esta es una landing de prototipo. La app vive solo en formato móvil; navegala
        en el mockup de la derecha o desde un celular real.
      </p>
    </header>
  );
}

function PantallaSwitcher() {
  const nav = useAppNav();
  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-display text-[18px] font-semibold text-ink">Saltar a una pantalla</h2>
        <span className="text-[12px] text-shadow">11 pantallas</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {pantallas.map((p) => {
          const active = nav?.pathname === p.href;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => nav?.push(p.href)}
              className={`rounded-full border px-3.5 py-1.5 font-display text-[12px] font-semibold transition ${
                active
                  ? "border-ink bg-ink text-bone-soft"
                  : "border-ink/15 bg-bone text-ink hover:border-ink/40"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function FlujosSection() {
  return (
    <section id="flujos">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-display text-[18px] font-semibold text-ink">Flujos clickables</h2>
        <span className="text-[12px] text-shadow">4 caminos</span>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {flujos.map((f) => (
          <FlujoCard key={f.nombre} {...f} />
        ))}
      </div>
    </section>
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
  const nav = useAppNav();
  const toneClasses = {
    sage: "bg-sage",
    terracotta: "bg-terracotta",
    champagne: "bg-champagne",
  }[tone];

  return (
    <div className="rounded-[20px] border border-mist bg-bone p-4">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${toneClasses}`} />
        <h3 className="font-display text-[15px] font-semibold text-ink">{nombre}</h3>
      </div>
      <p className="mt-1 text-[12px] text-ink-soft">{descripcion}</p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {steps.map((step, idx) => (
          <span key={idx} className="flex items-center gap-1.5">
            {step.href ? (
              <button
                type="button"
                onClick={() => step.href && nav?.push(step.href)}
                className="rounded-full border border-ink/70 bg-bone-soft px-2.5 py-1 font-display text-[11px] font-semibold text-ink hover:bg-ink hover:text-bone-soft"
              >
                {step.label}
              </button>
            ) : (
              <span className="rounded-full bg-mist-soft px-2.5 py-1 font-display text-[11px] font-medium text-shadow">
                {step.label}
              </span>
            )}
            {idx < steps.length - 1 ? <span className="text-shadow/60">→</span> : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function PrinciplesSection() {
  const principles = [
    {
      title: "Tranquilidad sobre información",
      body:
        "Cuando todo está bien, la pantalla se siente en silencio. El dashboard comunica “podés seguir con tu día” en menos de 2 segundos.",
    },
    {
      title: "Las alertas son sagradas",
      body:
        "Sin rojo saturado. Terracotta y pulsación lenta — urgencia justa, nunca pánico.",
    },
    {
      title: "Privacidad visible",
      body:
        "Las fotos viven en el teléfono. Candado explícito en cada imagen.",
    },
    {
      title: "Diseño para un momento emocional",
      body: "Nada de gamificación, streaks ni badges. Tono cálido y humano.",
    },
  ];
  return (
    <section className="rounded-[24px] border border-mist bg-bone p-6">
      <h3 className="font-display text-[16px] font-semibold text-ink">Principios de diseño</h3>
      <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-2">
        {principles.map((p) => (
          <div key={p.title} className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
            <div>
              <p className="font-display text-[13px] font-semibold text-ink">{p.title}</p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="text-[11px] text-shadow">
      ReMedy · prototipo de defensa MBA · {new Date().getFullYear()}
    </footer>
  );
}
