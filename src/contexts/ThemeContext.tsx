import { createContext, useContext, useEffect, useState } from "react";

type Theme = "egyptian-night" | "chai-spice";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("championsprep-theme");
    return (stored as Theme) || "egyptian-night";
  });

  useEffect(() => {
    localStorage.setItem("championsprep-theme", theme);
    
    // Apply theme class to document
    const root = document.documentElement;
    if (theme === "chai-spice") {
      root.classList.add("chai-spice");
    } else {
      root.classList.remove("chai-spice");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
