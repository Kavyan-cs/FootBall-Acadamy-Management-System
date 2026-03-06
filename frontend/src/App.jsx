import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PlayersPage from "./pages/PlayersPage";
import AchievementsPlayer from "./pages/AchievementsPlayer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div data-theme="dracula" className="min-h-screen bg-base-200">
      
      <Navbar />

      <Toaster position="top-right" />

      <div className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players element={<PlayersPage />} />
          <Route path="/achievements" element={<AchievementsPlayer />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
