// Default branded OpenGraph / Twitter image.
//
// In Next.js, a page that defines its own `openGraph` object WITHOUT `images`
// suppresses any layout-level or file-convention default — leaving the page
// with no social-share preview (a bare text card). So every page that sets
// openGraph must also set images. Use these shared defaults wherever a page
// has no bespoke image.
//
// Served from app/opengraph-image.png (1920x1080) at /opengraph-image.png.
// Relative URLs are resolved against metadataBase (https://www.reachgig.com).

export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1920,
  height: 1080,
  alt: "ReachGig — Hire verified freelancers & service providers across India",
};

export const DEFAULT_OG_IMAGE_URL = "/opengraph-image.png";

// Real 512x512 raster logo (PWA icon) for Organization/LocalBusiness JSON-LD.
// Replaces the previously-referenced /images/logo.webp which 404s.
export const ORG_LOGO_URL = "https://www.reachgig.com/icon-512x512.png";
