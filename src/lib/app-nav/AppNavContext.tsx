"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AppNavValue = {
  pathname: string;
  searchParams: URLSearchParams;
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
  history: string[];
};

const AppNavContext = createContext<AppNavValue | null>(null);

function splitHref(href: string): { path: string; search: URLSearchParams } {
  const [path, query = ""] = href.split("?");
  return { path: path || "/", search: new URLSearchParams(query) };
}

export function AppNavProvider({
  initialPath = "/dashboard",
  children,
}: {
  initialPath?: string;
  children: ReactNode;
}) {
  const initial = useMemo(() => splitHref(initialPath), [initialPath]);
  const [pathname, setPathname] = useState(initial.path);
  const [searchParams, setSearchParams] = useState(initial.search);
  const [history, setHistory] = useState<string[]>([initialPath]);

  const navigate = useCallback(
    (href: string, mode: "push" | "replace") => {
      const { path, search } = splitHref(href);
      setPathname(path);
      setSearchParams(search);
      setHistory((h) => (mode === "push" ? [...h, href] : [...h.slice(0, -1), href]));
    },
    [],
  );

  const back = useCallback(() => {
    setHistory((h) => {
      if (h.length <= 1) return h;
      const next = h.slice(0, -1);
      const target = next[next.length - 1];
      const { path, search } = splitHref(target);
      setPathname(path);
      setSearchParams(search);
      return next;
    });
  }, []);

  const value = useMemo<AppNavValue>(
    () => ({
      pathname,
      searchParams,
      push: (href) => navigate(href, "push"),
      replace: (href) => navigate(href, "replace"),
      back,
      history,
    }),
    [pathname, searchParams, navigate, back, history],
  );

  return <AppNavContext.Provider value={value}>{children}</AppNavContext.Provider>;
}

export function useAppNav() {
  return useContext(AppNavContext);
}
