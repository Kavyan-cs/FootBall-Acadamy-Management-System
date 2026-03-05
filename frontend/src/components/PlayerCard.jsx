const PlayerCard = ({ player, onView, onEdit, onDelete }) => {
  return (
    <div className="card bg-base-200 shadow-lg p-4">
      <h2 className="text-lg font-bold">{player.name}</h2>
      <p>{player.position}</p>
      <p>Goals: {player.goals}</p>
      <p>Rating: {player.rating}</p>

      <div className="flex gap-2 mt-3">

        <button onClick={() => onView(player)} className="btn btn-sm">
          View
        </button>

        <button onClick={() => onEdit(player)} className="btn btn-sm btn-warning">
          
        </button>

        <button onClick={() => onDelete(player._id)} className="btn btn-sm btn-error">
          
        </button>

      </div>
    </div>
  );
};

export default PlayerCard;