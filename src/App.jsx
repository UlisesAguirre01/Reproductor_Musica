import { useState, useEffect } from "react";
import AddSongForm from "./components/AddSongForm";
import SongList from "./components/SongList";

function App() {
  const [songs, setSongs] = useState([]);
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const savedSongs = JSON.parse(localStorage.getItem("songs")) || [];
    setSongs(savedSongs);
  }, []);

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const saveSongs = (newSongs) => {
    localStorage.setItem("songs", JSON.stringify(newSongs));
    setSongs(newSongs);
  };

  return (
    <div className="app-container">
      <div className="main-layout">
        <div className="sidebar">
          <button onClick={() => setDark(!dark)}>
            Cambiar a modo {dark ? "claro" : "oscuro"}
          </button>
          <h1>Reproductor de canciones</h1>
          <AddSongForm songs={songs} setSongs={saveSongs} />
        </div>
        <div className="song-list-container">
          <SongList songs={songs} setSongs={saveSongs} />
        </div>
      </div>
    </div>
  );
}

export default App;
