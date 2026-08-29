export type ClientType = "app" | "web";

export interface CenterTheme {
  primary: string;
  primaryDark: string;
}

export type ThemeMode = "light" | "dark";

export interface WebViewThemePayload extends Partial<CenterTheme> {
  primaryColor?: string;
  mode?: ThemeMode;
}

export interface WebViewPayload {
  type?: "FITBBO_INIT" | "FITBBO_THEME";
  sessionToken?: string;
  client?: ClientType;
  center?: Partial<CenterTheme>;
  primary?: string;
  primaryDark?: string;
  primaryColor?: string;
  mode?: ThemeMode;
  payload?: WebViewThemePayload;
}
