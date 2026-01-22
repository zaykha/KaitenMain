import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaiten | Community Standards",
  description: "Guidelines for safe, respectful use of Kaiten services."
};

export default function CommunityStandardsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
