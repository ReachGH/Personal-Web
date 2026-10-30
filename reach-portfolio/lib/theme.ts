export type Theme = "light" | "dark";

export const themeStorageKey = "reach-theme";
export const themeColours = { light: "#f8f7f3", dark: "#171c18" };

// Runs in the head before the page paints; storage can be unavailable in private contexts.
export const themeInitScript = `(()=>{let saved;try{saved=localStorage.getItem('${themeStorageKey}')}catch{}const theme=saved==='light'||saved==='dark'?saved:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=theme;const meta=document.createElement('meta');meta.name='theme-color';meta.dataset.themeColor='';meta.content=theme==='dark'?'${themeColours.dark}':'${themeColours.light}';document.head.appendChild(meta)})()`;
