"use client";

import { Suspense } from "react";
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

function ActiveScreen() {
  const nav = useAppNav();
  const Screen = screens[nav?.pathname ?? "/dashboard"] ?? DashboardPage;
  return (
    <Suspense fallback={<div className="h-full bg-bone" />}>
      <Screen />
    </Suspense>
  );
}

export function MockupShell({ initialPath = "/dashboard" }: { initialPath?: string }) {
  return (
    <AppNavProvider initialPath={initialPath}>
      <PhoneFrame>
        <ActiveScreen />
      </PhoneFrame>
      <DemoPanel force />
    </AppNavProvider>
  );
}
