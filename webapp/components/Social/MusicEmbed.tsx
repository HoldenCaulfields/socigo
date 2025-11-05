"use client";

interface MusicEmbedProps {
  url: string;
}

export default function MusicEmbed({ url }: MusicEmbedProps) {
  const match = url.match(/(track|album|playlist)\/([a-zA-Z0-9]+)/);

  // Nếu không match, return sớm
  if (!match) return null;

  const type = match[1];
  const id = match[2];

  return (
    <div className="my-3 rounded-lg overflow-hidden">
      <iframe
        src={`https://open.spotify.com/embed/${type}/${id}`}
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
