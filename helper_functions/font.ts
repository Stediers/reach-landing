interface GoogleFontOptions {
  family: string;
  weight?: number[] | number;
}

export async function loadGoogleFont({
  family,
  weight = 400,
}: GoogleFontOptions): Promise<ArrayBuffer> {
  const weights = Array.isArray(weight) ? weight : [weight];
  const params = new URLSearchParams({
    family: `${family}:wght@${weights.join(";")}`,
  });

  const url = `https://fonts.googleapis.com/css2?${params}`;
  const css = await fetch(url, {
    headers: {
      // Google Fonts requires a user agent to serve fonts
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    },
  }).then((res) => res.text());

  const fontUrl = css.match(
    /src: url\((.+)\) format\('(woff2|truetype)'\)/
  )?.[1];
  if (!fontUrl) {
    throw new Error("Could not find font URL in CSS response");
  }

  const fontResponse = await fetch(fontUrl);
  return await fontResponse.arrayBuffer();
}
