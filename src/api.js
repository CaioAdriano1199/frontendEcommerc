import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

api.interceptors.request.use((config) => {
  console.log("Fazendo requisição para:", config.url);
  return config;
}, (error) => {

  console.error("Erro na requisição:", error);
  return Promise.reject(error);
});


export default api;
