const normalizeUrl = (value: string) => {
  const withProtocol = value.startsWith("http") ? value : `https://${value}`;

  return withProtocol.replace(/\/$/, "");
};

export const site = {
  name: "varnish",
  author: "Varnish Das",
  description:
    "Personal site of Varnish Das, a software engineering student in Tampere, Finland.",
  locale: "en_US",
  url: normalizeUrl(
    import.meta.env.SITE_URL ??
      import.meta.env.PUBLIC_SITE_URL ??
      import.meta.env.VERCEL_PROJECT_PRODUCTION_URL ??
      "https://varnishdas.dev",
  ),
};

export const getCanonicalUrl = (pathname: string) => {
  if (!site.url) return undefined;

  return new URL(pathname, site.url).toString();
};
