import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaiten | Security Updates",
  description: "Security updates and platform reliability guidance for Kaiten."
};

export default function SecurityLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
