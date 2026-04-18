import { IconLock } from "./Icons";

type Moment = "desayuno" | "mediodia" | "cena";
type Size = "xs" | "sm" | "md" | "lg";

type Props = {
  moment: Moment;
  size?: Size;
  showLock?: boolean;
  className?: string;
};

// Paleta según momento — cálida y coherente con la marca
const palettes: Record<Moment, { bg: string; light: string; mid: string; accent: string; shadow: string }> = {
  desayuno: {
    bg: "#E4DDCB",
    light: "#F5EAD3",
    mid: "#D8CDB4",
    accent: "#C9A96E",
    shadow: "#9C8355",
  },
  mediodia: {
    bg: "#DCE0D2",
    light: "#EAEEDF",
    mid: "#B8C9B6",
    accent: "#8FA68E",
    shadow: "#6B8369",
  },
  cena: {
    bg: "#C9B89A",
    light: "#E8D9B8",
    mid: "#A99371",
    accent: "#C9A96E",
    shadow: "#7A5A3B",
  },
};

const sizeMap: Record<Size, { container: string; lockClass: string; iconSize: string }> = {
  xs: { container: "h-11 w-11 rounded-[14px]", lockClass: "hidden", iconSize: "" },
  sm: { container: "h-16 w-16 rounded-[18px]", lockClass: "hidden", iconSize: "" },
  md: { container: "h-32 w-32 rounded-[22px]", lockClass: "bottom-1 left-1 px-1.5 py-0.5 text-[9px]", iconSize: "h-2.5 w-2.5" },
  lg: { container: "aspect-[4/5] w-full rounded-[36px]", lockClass: "bottom-3 left-3 px-2.5 py-1.5 text-[11px]", iconSize: "h-3.5 w-3.5" },
};

export function EventPhoto({ moment, size = "md", showLock = false, className = "" }: Props) {
  const palette = palettes[moment];
  const s = sizeMap[size];

  return (
    <div
      className={`relative overflow-hidden shadow-soft ${s.container} ${className}`}
      style={{ backgroundColor: palette.bg }}
      aria-label={`Foto capturada al abrir el pastillero en ${moment}`}
    >
      <Scene moment={moment} palette={palette} />
      {showLock ? (
        <div
          className={`absolute flex items-center gap-1 rounded-full bg-ink/85 font-medium text-bone-soft backdrop-blur ${s.lockClass}`}
        >
          <IconLock className={s.iconSize} strokeWidth={2} />
          {size === "lg" ? <span>Guardada localmente</span> : null}
        </div>
      ) : null}
    </div>
  );
}

function Scene({ moment, palette }: { moment: Moment; palette: typeof palettes[Moment] }) {
  const uid = `ph-${moment}`;
  return (
    <svg viewBox="0 0 320 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.light} stopOpacity="0.95" />
          <stop offset="1" stopColor={palette.accent} stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id={`${uid}-table`} cx="0.5" cy="0.4" r="0.75">
          <stop offset="0" stopColor={palette.light} />
          <stop offset="1" stopColor={palette.shadow} />
        </radialGradient>
      </defs>

      {/* Cielo / luz ambiente */}
      <rect width="320" height="400" fill={`url(#${uid}-sky)`} />

      {/* Ventana */}
      <rect x="28" y="30" width="130" height="150" rx="12" fill="#FBF5E3" opacity={moment === "cena" ? "0.3" : "0.55"} />
      <line x1="93" y1="30" x2="93" y2="180" stroke={palette.mid} strokeWidth="1.5" opacity="0.8" />
      <line x1="28" y1="105" x2="158" y2="105" stroke={palette.mid} strokeWidth="1.5" opacity="0.8" />

      {/* Mesa */}
      <rect x="0" y="260" width="320" height="140" fill={`url(#${uid}-table)`} />
      <rect x="0" y="260" width="320" height="10" fill={palette.mid} opacity="0.6" />

      {/* Objetos según momento */}
      {moment === "desayuno" ? <DesayunoProps palette={palette} /> : null}
      {moment === "mediodia" ? <MediodiaProps palette={palette} /> : null}
      {moment === "cena" ? <CenaProps palette={palette} /> : null}

      {/* Pastillero — siempre presente */}
      <g transform="translate(165 270)">
        <rect x="0" y="0" width="130" height="34" rx="17" fill="#F5F1EA" stroke={palette.accent} strokeOpacity="0.4" />
        <rect x="6" y="5" width="24" height="24" rx="12" fill="#DCE5DB" />
        <rect x="34" y="5" width="24" height="24" rx="12" fill="#DCE5DB" />
        <rect x="62" y="5" width="24" height="24" rx="12" fill="#8FA68E" />
        <rect x="90" y="5" width="24" height="24" rx="12" fill="#DCE5DB" />
        <rect x="118" y="12" width="8" height="10" rx="4" fill="#C9A96E" />
        <circle cx="74" cy="17" r="12" fill="#8FA68E" opacity="0.3" />
      </g>

      {/* Mano */}
      <g transform="translate(130 190)">
        <path d="M10 60 Q10 30 40 20 Q65 12 85 25 Q100 35 95 55 L90 90 L15 85 Z" fill="#E8C8B8" />
        <ellipse cx="55" cy="22" rx="6" ry="4" fill="#F5F1EA" stroke={palette.accent} strokeOpacity="0.5" />
        <line x1="35" y1="60" x2="28" y2="88" stroke="#D8A898" strokeWidth="2" />
        <line x1="50" y1="62" x2="48" y2="90" stroke="#D8A898" strokeWidth="2" />
        <line x1="65" y1="62" x2="68" y2="90" stroke="#D8A898" strokeWidth="2" />
        <line x1="80" y1="58" x2="85" y2="85" stroke="#D8A898" strokeWidth="2" />
      </g>

      {/* Rayo de luz — solo de día */}
      {moment !== "cena" ? (
        <polygon points="60,30 160,30 250,260 120,260" fill="#FBF5E3" opacity="0.25" />
      ) : (
        // Lámpara cálida — de noche
        <circle cx="250" cy="80" r="60" fill="#F5EAD3" opacity="0.28" />
      )}
    </svg>
  );
}

function DesayunoProps({ palette }: { palette: typeof palettes[Moment] }) {
  return (
    <g>
      {/* Taza de café */}
      <ellipse cx="90" cy="285" rx="38" ry="10" fill="#2B2A27" opacity="0.25" />
      <path d="M60 290 Q60 325 90 325 Q120 325 120 290 Z" fill="#3D3B37" />
      <ellipse cx="90" cy="290" rx="30" ry="8" fill="#2B2A27" />
      <ellipse cx="90" cy="288" rx="24" ry="5" fill="#7A5A3B" opacity="0.95" />
      <path d="M120 295 Q132 298 132 308 Q132 316 120 316" fill="none" stroke="#3D3B37" strokeWidth="3" strokeLinecap="round" />
      {/* Vapor */}
      <path d="M80 272 Q85 262 80 252 M100 272 Q105 262 100 252" fill="none" stroke={palette.shadow} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </g>
  );
}

function MediodiaProps({ palette }: { palette: typeof palettes[Moment] }) {
  return (
    <g>
      {/* Plato */}
      <ellipse cx="90" cy="300" rx="50" ry="13" fill="#2B2A27" opacity="0.18" />
      <ellipse cx="90" cy="295" rx="48" ry="12" fill="#F5F1EA" stroke={palette.accent} strokeOpacity="0.3" />
      <ellipse cx="90" cy="293" rx="36" ry="8" fill={palette.mid} opacity="0.5" />
      {/* Vaso de agua */}
      <rect x="30" y="260" width="24" height="38" rx="3" fill="#FBF5E3" opacity="0.8" stroke={palette.mid} strokeWidth="1" />
      <rect x="32" y="268" width="20" height="20" fill="#A9C0D8" opacity="0.4" />
    </g>
  );
}

function CenaProps({ palette }: { palette: typeof palettes[Moment] }) {
  return (
    <g>
      {/* Taza de té */}
      <ellipse cx="85" cy="295" rx="34" ry="9" fill="#2B2A27" opacity="0.3" />
      <path d="M60 295 Q60 328 90 328 Q120 328 115 295 Z" fill="#F5F1EA" stroke={palette.accent} strokeOpacity="0.4" />
      <ellipse cx="87" cy="295" rx="27" ry="6" fill={palette.shadow} opacity="0.6" />
      <path d="M115 300 Q130 303 130 315 Q130 322 118 320" fill="none" stroke="#F5F1EA" strokeWidth="2.5" strokeLinecap="round" />
      {/* Vapor suave */}
      <path d="M75 280 Q80 270 75 260 M95 280 Q100 270 95 260" fill="none" stroke={palette.shadow} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      {/* Libro cerrado */}
      <rect x="155" y="315" width="60" height="8" fill={palette.accent} />
      <rect x="155" y="312" width="60" height="4" fill={palette.shadow} opacity="0.6" />
    </g>
  );
}
