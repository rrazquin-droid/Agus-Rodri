export type Moment = "desayuno" | "mediodia" | "cena";

export type EventState = "tomado" | "pendiente" | "proximo" | "omitido" | "resuelto";

export type TomaEvent = {
  id: string;
  moment: Moment;
  label: string;
  scheduledAt: string;   // "09:00"
  compartment: string;   // "Compartimento del miércoles"
  state: EventState;
  confirmedAt?: string;  // "9:03"
  motivo?: MotivoKey;
  motivoNote?: string;
};

export type MotivoKey = "ya-tomo" | "consultorio" | "viaje" | "otro";

export type Rol = "Admin" | "Miembro";

export type Miembro = {
  id: string;
  nombre: string;
  rol: Rol;
  relacion: string;
  you?: boolean;
  ultimoVisto: string;
  colorClass: string;
};

export type Pendiente = {
  id: string;
  nombre: string;
  metodo: "whatsapp" | "email";
  contacto: string;
  rol: Rol;
  enviadaAt: number; // Date.now()
};

export type Horario = {
  id: string;
  moment: Moment;
  nombre: string;
  hora: string;
  ventanaMinutos: 15 | 30 | 45 | 60;
  compartimento: string;
};

export type Privacidad = {
  autoBorrado: "nunca" | "90" | "30" | "7";
  capturaFotos: boolean;
};

export type DemoMode = "normal" | "alerta";

export type RecentTaking = {
  id: string;
  moment: Moment;
  title: string;
  hint: string;
  href?: string;
};

export type SimState = {
  events: TomaEvent[];
  miembros: Miembro[];
  pendientes: Pendiente[];
  horarios: Horario[];
  recentTakings: RecentTaking[];
  privacidad: Privacidad;
  demoMode: DemoMode;
};
