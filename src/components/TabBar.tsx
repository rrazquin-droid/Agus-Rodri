import AppLink from "./AppLink";
import { IconHome, IconCalendar, IconUsers, IconSettings } from "./Icons";

type Tab = "home" | "historial" | "circulo" | "ajustes";

export function TabBar({ active }: { active: Tab }) {
  const tabs: Array<{ key: Tab; label: string; href: string; Icon: typeof IconHome }> = [
    { key: "home", label: "Inicio", href: "/dashboard", Icon: IconHome },
    { key: "historial", label: "Historial", href: "/historial", Icon: IconCalendar },
    { key: "circulo", label: "Círculo", href: "/circulo", Icon: IconUsers },
    { key: "ajustes", label: "Ajustes", href: "/ajustes", Icon: IconSettings },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-mist/80 bg-bone-soft/95 pb-5 pt-2.5 backdrop-blur">
      <nav className="flex items-center justify-around px-4">
        {tabs.map(({ key, label, href, Icon }) => {
          const isActive = key === active;
          return (
            <AppLink
              key={key}
              href={href}
              className="flex min-w-[64px] flex-col items-center gap-1 py-1"
            >
              <Icon
                className={`h-6 w-6 transition-colors ${isActive ? "text-sage-dark" : "text-shadow"}`}
                strokeWidth={isActive ? 2 : 1.6}
              />
              <span
                className={`text-[11px] font-medium tracking-wide ${isActive ? "text-sage-dark" : "text-shadow"}`}
              >
                {label}
              </span>
            </AppLink>
          );
        })}
      </nav>
    </div>
  );
}
