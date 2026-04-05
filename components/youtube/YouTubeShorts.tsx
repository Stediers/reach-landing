"use client";

import { YouTubeVideo } from "@api_functions/youtube/fetch-youtube-videos";
import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Play, X } from "lucide-react";

export default function YouTubeShorts({ shorts }: { shorts: YouTubeVideo[] }) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (shorts.length === 0) return null;

  return (
    <>
      {/* Mobile: 3-column portrait grid */}
      <div className="w-full lg:hidden">
        <div className="grid grid-cols-2 gap-3">
          {shorts.map((short, index) => (
            <MobileShortCard
              key={short.id}
              video={short}
              onClick={() => setPlayingId(short.id)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Desktop: horizontal scroll */}
      <div className="relative w-full hidden lg:block">
        <div className="flex flex-row gap-4 w-full overflow-x-auto pb-4 hide-scrollbar pr-16">
          {shorts.map((short, index) => (
            <DesktopShortCard
              key={short.id}
              video={short}
              isPlaying={playingId === short.id}
              onClick={() => setPlayingId(short.id)}
              onClose={() => setPlayingId(null)}
              index={index}
            />
          ))}
        </div>
        {/* Scroll fade + arrow indicator */}
        <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none flex items-center justify-end pr-1">
          <div className="animate-pulse">
            <ChevronRight className="w-6 h-6 text-textsubtle" />
          </div>
        </div>
      </div>

      {/* Mobile fullscreen player overlay */}
      {playingId && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center lg:hidden">
          <button
            onClick={() => setPlayingId(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="w-full h-full max-w-[400px] max-h-[90vh] aspect-[9/16]">
            <iframe
              src={`https://www.youtube.com/embed/${playingId}?autoplay=1&rel=0`}
              title="YouTube Short"
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

function MobileShortCard({
  video,
  onClick,
  index,
}: {
  video: YouTubeVideo;
  onClick: () => void;
  index: number;
}) {
  return (
    <div
      className="flex flex-col space-y-1 cursor-pointer group active:scale-[0.96] transition-transform"
      onClick={onClick}
    >
      <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={`https://i.ytimg.com/vi/${video.id}/oar2.jpg`}
          alt={video.title}
          fill
          className="object-cover"
          sizes="50vw"
          loading={index < 6 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
            <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>
      <p className="text-[11px] font-medium line-clamp-2 leading-tight">
        {video.title}
      </p>
    </div>
  );
}

function DesktopShortCard({
  video,
  isPlaying,
  onClick,
  onClose,
  index,
}: {
  video: YouTubeVideo;
  isPlaying: boolean;
  onClick: () => void;
  onClose: () => void;
  index: number;
}) {
  if (isPlaying) {
    return (
      <div className="flex flex-col space-y-2 shrink-0 w-[14rem]">
        <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-xs font-medium line-clamp-2">{video.title}</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col space-y-2 cursor-pointer group shrink-0 w-[14rem] active:scale-[0.97] transition-transform"
      onClick={onClick}
    >
      <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={`https://i.ytimg.com/vi/${video.id}/oar2.jpg`}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="14rem"
          loading={index < 4 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>
      <p className="text-xs font-medium line-clamp-2 group-hover:text-primary transition-colors">
        {video.title}
      </p>
    </div>
  );
}
