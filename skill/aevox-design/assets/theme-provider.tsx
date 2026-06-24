import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";
type Density = "cozy" | "compact";

type ThemeCtx = {
  theme: Theme;
  density: Density;
  toggleTheme: () => void;
  toggleDensity: () => void;
};

const Ctx = createContext<ThemeCtx | null>(null);

const THEME_KEY = "aevox_theme";
const DENSITY_KEY = "aevox_density";

function apply(theme: Theme, density: Density) {
  const root = document.documentElement;
  // Light is the default — no class. Dark is opt-in via the `.dark` class
  // (shadcn / Tailwind v4 convention). An app shipping only the CSS renders
  // light with no flash.
  root.classList.toggle("dark", theme === "dark");
  if (density === "compact") root.setAttribute("data-density", "compact");
  else root.removeAttribute("data-density");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(THEME_KEY) as Theme) || "light",
  );
  const [density, setDensity] = useState<Density>(
    () => (localStorage.getItem(DENSITY_KEY) as Density) || "cozy",
  );

  useEffect(() => {
    apply(theme, density);
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(DENSITY_KEY, density);
  }, [theme, density]);

  return (
    <Ctx.Provider
      value={{
        theme,
        density,
        toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
        toggleDensity: () =>
          setDensity((d) => (d === "cozy" ? "compact" : "cozy")),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
