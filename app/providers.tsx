"use client";

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyle, lightTheme } from "./theme";
import { getDictionary, Language } from "./i18n";

type ThemeName = "light" | "dark";

type ThemeContextValue = {
  themeName: ThemeName;
  toggleTheme: () => void;
};

export const ThemeToggleContext = createContext<ThemeContextValue>({
  themeName: "light",
  toggleTheme: () => {}
});

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

export const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("kaiten-theme");
    if (stored === "dark" || stored === "light") {
      setThemeName(stored);
    }
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("kaiten-lang");
    if (stored) {
      setLanguage(stored as Language);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("kaiten-theme", themeName);
    document.documentElement.setAttribute("data-theme", themeName);
  }, [themeName]);

  useEffect(() => {
    window.localStorage.setItem("kaiten-lang", language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const toggleTheme = useCallback(() => {
    setThemeName((current) => (current === "light" ? "dark" : "light"));
  }, []);

  const theme = themeName === "light" ? lightTheme : darkTheme;

  const t = useCallback(
    (key: string) => {
      const dict = getDictionary(language);
      return dict[key] ?? getDictionary("en")[key] ?? key;
    },
    [language]
  );

  const contextValue = useMemo(
    () => ({
      themeName,
      toggleTheme
    }),
    [themeName, toggleTheme]
  );

  return (
    <ThemeToggleContext.Provider value={contextValue}>
      <LanguageContext.Provider value={{ language, setLanguage, t }}>
        <ThemeProvider theme={theme as DefaultTheme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </LanguageContext.Provider>
    </ThemeToggleContext.Provider>
  );
}
