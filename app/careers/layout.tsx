import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaiten | Careers",
  description: "Explore careers at Kaiten and how we build local-first services."
};

export default function CareersLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
