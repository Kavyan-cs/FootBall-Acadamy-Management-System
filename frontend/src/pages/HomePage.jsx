import { useEffect, useState } from "react";
import axios from "axios"; // use axios directly

const HomePage = () => {
  const [players, setPlayers] = useState([]);

  const BACKEND_URL = "https://football-backend-1of8.onrender.com"; // Add backend URL here

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/players`);
      setPlayers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ====== CALCULATIONS ======
  const totalPlayers = players.length;

  const totalMarketValue = players.reduce(
    (sum, player) => sum + (player.marketValue || 0),
    0
  );

  const avgRating =
    totalPlayers > 0
      ? (
          players.reduce((sum, player) => sum + (player.rating || 0), 0) /
          totalPlayers
        ).toFixed(2)
      : 0;

  // ===== SORT PLAYERS BY PERFORMANCE =====
  const sortPlayers = (position) => {
    return players
      .filter((p) => p.position === position)
      .sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        if (b.goals !== a.goals) return b.goals - a.goals;
        return b.assists - a.assists;
      });
  };

  // ===== GET BEST PLAYERS =====
  const getBestPlayer = (position) => {
    return sortPlayers(position)[0];
  };

  const getTopTwoPlayers = (position) => {
    return sortPlayers(position).slice(0, 2);
  };

  const cbPlayers = getTopTwoPlayers("CB");
  const cmPlayers = getTopTwoPlayers("CM");

  // ===== PLAYER CARD =====
  const PlayerCard = ({ player }) => {
    if (!player) {
      return (
        <div className="bg-gray-700 p-3 rounded-lg w-28 text-center">
          Empty
        </div>
      );
    }

    return (
      <div className="bg-green-700 p-3 rounded-lg shadow-lg w-28 text-center hover:scale-105 transition duration-300">
        <p className="font-bold">{player.name}</p>
        <p className="text-sm">⭐ {player.rating}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-10 text-white">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-purple-400 mb-10">
        Football Academy Dashboard
      </h1>

      {/* TOP STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">

        <div className="card bg-gray-800 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-lg text-gray-400">Total Players</h2>
            <p className="text-3xl font-bold text-primary">{totalPlayers}</p>
          </div>
        </div>

        <div className="card bg-gray-800 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-lg text-gray-400">Total Market Value</h2>
            <p className="text-3xl font-bold text-secondary">
              €{totalMarketValue}
            </p>
          </div>
        </div>

        <div className="card bg-gray-800 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-lg text-gray-400">Average Team Rating</h2>
            <p className="text-3xl font-bold text-accent">{avgRating}</p>
          </div>
        </div>

      </div>

      {/* FORMATION */}
      <div className="card bg-gray-800 shadow-xl">
        <div className="card-body">

          <h2 className="text-2xl font-bold text-purple-400 mb-2 text-center">
            Academy Starting XI
          </h2>

          <p className="text-center text-gray-400 mb-8">
            Formation: 4-3-3
          </p>

          <div className="flex flex-col items-center gap-8">

            {/* ST */}
            <PlayerCard player={getBestPlayer("ST")} />

            {/* LW RW */}
            <div className="flex gap-20">
              <PlayerCard player={getBestPlayer("LW")} />
              <PlayerCard player={getBestPlayer("RW")} />
            </div>

            {/* CAM */}
            <PlayerCard player={getBestPlayer("CAM")} />

            {/* CM CM */}
            <div className="flex gap-20">
              <PlayerCard player={cmPlayers[0]} />
              <PlayerCard player={cmPlayers[1]} />
            </div>

            {/* DEFENSE */}
            <div className="flex gap-10">
              <PlayerCard player={getBestPlayer("LB")} />
              <PlayerCard player={cbPlayers[0]} />
              <PlayerCard player={cbPlayers[1]} />
              <PlayerCard player={getBestPlayer("RB")} />
            </div>

            {/* GK */}
            <PlayerCard player={getBestPlayer("GK")} />

          </div>

        </div>
      </div>

    </div>
  );
};

export default HomePage;
