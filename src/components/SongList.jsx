import { useState } from "react";
import SongItem from "./SongItem";
import SongModal from "./SongModal";

function SongList({ songs, setSongs }) {
  const [search, setSearch] = useState("");
  const [sortByPlays, setSortByPlays] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);

  const handlePlay = (id) => {
    const updated = songs.map((song) =>
      song.id === id ? { ...song, plays: song.plays + 1 } : song
    );
    setSongs(updated);
    const song = updated.find((s) => s.id === id);
    setModalUrl(song.url);
  };

  const handleDelete = (id) => {
    const updated = songs.filter((song) => song.id !== id);
    setSongs(updated);
  };

  const filteredSongs = songs
    .filter((song) => song.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortByPlays ? b.plays - a.plays : 0));

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar canción..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setSortByPlays(!sortByPlays)}>
        Ordenar por reproducciones
      </button>

      {filteredSongs.map((song) => (
        <SongItem
          key={song.id}
          song={song}
          onPlay={handlePlay}
          onDelete={handleDelete}
        />
      ))}

      {modalUrl && (
        <SongModal url={modalUrl} onClose={() => setModalUrl(null)} />
      )}
    </div>
  );
}

export default SongList;
