import axios from "axios";

const api = axios.create({
  baseURL: "https://football-academy-management-system.onrender.com/api",
});

export default api;
