import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CenterTheme, ClientType, WebViewPayload } from "../types/webview";

const DEFAULT_THEME: CenterTheme = { primary: "#c9e989", primaryDark: "#6cc685" };

interface WebViewState {
  sessionToken: string | null;
  client: ClientType;
  theme: CenterTheme;
  isApp: boolean;
}

declare global {
  interface Window {
    ReactNativeWebView?: { postMessage: (message: string) => void };
  }
}

const WebViewContext = createContext<WebViewState>({ sessionToken: null, client: "web", theme: DEFAULT_THEME, isApp: false });

function parsePayload(value: unknown): WebViewPayload | null {
  try {
    const payload = typeof value === "string" ? JSON.parse(value) : value;
    return payload && typeof payload === "object" ? payload as WebViewPayload : null;
  } catch { return null; }
}

function validColor(value: unknown): string | undefined {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : undefined;
}

export function WebViewProvider({ children }: { children: ReactNode }) {
  const detectedClient: ClientType = window.ReactNativeWebView ? "app" : "web";
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [client, setClient] = useState<ClientType>(detectedClient);
  const [theme, setTheme] = useState<CenterTheme>(DEFAULT_THEME);

  useEffect(() => {
    const receive = (raw: unknown) => {
      const payload = parsePayload(raw);
      if (!payload || (payload.type && payload.type !== "FITBBO_INIT")) return;
      if (typeof payload.sessionToken === "string") setSessionToken(payload.sessionToken);
      if (payload.client === "app" || payload.client === "web") setClient(payload.client);
      const primary = validColor(payload.center?.primary ?? payload.primary);
      const primaryDark = validColor(payload.center?.primaryDark ?? payload.primaryDark);
      setTheme(current => ({ primary: primary || current.primary, primaryDark: primaryDark || current.primaryDark }));
    };
    const onMessage = (event: MessageEvent) => receive(event.data);
    const onInit = (event: Event) => receive((event as CustomEvent<WebViewPayload>).detail);
    window.addEventListener("message", onMessage);
    document.addEventListener("message", onMessage as EventListener);
    window.addEventListener("fitbbo:init", onInit);
    window.ReactNativeWebView?.postMessage(JSON.stringify({ type: "FITBBO_READY" }));
    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("message", onMessage as EventListener);
      window.removeEventListener("fitbbo:init", onInit);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--primary-dark", theme.primaryDark);
    root.dataset.client = client;
  }, [theme, client]);

  const value = useMemo(() => ({ sessionToken, client, theme, isApp: client === "app" }), [sessionToken, client, theme]);
  return <WebViewContext.Provider value={value}>{children}</WebViewContext.Provider>;
}

export function useWebView() { return useContext(WebViewContext); }
