export type ClientType = "app" | "web";

export interface CenterTheme {
  primary: string;
  primaryDark: string;
}

export interface WebViewPayload {
  type?: "FITBBO_INIT";
  sessionToken?: string;
  client?: ClientType;
  center?: Partial<CenterTheme>;
  primary?: string;
  primaryDark?: string;
}
