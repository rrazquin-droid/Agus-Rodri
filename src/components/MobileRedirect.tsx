"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MOBILE_BREAKPOINT = 900;

export function MobileRedirect({ to }: { to: string }) {
  const router = useRouter();

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    if (mql.matches) {
      router.replace(to);
    }
  }, [router, to]);

  return null;
}
