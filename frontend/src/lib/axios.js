import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000"
   baseURL: "https://football-acadamy-management-system.onrender.com",
});

export default api;
