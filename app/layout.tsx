import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import StyledComponentsRegistry from "../components/StyledComponentsRegistry";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Kaiten",
  description:
    "Kaiten connects you to second-hand shopping, rental listings, and trusted home services.",
  metadataBase: new URL("https://kaiten.com"),
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }]
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Kaiten",
    description:
      "Kaiten connects you to second-hand shopping, rental listings, and trusted home services.",
    url: "https://kaiten.com",
    siteName: "Kaiten",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
