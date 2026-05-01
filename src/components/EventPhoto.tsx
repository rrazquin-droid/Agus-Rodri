import { IconLock } from "./Icons";

type Moment = "desayuno" | "mediodia" | "cena";
type Size = "xs" | "sm" | "md" | "lg";

type Props = {
  moment: Moment;
  size?: Size;
  showLock?: boolean;
  className?: string;
};

const photos: Record<Moment, string> = {
  desayuno: "/photos/toma-desayuno.webp",
  mediodia: "/photos/toma-mediodia.webp",
  cena: "/photos/toma-cena.webp",
};

const sizeMap: Record<
  Size,
  { container: string; lockClass: string; iconSize: string }
> = {
  xs: { container: "h-11 w-11 rounded-[14px]", lockClass: "hidden", iconSize: "" },
  sm: { container: "h-16 w-16 rounded-[18px]", lockClass: "hidden", iconSize: "" },
  md: {
    container: "h-32 w-32 rounded-[22px]",
    lockClass: "bottom-1 left-1 px-1.5 py-0.5 text-[9px]",
    iconSize: "h-2.5 w-2.5",
  },
  lg: {
    container: "aspect-[4/5] w-full rounded-[36px]",
    lockClass: "bottom-3 left-3 px-2.5 py-1.5 text-[11px]",
    iconSize: "h-3.5 w-3.5",
  },
};

const altText: Record<Moment, string> = {
  desayuno: "Foto del pastillero al confirmarse la toma del desayuno",
  mediodia: "Foto del pastillero al confirmarse la toma del mediodía",
  cena: "Foto del pastillero al confirmarse la toma de la cena",
};

export function EventPhoto({
  moment,
  size = "md",
  showLock = false,
  className = "",
}: Props) {
  const s = sizeMap[size];

  return (
    <div className={`relative overflow-hidden bg-mist-soft shadow-soft ${s.container} ${className}`}>
      <img
        src={photos[moment]}
        alt={altText[moment]}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {showLock ? (
        <div
          className={`absolute z-10 flex items-center gap-1 rounded-full bg-ink/85 font-medium text-bone-soft backdrop-blur ${s.lockClass}`}
        >
          <IconLock className={s.iconSize} strokeWidth={2} />
          {size === "lg" ? <span>Guardada localmente</span> : null}
        </div>
      ) : null}
    </div>
  );
}
