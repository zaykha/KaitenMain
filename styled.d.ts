import "styled-components";

type ThemeColors = {
  primary: string;
  primaryDark: string;
  accent: string;
  paper: string;
  surface: string;
  text: string;
  muted: string;
  outline: string;
  gradient: string;
};

type ThemeShadows = {
  pixel: string;
  soft: string;
};

type ThemeRadius = {
  sm: string;
  md: string;
  lg: string;
};

type ThemeSpacing = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

type ThemeBreakpoints = {
  sm: string;
  md: string;
  lg: string;
};

declare module "styled-components" {
  export interface DefaultTheme {
    name: "light" | "dark";
    colors: ThemeColors;
    shadows: ThemeShadows;
    radius: ThemeRadius;
    spacing: ThemeSpacing;
    breakpoints: ThemeBreakpoints;
  }
}
