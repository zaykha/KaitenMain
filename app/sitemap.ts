import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kaiten.com",
      lastModified: new Date()
    },
    {
      url: "https://kaiten.com/terms",
      lastModified: new Date()
    },
    {
      url: "https://kaiten.com/privacy",
      lastModified: new Date()
    },
    {
      url: "https://kaiten.com/about",
      lastModified: new Date()
    },
    {
      url: "https://kaiten.com/csr",
      lastModified: new Date()
    },
    {
      url: "https://kaiten.com/careers",
      lastModified: new Date()
    },
    {
      url: "https://kaiten.com/press",
      lastModified: new Date()
    },
    {
      url: "https://kaiten.com/security",
      lastModified: new Date()
    },
    {
      url: "https://kaiten.com/community-standards",
      lastModified: new Date()
    }
  ];
}
