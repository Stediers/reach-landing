// Builds URL-safe vendor paths.
//
// City names and profession codes can contain characters that are not safe in a
// URL path segment — e.g. spaces ("bengaluru urban", "puncha community
// development block") and slashes ("ui/ux-designer"). Left raw, spaces produce
// invalid sitemap entries and a literal slash splits the value across two route
// segments, which 404s. encodeURIComponent turns these into %20 / %2F, which
// Next.js decodes back to the original value for the [city]/[designation] params.

export function vendorCityPath(city: string): string {
  return `/vendors/${encodeURIComponent(city)}`;
}

export function vendorDesignationPath(city: string, designation: string): string {
  return `/vendors/${encodeURIComponent(city)}/${encodeURIComponent(designation)}`;
}
