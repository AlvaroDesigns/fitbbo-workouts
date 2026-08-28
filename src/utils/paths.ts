export const APP_BASENAME = window.location.hostname === "alvarodesigns.github.io" ? "/fitbbo-workouts" : "";
export function publicPath(path: string) { return `${APP_BASENAME}/${path.replace(/^\//, "")}`; }
