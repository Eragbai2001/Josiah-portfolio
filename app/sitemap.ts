import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://josiah-portfolio1.vercel.app";

  // Define all routes in the application
  const routes = [
    "",
    "/testing",
    "/about",
    "/services",
    "/projects",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === ""
      ? "daily"
      : "weekly") as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority:
      path === ""
        ? 1
        : path === "/services" || path === "/projects"
        ? 0.8
        : 0.7,
  }));

  return routes;
}
