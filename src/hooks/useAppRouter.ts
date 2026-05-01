"use client";

import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
  useSearchParams as useNextSearchParams,
} from "next/navigation";
import { useAppNav } from "@/lib/app-nav/AppNavContext";

type AppRouter = {
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
  forward: () => void;
  refresh: () => void;
  prefetch: (href: string) => void;
};

export function useAppRouter(): AppRouter {
  const real = useNextRouter();
  const nav = useAppNav();

  if (nav) {
    return {
      push: nav.push,
      replace: nav.replace,
      back: nav.back,
      forward: () => {},
      refresh: () => {},
      prefetch: () => {},
    };
  }

  return {
    push: (href) => real.push(href),
    replace: (href) => real.replace(href),
    back: () => real.back(),
    forward: () => real.forward(),
    refresh: () => real.refresh(),
    prefetch: (href) => real.prefetch(href),
  };
}

export function useAppPathname() {
  const real = useNextPathname();
  const nav = useAppNav();
  return nav?.pathname ?? real;
}

export function useAppSearchParams() {
  const real = useNextSearchParams();
  const nav = useAppNav();
  return nav?.searchParams ?? real;
}
