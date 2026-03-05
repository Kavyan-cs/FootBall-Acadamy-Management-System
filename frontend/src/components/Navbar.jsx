import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

function Navbar() {
  return (
    <nav style={{ padding: "15px", background: "black", color: "white" }}>
      <Link to="/" style={{ marginRight: "15px", color: "white" }}>Home</Link>
      <Link to="/players" style={{ marginRight: "15px", color: "white" }}>Players</Link>
      
      <Link to="/achievements" style={{ color: "white" }}>Achievements</Link>
    </nav>
  );
}

export default Navbar;