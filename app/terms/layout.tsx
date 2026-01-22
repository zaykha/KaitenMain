import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaiten | Terms & Conditions",
  description: "Terms and conditions for using Kaiten and its products."
};

export default function TermsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
