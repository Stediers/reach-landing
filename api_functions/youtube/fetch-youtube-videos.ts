const PODCAST_PLAYLIST_ID = "PLGYKB05E6aXkomAnRk91tp16JsSDsKiqu";
const CHANNEL_ID = "UCjPurIYYh6l69sJRC8jNPXA";

const PODCAST_FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PODCAST_PLAYLIST_ID}`;
const CHANNEL_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export type YouTubeVideo = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
};

function parseEntries(xml: string): { shorts: YouTubeVideo[]; videos: YouTubeVideo[] } {
  const entries = xml.split("<entry>").slice(1);
  const shorts: YouTubeVideo[] = [];
  const videos: YouTubeVideo[] = [];

  entries.forEach((entry) => {
    const id = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? "";
    const title = entry.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
    const published = entry.match(/<published>(.*?)<\/published>/)?.[1] ?? "";
    const link = entry.match(/href="(.*?)"/)?.[1] ?? "";
    const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

    const video = { id, title, published, thumbnail };

    if (link.includes("/shorts/")) {
      shorts.push(video);
    } else {
      videos.push(video);
    }
  });

  return { shorts, videos };
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(PODCAST_FEED_URL, { next: { revalidate: 60 } });
    if (!res.ok) return [];

    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    console.log(`[YouTube] Fetched ${entries.length} podcasts from playlist`);

    return entries.map((entry) => {
      const id = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? "";
      const title = entry.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
      const published = entry.match(/<published>(.*?)<\/published>/)?.[1] ?? "";
      const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      return { id, title, published, thumbnail };
    });
  } catch (error) {
    console.error("Failed to fetch YouTube podcasts:", error);
    return [];
  }
}

export async function fetchYouTubeShorts(): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(CHANNEL_FEED_URL, { next: { revalidate: 60 } });
    if (!res.ok) return [];

    const xml = await res.text();
    const { shorts } = parseEntries(xml);
    console.log(`[YouTube] Fetched ${shorts.length} shorts from channel`);

    return shorts;
  } catch (error) {
    console.error("Failed to fetch YouTube shorts:", error);
    return [];
  }
}
