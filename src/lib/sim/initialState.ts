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
    {
      id: "javier",
      nombre: "Javier Pereira",
      relacion: "Hermano de Silvia",
      rol: "Miembro",
      ultimoVisto: "Hace 2 días",
      colorClass: "bg-terracotta text-bone-soft",
    },
  ],
  pendientes: [
    {
      id: "gabriela",
      nombre: "Gabriela Pereira",
      metodo: "whatsapp",
      contacto: "+598 99 ***123",
      rol: "Miembro",
      enviadaAt: Date.now() - 1000 * 60 * 60 * 20, // hace 20h
    },
    {
      id: "marisol",
      nombre: "Marisol Acevedo",
      metodo: "email",
      contacto: "marisol@***.com",
      rol: "Miembro",
      enviadaAt: Date.now() - 1000 * 60 * 8, // hace 8 min
    },
    {
      id: "florencia",
      nombre: "Florencia Razquin",
      metodo: "whatsapp",
      contacto: "+598 98 ***745",
      rol: "Admin",
      enviadaAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // hace 3 días
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
  recentTakings: [
    {
      id: "h-hoy-9",
      moment: "desayuno",
      title: "Hoy · 09:03",
      hint: "Desayuno · Tomado en ventana",
      href: "/evento",
    },
    {
      id: "h-ayer-21",
      moment: "cena",
      title: "Ayer · 21:08",
      hint: "Cena · Tomado en ventana",
    },
    {
      id: "h-ayer-14",
      moment: "mediodia",
      title: "Ayer · 14:12",
      hint: "Mediodía · Tomado en ventana",
    },
    {
      id: "h-ayer-9",
      moment: "desayuno",
      title: "Ayer · 09:11",
      hint: "Desayuno · Tomado en ventana",
    },
    {
      id: "h-anteayer-21",
      moment: "cena",
      title: "Anteayer · 21:35",
      hint: "Cena · Tomado tarde — fuera de ventana",
    },
    {
      id: "h-anteayer-14",
      moment: "mediodia",
      title: "Anteayer · 14:02",
      hint: "Mediodía · Tomado en ventana",
    },
    {
      id: "h-3d-9",
      moment: "desayuno",
      title: "Hace 3 días · 09:18",
      hint: "Desayuno · Tomado en ventana",
    },
    {
      id: "h-4d-21",
      moment: "cena",
      title: "Hace 4 días · 21:02",
      hint: "Cena · Tomado en ventana",
    },
  ],
  privacidad: {
    autoBorrado: "30",
    capturaFotos: true,
  },
  demoMode: "normal",
};
