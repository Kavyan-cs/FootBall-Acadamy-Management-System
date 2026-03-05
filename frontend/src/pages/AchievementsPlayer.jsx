import { useEffect, useState } from "react";
import axios from "axios";

const AchievementsPlayer = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/players");
      setPlayers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const topScorer = players.reduce(
    (max, p) => (p.goals > (max?.goals || 0) ? p : max),
    null
  );

  const bestRated = players.reduce(
    (max, p) => (p.rating > (max?.rating || 0) ? p : max),
    null
  );

  const mostValuable = players.reduce(
    (max, p) => (p.marketValue > (max?.marketValue || 0) ? p : max),
    null
  );

  const mostAssists = players.reduce(
    (max, p) => (p.assists > (max?.assists || 0) ? p : max),
    null
  );

  // 🔥 CLUB TROPHIES (Static for now – frontend only)
  const trophies = {
    leagueTitles: 3,
    championsLeague: 1,
    domesticCups: 4,
  };

  const totalTrophies =
    trophies.leagueTitles +
    trophies.championsLeague +
    trophies.domesticCups;

  const awards = [
    { title: "Top Scorer", player: topScorer, stat: "Goals", value: topScorer?.goals },
    { title: "Best Rated Player", player: bestRated, stat: "Rating", value: bestRated?.rating },
    { title: "Most Valuable Player", player: mostValuable, stat: "Market Value", value: `€${mostValuable?.marketValue}M` },
    { title: "Most Assists", player: mostAssists, stat: "Assists", value: mostAssists?.assists },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-10 text-white">

      <h1 className="text-4xl font-bold text-purple-400 mb-10">
        Club Achievements
      </h1>

      {/* 🏆 Trophy Section */}
      <div className="card bg-gray-800 shadow-xl mb-10">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">
            Club Trophies
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-lg font-semibold">League Titles</p>
              <p className="text-3xl font-bold text-indigo-400">
                {trophies.leagueTitles}
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold">Champions League</p>
              <p className="text-3xl font-bold text-indigo-400">
                {trophies.championsLeague}
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold">Domestic Cups</p>
              <p className="text-3xl font-bold text-indigo-400">
                {trophies.domesticCups}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xl font-bold text-purple-300">
              Total Trophies: {totalTrophies}
            </p>
          </div>
        </div>
      </div>

      {/* 🏅 Player Awards */}
      <h2 className="text-3xl font-bold text-purple-400 mb-6">
        Player Awards
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {awards.map((award, index) => (
          <div key={index} className="card bg-gray-800 shadow-xl">
            <div className="card-body">
              <h3 className="text-xl font-bold text-purple-400 mb-3">
                {award.title}
              </h3>

              {award.player ? (
                <>
                  <p className="text-2xl font-bold">
                    {award.player.name}
                  </p>
                  <p>
                    {award.stat}: {award.value}
                  </p>
                </>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AchievementsPlayer;