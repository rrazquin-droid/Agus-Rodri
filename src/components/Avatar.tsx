type Props = {
  name: string;
  size?: "sm" | "md" | "lg";
};

export function Avatar({ name, size = "md" }: Props) {
  const initial = name.charAt(0).toUpperCase();
  const dims =
    size === "lg" ? "h-16 w-16 text-2xl" : size === "sm" ? "h-9 w-9 text-sm" : "h-12 w-12 text-lg";

  return (
    <div
      className={`${dims} flex items-center justify-center rounded-full bg-gradient-to-br from-sage-light to-sage text-bone-soft font-display font-semibold shadow-soft`}
      aria-label={name}
    >
      {initial}
    </div>
  );
}
