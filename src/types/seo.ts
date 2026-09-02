export type SiteMetadata = {
  name: string;
  title: string;
  description: string;
  url: string;
  locale: string;
};

export type PageMetadata = {
  title?: string;
  description?: string;
  type?: "website" | "article";
  robots?: string;
};
