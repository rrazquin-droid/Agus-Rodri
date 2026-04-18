import type { SimState } from "./types";

export const initialState: SimState = {
  events: [
    {
      id: "desayuno",
      moment: "desayuno",
      label: "Desayuno",
      scheduledAt: "09:00",
      compartment: "Compartimento del miércoles",
      state: "tomado",
      confirmedAt: "9:03",
    },
    {
      id: "mediodia",
      moment: "mediodia",
      label: "Mediodía",
      scheduledAt: "14:00",
      compartment: "En 4h 17min",
      state: "proximo",
    },
    {
      id: "cena",
      moment: "cena",
      label: "Cena",
      scheduledAt: "21:00",
      compartment: "Antes de dormir",
      state: "pendiente",
    },
  ],
  miembros: [
    {
      id: "rodrigo",
      nombre: "Rodrigo Razquin",
      relacion: "Hijo",
      rol: "Admin",
      you: true,
      ultimoVisto: "Ahora",
      colorClass: "bg-sage text-bone-soft",
    },
    {
      id: "lucia",
      nombre: "Lucía Razquin",
      relacion: "Hija",
      rol: "Miembro",
      ultimoVisto: "Hace 18 min",
      colorClass: "bg-champagne text-bone-soft",
    },
    {
      id: "andres",
      nombre: "Andrés Razquin",
      relacion: "Hijo",
      rol: "Miembro",
      ultimoVisto: "Ayer",
      colorClass: "bg-sage-dark text-bone-soft",
    },
  ],
  pendientes: [
    {
      id: "gabriela",
      nombre: "Gabriela (cuñada)",
      metodo: "whatsapp",
      contacto: "+598 99 ***123",
      rol: "Miembro",
      enviadaAt: Date.now() - 1000 * 60 * 60 * 20, // hace 20h
    },
  ],
  horarios: [
    {
      id: "desayuno",
      moment: "desayuno",
      nombre: "Desayuno",
      hora: "09:00",
      ventanaMinutos: 30,
      compartimento: "Fila superior · 7 días",
    },
    {
      id: "mediodia",
      moment: "mediodia",
      nombre: "Mediodía",
      hora: "14:00",
      ventanaMinutos: 30,
      compartimento: "Fila media · 7 días",
    },
    {
      id: "cena",
      moment: "cena",
      nombre: "Cena",
      hora: "21:00",
      ventanaMinutos: 45,
      compartimento: "Fila inferior · 7 días",
    },
  ],
  privacidad: {
    autoBorrado: "30",
    capturaFotos: true,
  },
  demoMode: "normal",
};
