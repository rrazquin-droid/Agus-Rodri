"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  DemoMode,
  Horario,
  MotivoKey,
  Pendiente,
  Privacidad,
  SimState,
  TomaEvent,
} from "./types";
import { initialState } from "./initialState";

const STORAGE_KEY = "medy-sim-v1";

type SimActions = {
  reset: () => void;
  setDemoMode: (mode: DemoMode) => void;
  triggerAlerta: () => void;
  confirmToma: (eventId: string, at?: string) => void;
  resolveMotivo: (eventId: string, motivo: MotivoKey, note?: string) => void;
  updateHorario: (id: string, patch: Partial<Horario>) => void;
  setPrivacidad: (patch: Partial<Privacidad>) => void;
  addPendiente: (p: Omit<Pendiente, "id" | "enviadaAt">) => void;
  removePendiente: (id: string) => void;
};

type SimContextValue = SimState & SimActions & { hydrated: boolean };

const SimContext = createContext<SimContextValue | null>(null);

function loadFromStorage(): SimState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SimState;
    // Validación mínima — si falla, reseteamos
    if (!parsed.events || !Array.isArray(parsed.events)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveToStorage(state: SimState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota exceeded / private mode → ignoramos
  }
}

export function SimProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SimState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  // Hidratar desde localStorage tras el primer render (evita mismatch SSR)
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) setState(stored);
    setHydrated(true);
  }, []);

  // Persistir cada cambio
  useEffect(() => {
    if (hydrated) saveToStorage(state);
  }, [state, hydrated]);

  const reset = useCallback(() => {
    setState(initialState);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const setDemoMode = useCallback((mode: DemoMode) => {
    setState((s) => ({ ...s, demoMode: mode }));
  }, []);

  const triggerAlerta = useCallback(() => {
    setState((s) => ({
      ...s,
      demoMode: "alerta",
      events: s.events.map((e) =>
        e.moment === "desayuno"
          ? { ...e, state: "omitido", confirmedAt: undefined }
          : e,
      ),
    }));
  }, []);

  const confirmToma = useCallback((eventId: string, at?: string) => {
    setState((s) => ({
      ...s,
      events: s.events.map((e): TomaEvent =>
        e.id === eventId
          ? { ...e, state: "tomado", confirmedAt: at ?? e.confirmedAt ?? "ahora" }
          : e,
      ),
    }));
  }, []);

  const resolveMotivo = useCallback(
    (eventId: string, motivo: MotivoKey, note?: string) => {
      setState((s) => ({
        ...s,
        demoMode: "normal",
        events: s.events.map((e): TomaEvent =>
          e.id === eventId
            ? {
                ...e,
                state: "resuelto",
                motivo,
                motivoNote: note,
                confirmedAt:
                  motivo === "ya-tomo" ? e.scheduledAt : e.confirmedAt,
              }
            : e,
        ),
      }));
    },
    [],
  );

  const updateHorario = useCallback(
    (id: string, patch: Partial<Horario>) => {
      setState((s) => ({
        ...s,
        horarios: s.horarios.map((h) => (h.id === id ? { ...h, ...patch } : h)),
      }));
    },
    [],
  );

  const setPrivacidad = useCallback((patch: Partial<Privacidad>) => {
    setState((s) => ({ ...s, privacidad: { ...s.privacidad, ...patch } }));
  }, []);

  const addPendiente = useCallback(
    (p: Omit<Pendiente, "id" | "enviadaAt">) => {
      setState((s) => ({
        ...s,
        pendientes: [
          ...s.pendientes,
          {
            ...p,
            id: `p-${Date.now()}`,
            enviadaAt: Date.now(),
          },
        ],
      }));
    },
    [],
  );

  const removePendiente = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      pendientes: s.pendientes.filter((p) => p.id !== id),
    }));
  }, []);

  const value = useMemo<SimContextValue>(
    () => ({
      ...state,
      hydrated,
      reset,
      setDemoMode,
      triggerAlerta,
      confirmToma,
      resolveMotivo,
      updateHorario,
      setPrivacidad,
      addPendiente,
      removePendiente,
    }),
    [
      state,
      hydrated,
      reset,
      setDemoMode,
      triggerAlerta,
      confirmToma,
      resolveMotivo,
      updateHorario,
      setPrivacidad,
      addPendiente,
      removePendiente,
    ],
  );

  return <SimContext.Provider value={value}>{children}</SimContext.Provider>;
}

export function useSim() {
  const ctx = useContext(SimContext);
  if (!ctx) {
    throw new Error("useSim must be used inside <SimProvider>");
  }
  return ctx;
}
