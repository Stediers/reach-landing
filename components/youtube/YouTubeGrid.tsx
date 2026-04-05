"use client";

import { YouTubeVideo } from "@api_functions/youtube/fetch-youtube-videos";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function YouTubeGrid({ videos }: { videos: YouTubeVideo[] }) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (videos.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full">
      {videos.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          isPlaying={playingId === video.id}
          onClick={() => setPlayingId(video.id)}
          index={index}
        />
      ))}
    </div>
  );
}

function VideoCard({
  video,
  isPlaying,
  onClick,
  index,
}: {
  video: YouTubeVideo;
  isPlaying: boolean;
  onClick: () => void;
  index: number;
}) {
  if (isPlaying) {
    return (
      <div className="flex flex-col space-y-1.5 lg:space-y-3">
        <div className="aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div>
          <p className="text-xs lg:text-sm font-medium line-clamp-2">{video.title}</p>
          <p className="text-[10px] lg:text-xs text-textsubtle mt-0.5 lg:mt-1">
            {formatDate(video.published)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col space-y-1.5 lg:space-y-3 cursor-pointer group active:scale-[0.98] transition-transform"
      onClick={onClick}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 1024px) 50vw, 33vw"
          loading={index < 3 ? "eager" : "lazy"}
        />
        {/* Always visible on mobile, hover-only on desktop */}
        <div className="absolute inset-0 bg-black/20 lg:bg-black/0 lg:group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-8 h-8 lg:w-12 lg:h-12 bg-red-600 rounded-full flex items-center justify-center lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shadow-lg">
            <Play className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs lg:text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </p>
        <p className="text-[10px] lg:text-xs text-textsubtle mt-0.5 lg:mt-1">
          {formatDate(video.published)}
        </p>
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
