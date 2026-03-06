import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";

const PlayersPage = () => {
  const BACKEND_URL = "https://football-backend-1of8.onrender.com"; // backend URL

  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [editPlayer, setEditPlayer] = useState(null);
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);

  const positions = [
    "GK","RB","LB","CB","RWB","LWB",
    "CDM","CM","CAM",
    "RW","LW","RM","LM",
    "ST","CF"
  ];

  const [newPlayer, setNewPlayer] = useState({
    name: "",
    age: "",
    position: "",
    matchesPlayed: "",
    goals: "",
    assists: "",
  });

  const fetchPlayers = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/players`);
      setPlayers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this player?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/players/${id}`);
      toast.success("Player deleted successfully");
      fetchPlayers();
    } catch (error) {
      toast.error("Error deleting player");
    }
  };

  const handleUpdate = async () => {
    try {
      const matches = Number(editPlayer.matchesPlayed);
      const goals = Number(editPlayer.goals);
      const assists = Number(editPlayer.assists);

      let rating = 0;
      if (matches > 0) rating = ((goals*4 + assists*3)/matches).toFixed(1);
      if (rating > 10) rating = 10;

      const marketValue = rating * 5;

      const updatedPlayer = {
        ...editPlayer,
        age: Number(editPlayer.age),
        matchesPlayed: matches,
        goals,
        assists,
        rating: Number(rating),
        marketValue,
      };

      await axios.put(`${BACKEND_URL}/api/players/${editPlayer._id}`, updatedPlayer);
      toast.success("Player updated successfully");
      setEditPlayer(null);
      fetchPlayers();
    } catch (error) {
      toast.error("Error updating player");
    }
  };

  const handleAddPlayer = async () => {
    try {
      const matches = Number(newPlayer.matchesPlayed);
      const goals = Number(newPlayer.goals);
      const assists = Number(newPlayer.assists);

      let rating = 0;
      if (matches > 0) rating = ((goals*4 + assists*3)/matches).toFixed(1);
      if (rating > 10) rating = 10;

      const marketValue = rating * 5;

      const formattedPlayer = {
        name: newPlayer.name,
        age: Number(newPlayer.age),
        position: newPlayer.position,
        matchesPlayed: matches,
        goals,
        assists,
        rating: Number(rating),
        marketValue,
      };

      await axios.post(`${BACKEND_URL}/api/players`, formattedPlayer);
      toast.success("Player added successfully");
      setShowAddForm(false);
      setNewPlayer({
        name: "",
        age: "",
        position: "",
        matchesPlayed: "",
        goals: "",
        assists: "",
      });
      fetchPlayers();
    } catch (error) {
      toast.error("Error adding player");
    }
  };

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(search.toLowerCase());
    const matchesPosition = positionFilter === "All" || player.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-purple-400">Academy Players</h2>
        <button
          className="btn bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
          onClick={() => setShowAddForm(true)}
        >
          + Add Player
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search player..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/3 bg-gray-800 border-purple-500"
        />
        <select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          className="select select-bordered w-full md:w-1/4 bg-gray-800 border-purple-500"
        >
          <option value="All">All Positions</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
      </div>

      {/* PLAYER CARDS */}
      {filteredPlayers.length === 0 ? (
        <p className="text-gray-400">No players found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlayers.map((player) => (
            <div
              key={player._id}
              className="card bg-gray-800 shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition duration-300"
            >
              <div className="card-body">
                <h3 className="card-title text-indigo-400 text-xl">{player.name}</h3>
                <div className="space-y-1 text-sm mt-2">
                  <p>Position: {player.position}</p>
                  <p>Goals: {player.goals}</p>
                  <p>Rating: {player.rating}</p>
                  <p>Market Value: €{player.marketValue}M</p>
                </div>
                <div className="card-actions justify-end mt-4 gap-2">
                  <button className="btn btn-sm btn-info" onClick={() => setSelectedPlayer(player)}>View</button>
                  <button className="btn btn-sm btn-warning btn-circle" onClick={() => setEditPlayer(player)}><Pencil size={16} /></button>
                  <button className="btn btn-sm btn-error btn-circle" onClick={() => handleDelete(player._id)}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD PLAYER MODAL */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96 text-white">
            <h3 className="text-xl font-bold mb-4 text-purple-400">Add New Player</h3>

            <input
              type="text"
              placeholder="Name"
              value={newPlayer.name}
              onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="number"
              placeholder="Age"
              value={newPlayer.age}
              onChange={(e) => setNewPlayer({...newPlayer, age: e.target.value})}
              className="input input-bordered w-full mb-2"
            />
            <select
              value={newPlayer.position}
              onChange={(e) => setNewPlayer({...newPlayer, position: e.target.value})}
              className="select select-bordered w-full mb-2"
            >
              <option value="">Select Position</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Matches Played"
              value={newPlayer.matchesPlayed}
              onChange={(e) => setNewPlayer({...newPlayer, matchesPlayed: e.target.value})}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="number"
              placeholder="Goals"
              value={newPlayer.goals}
              onChange={(e) => setNewPlayer({...newPlayer, goals: e.target.value})}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="number"
              placeholder="Assists"
              value={newPlayer.assists}
              onChange={(e) => setNewPlayer({...newPlayer, assists: e.target.value})}
              className="input input-bordered w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button className="btn btn-success" onClick={handleAddPlayer}>Add Player</button>
              <button className="btn" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT & VIEW MODALS remain unchanged (if you have them already) */}

    </div>
  );
};

export default PlayersPage;
