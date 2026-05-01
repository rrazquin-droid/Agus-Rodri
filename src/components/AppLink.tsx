"use client";

import NextLink from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useAppNav } from "@/lib/app-nav/AppNavContext";

type Props = ComponentProps<typeof NextLink>;

export default function AppLink({ href, onClick, ...rest }: Props) {
  const nav = useAppNav();

  if (!nav) {
    return <NextLink href={href} onClick={onClick} {...rest} />;
  }

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (typeof href !== "string") return;
    if (!href.startsWith("/")) return;
    e.preventDefault();
    nav.push(href);
  };

  return <NextLink href={href} onClick={handleClick} {...rest} />;
}
