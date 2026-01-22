import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaiten | Privacy Policy",
  description: "Privacy policy and data handling practices for Kaiten."
};

export default function PrivacyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
