function extractYouTubeID(url) {
  const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function SongItem({ song, onPlay, onDelete }) {
  const videoId = extractYouTubeID(song.url);
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "https://via.placeholder.com/120x90?text=Sin+Imagen";

  return (
    <div className="song-item">
      <img
        src={thumbnail}
        alt={`Portada de ${song.name}`}
        style={{
          width: "120px",
          height: "90px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div style={{ flex: 1, marginLeft: "10px" }}>
        <h3>{song.name}</h3>
        <p>Reproducciones: {song.plays}</p>
        <button onClick={() => onPlay(song.id)}>▶Play</button>
        <button
          onClick={() => onDelete(song.id)}
          style={{ marginLeft: "5px", color: "red" }}
        >
          ❌ Eliminar
        </button>
      </div>
    </div>
  );
}

export default SongItem;
