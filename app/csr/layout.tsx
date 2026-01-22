import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaiten | CSR",
  description: "Kaiten corporate responsibility and community impact overview."
};

export default function CsrLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
