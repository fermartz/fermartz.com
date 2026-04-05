import { PlaylistCard } from "./PlaylistCard.tsx";

export function PlaylistGrid({
  playlists,
  onSelectPlaylist,
  isMobile,
}: {
  playlists: any[];
  onSelectPlaylist: (p: any) => void;
  isMobile: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : playlists.length === 1 ? "1fr" : "1fr 1fr",
        gap: "16px",
        animation: "fadeIn 0.3s ease",
      }}
    >
      {playlists.map((pl) => (
        <PlaylistCard
          key={pl.id}
          playlist={pl}
          onClick={() => onSelectPlaylist(pl)}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}
