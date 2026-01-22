import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  name: "light",
  colors: {
    primary: "#24356f",
    primaryDark: "#1b274f",
    accent: "#3b4f9b",
    paper: "#f2f4f8",
    surface: "#f8f9fc",
    text: "#0c1224",
    muted: "#596380",
    outline: "rgba(12, 18, 36, 0.12)",
    gradient: "linear-gradient(135deg, #1e2c5c, #2f4285, #1a2450)"
  },
  shadows: {
    pixel: "0 0 0 2px #111, 6px 6px 0 rgba(17,17,17,0.4)",
    soft: "0 14px 34px rgba(0,0,0,0.08)"
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px"
  },
  spacing: {
    xs: "6px",
    sm: "10px",
    md: "16px",
    lg: "24px",
    xl: "36px",
    xxl: "56px"
  },
  breakpoints: {
    sm: "640px",
    md: "900px",
    lg: "1200px"
  }
};

export const darkTheme = {
  name: "dark",
  colors: {
    primary: "#c7d2ff",
    primaryDark: "#9fb0ff",
    accent: "#7a90e6",
    paper: "#0f1630",
    surface: "#121a33",
    text: "#f2f4f8",
    muted: "#a9b4ce",
    outline: "rgba(242, 244, 248, 0.14)",
    gradient: "linear-gradient(135deg, #0f1a3a, #1a2856, #0d1430)"
  },
  shadows: {
    pixel: "0 0 0 2px #0a0a0a, 6px 6px 0 rgba(0,0,0,0.5)",
    soft: "0 18px 36px rgba(0,0,0,0.35)"
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px"
  },
  spacing: {
    xs: "6px",
    sm: "10px",
    md: "16px",
    lg: "24px",
    xl: "36px",
    xxl: "56px"
  },
  breakpoints: {
    sm: "640px",
    md: "900px",
    lg: "1200px"
  }
};

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: var(--font-inter), system-ui, sans-serif;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.paper};
    line-height: 1.6;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-outfit), system-ui, sans-serif;
    letter-spacing: -0.02em;
    margin: 0 0 0.6rem 0;
  }

  p {
    margin: 0 0 1rem 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
