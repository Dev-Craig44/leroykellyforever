import { useEffect } from "react";

interface MetaTagsProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export default function MetaTags({
  title = "Leroy Kelly Forever | Limited Edition Hat Drop",
  description = "Honoring Hall of Fame RB Leroy Kelly with an exclusive 50-hat limited release. Join the private list for first access.",
  path = "/",
  image = "/og-image.jpg",
}: MetaTagsProps) {
  useEffect(() => {
    // Update page title
    document.title = title;

    // Update meta tags
    const metaTags = [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `https://leroykellyforever.com${path}` },
      {
        property: "og:image",
        content: `https://leroykellyforever.com${image}`,
      },
      { property: "twitter:title", content: title },
      { property: "twitter:description", content: description },
      {
        property: "twitter:url",
        content: `https://leroykellyforever.com${path}`,
      },
      {
        property: "twitter:image",
        content: `https://leroykellyforever.com${image}`,
      },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name
        ? `meta[name="${name}"]`
        : `meta[property="${property}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;

      if (!element) {
        element = document.createElement("meta");
        if (name) element.name = name;
        if (property) element.setAttribute("property", property);
        document.head.appendChild(element);
      }

      element.content = content;
    });

    // Update canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://leroykellyforever.com${path}`;
  }, [title, description, path, image]);

  return null;
}
