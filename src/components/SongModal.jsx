function extractYouTubeID(url) {
  const regExp =
    /(?:youtube\.com.*(?:\?v=|\/embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function SongModal({ url, onClose }) {
  const videoId = extractYouTubeID(url);
  if (!videoId) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default SongModal;
