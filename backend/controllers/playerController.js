const Player = require("../models/Player");

// Improved rating: performance per match
const calculateRating = (goals, assists, matchesPlayed) => {
  if (matchesPlayed === 0) return 0;

  let rating = ((goals + assists) / matchesPlayed) * 10;

  if (rating > 10) rating = 10;

  return Number(rating.toFixed(1));
};

const calculateMarketValue = (goals, assists, matchesPlayed) => {
  return (
    100000 +
    goals * 50000 +
    assists * 30000 +
    matchesPlayed * 10000
  );
};

exports.createPlayer = async (req, res) => {
  try {
    const { name, age, position, matchesPlayed, goals, assists } = req.body;

    const goalsNum = Number(goals) || 0;
    const assistsNum = Number(assists) || 0;
    const matchesNum = Number(matchesPlayed) || 0;

    const rating = calculateRating(goalsNum, assistsNum, matchesNum);
    const marketValue = calculateMarketValue(goalsNum, assistsNum, matchesNum);

    const player = new Player({
      name,
      age,
      position,
      matchesPlayed: matchesNum,
      goals: goalsNum,
      assists: assistsNum,
      rating,
      marketValue
    });

    const savedPlayer = await player.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ error: "Player not found" });
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const existingPlayer = await Player.findById(req.params.id);
    if (!existingPlayer)
      return res.status(404).json({ error: "Player not found" });

    const { matchesPlayed, goals, assists } = req.body;

    const goalsNum =
      goals !== undefined ? Number(goals) : existingPlayer.goals;

    const assistsNum =
      assists !== undefined ? Number(assists) : existingPlayer.assists;

    const matchesNum =
      matchesPlayed !== undefined
        ? Number(matchesPlayed)
        : existingPlayer.matchesPlayed;

    const rating = calculateRating(goalsNum, assistsNum, matchesNum);
    const marketValue = calculateMarketValue(
      goalsNum,
      assistsNum,
      matchesNum
    );

    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        goals: goalsNum,
        assists: assistsNum,
        matchesPlayed: matchesNum,
        rating,
        marketValue
      },
      { new: true }
    );

    res.json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const deleted = await Player.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Player not found" });

    res.json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};