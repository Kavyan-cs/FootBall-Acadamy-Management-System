const PlayerModal = ({ player, onClose }) => {
  if (!player) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-xl mb-4">{player.name}</h3>

        <p>Age: {player.age}</p>
        <p>Position: {player.position}</p>
        <p>Matches Played: {player.matchesPlayed}</p>
        <p>Goals: {player.goals}</p>
        <p>Assists: {player.assists}</p>
        <p>Rating: {player.rating}</p>
        <p>Market Value: {player.marketValue}</p>

        <div className="modal-action">
          <button onClick={onClose} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;