import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000"
   baseURL: "https://football-acadamy-management-system.onrender.com",
  // https://football-acadamy-management-system.onrender.com/api/players
});

export default api;
