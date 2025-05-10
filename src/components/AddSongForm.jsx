import { useState } from "react";

const isValidYouTubeUrl = (url) => {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
};

function AddSongForm({ songs, setSongs }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleAddSong = (e) => {
    e.preventDefault();

    if (!name.trim() || !url.trim()) {
      return setError("Todos los campos son obligatorios.");
    }

    if (!isValidYouTubeUrl(url)) {
      return setError("La URL no es válida o no es de YouTube.");
    }

    if (songs.some((song) => song.url === url)) {
      return setError("Esta canción ya fue agregada.");
    }

    const newSong = {
      name,
      url,
      plays: 0,
      id: crypto.randomUUID(),
    };

    const updatedSongs = [...songs, newSong];
    setSongs(updatedSongs);

    setName("");
    setUrl("");
    setError("");
  };

  return (
    <form onSubmit={handleAddSong}>
      <input
        type="text"
        placeholder="Nombre de la canción"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="URL de YouTube"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit">Agregar</button>
      {error && (
        <div
          style={{
            backgroundColor: "#ffcccc",
            color: "#a00",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          {error}
        </div>
      )}
    </form>
  );
}

export default AddSongForm;
