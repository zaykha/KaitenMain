import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaiten | Press",
  description: "Press resources, brand assets, and media contact for Kaiten."
};

export default function PressLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
