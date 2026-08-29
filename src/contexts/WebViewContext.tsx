import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import type {
  CenterTheme,
  ClientType,
  ThemeMode,
  WebViewPayload,
} from "../types/webview";

const DEFAULT_THEME: CenterTheme = {
  primary: "#c9e989",
  primaryDark: "#6cc685",
};

interface WebViewState {
  sessionToken: string | null;
  client: ClientType;
  theme: CenterTheme;
  mode: ThemeMode;
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
  mode: "light",
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

function normalizePayload(value: unknown): WebViewPayload | null {
  const message = parsePayload(value);
  if (!message) return null;
  if (message.type === "FITBBO_THEME") {
    return {
      ...message.payload,
      type: message.type,
      client: "app",
    };
  }
  return message;
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
  const rootStyle = document.documentElement.style;
  const injectedPrimary = validColor(
    rootStyle.getPropertyValue("--primary").trim(),
  );
  const injectedPrimaryDark = validColor(
    rootStyle.getPropertyValue("--primary-dark").trim(),
  );
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [client, setClient] = useState<ClientType>(detectedClient);
  const [theme, setTheme] = useState<CenterTheme>({
    primary: injectedPrimary ?? DEFAULT_THEME.primary,
    primaryDark: injectedPrimaryDark ?? DEFAULT_THEME.primaryDark,
  });
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const receive = (raw: unknown) => {
      const payload = normalizePayload(raw);
      if (!payload) return;
      if (typeof payload.sessionToken === "string")
        setSessionToken(payload.sessionToken);
      if (payload.client === "app" || payload.client === "web")
        setClient(payload.client);
      const primary = validColor(
        payload.center?.primary ?? payload.primary ?? payload.primaryColor,
      );
      const primaryDark = validColor(
        payload.center?.primaryDark ?? payload.primaryDark,
      );
      setTheme((current) => ({
        primary: primary || current.primary,
        primaryDark: primaryDark || current.primaryDark,
      }));
      if (payload.mode === "light" || payload.mode === "dark") {
        setMode(payload.mode);
      }
    };
    const onMessage = (event: MessageEvent) => receive(event.data);
    const onInit = (event: Event) =>
      receive((event as CustomEvent<WebViewPayload>).detail);
    const onTheme = (event: Event) =>
      receive((event as CustomEvent<WebViewPayload>).detail);
    window.addEventListener("message", onMessage);
    document.addEventListener("message", onMessage as EventListener);
    window.addEventListener("fitbbo:init", onInit);
    window.addEventListener("fitbbo:theme", onTheme);
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "FITBBO_READY" }),
    );
    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("message", onMessage as EventListener);
      window.removeEventListener("fitbbo:init", onInit);
      window.removeEventListener("fitbbo:theme", onTheme);
    };
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--primary-dark", theme.primaryDark);
    root.style.setProperty("--on-primary", contrastColor(theme.primary));
    root.style.setProperty(
      "--on-primary-dark",
      contrastColor(theme.primaryDark),
    );
    root.dataset.client = client;
    root.dataset.theme = mode;
    root.style.colorScheme = mode;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", mode === "dark" ? "#111113" : "#ffffff");
  }, [theme, client, mode]);

  const value = useMemo(
    () => ({ sessionToken, client, theme, mode, isApp: client === "app" }),
    [sessionToken, client, theme, mode],
  );
  return (
    <WebViewContext.Provider value={value}>{children}</WebViewContext.Provider>
  );
}

export function useWebView() {
  return useContext(WebViewContext);
}
