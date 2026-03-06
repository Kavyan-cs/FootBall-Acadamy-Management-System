const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors(
  {
    // origin:`http://localhost:5173`
    // origin:"*"
  }
));
app.use(express.json());

const playerRoutes = require("./routes/playerRoutes");
app.use("/api/players", playerRoutes);

app.get("/", (req, res) => {
  res.send("Football Academy API running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server running at: http://localhost:${PORT}/`);
});
