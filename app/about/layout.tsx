import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaiten | About",
  description: "Learn about Kaiten, our mission, and how we build local-first services."
};

export default function AboutLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
