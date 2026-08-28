import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CenterTheme, ClientType, WebViewPayload } from "../types/webview";

const DEFAULT_THEME: CenterTheme = {
  primary: "#c9e989",
  primaryDark: "#6cc685",
};

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

const WebViewContext = createContext<WebViewState>({
  sessionToken: null,
  client: "web",
  theme: DEFAULT_THEME,
  isApp: false,
});

function parsePayload(value: unknown): WebViewPayload | null {
  try {
    const payload = typeof value === "string" ? JSON.parse(value) : value;
    return payload && typeof payload === "object"
      ? (payload as WebViewPayload)
      : null;
  } catch {
    return null;
  }
}

function validColor(value: unknown): string | undefined {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value)
    ? value
    : undefined;
}

function contrastColor(hex: string) {
  const channels = [1, 3, 5].map(
    (index) => parseInt(hex.slice(index, index + 2), 16) / 255,
  );
  const [r, g, b] = channels.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const contrastWithDark = (luminance + 0.05) / 0.05;
  const contrastWithWhite = 1.05 / (luminance + 0.05);
  return contrastWithWhite > contrastWithDark ? "#ffffff" : "#111310";
}

export function WebViewProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const detectedClient: ClientType = window.ReactNativeWebView ? "app" : "web";
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [client, setClient] = useState<ClientType>(detectedClient);
  const [theme, setTheme] = useState<CenterTheme>(DEFAULT_THEME);

  useEffect(() => {
    const receive = (raw: unknown) => {
      const payload = parsePayload(raw);
      if (!payload || (payload.type && payload.type !== "FITBBO_INIT")) return;
      if (typeof payload.sessionToken === "string")
        setSessionToken(payload.sessionToken);
      if (payload.client === "app" || payload.client === "web")
        setClient(payload.client);
      const primary = validColor(payload.center?.primary ?? payload.primary);
      const primaryDark = validColor(
        payload.center?.primaryDark ?? payload.primaryDark,
      );
      setTheme((current) => ({
        primary: primary || current.primary,
        primaryDark: primaryDark || current.primaryDark,
      }));
    };
    const onMessage = (event: MessageEvent) => receive(event.data);
    const onInit = (event: Event) =>
      receive((event as CustomEvent<WebViewPayload>).detail);
    window.addEventListener("message", onMessage);
    document.addEventListener("message", onMessage as EventListener);
    window.addEventListener("fitbbo:init", onInit);
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "FITBBO_READY" }),
    );
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
    root.style.setProperty("--on-primary", contrastColor(theme.primary));
    root.style.setProperty(
      "--on-primary-dark",
      contrastColor(theme.primaryDark),
    );
    root.dataset.client = client;
  }, [theme, client]);

  const value = useMemo(
    () => ({ sessionToken, client, theme, isApp: client === "app" }),
    [sessionToken, client, theme],
  );
  return (
    <WebViewContext.Provider value={value}>{children}</WebViewContext.Provider>
  );
}

export function useWebView() {
  return useContext(WebViewContext);
}
