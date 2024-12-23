export default function urlSpaceFixer(url: string) {
  return url.replace(/ /g, "%20");
}
