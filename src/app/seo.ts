import { siteConfig } from "./siteConfig";
import type { PageMetadata } from "../types/seo";

export function applyPageMetadata(metadata: PageMetadata = {}) {
  const title = metadata.title
    ? `${metadata.title} | ${siteConfig.name}`
    : siteConfig.title;
  const description = metadata.description ?? siteConfig.description;

  document.title = title;
  setMetaTag("description", description);
  setMetaTag("robots", metadata.robots ?? "index, follow");
  setMetaProperty("og:site_name", siteConfig.name);
  setMetaProperty("og:title", title);
  setMetaProperty("og:description", description);
  setMetaProperty("og:type", metadata.type ?? "website");
  setMetaProperty("og:locale", siteConfig.locale);
  setMetaProperty("og:url", new URL(window.location.pathname, siteConfig.url).href);
  setCanonicalUrl(new URL(window.location.pathname, siteConfig.url).href);
}

function setCanonicalUrl(href: string) {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = href;
}

function setMetaTag(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }

  element.content = content;
}

function setMetaProperty(property: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.content = content;
}
