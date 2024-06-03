import axios from "axios";

const api = axios.create({
    baseURL: "https://api-estoque-adolfo.vercel.app"
});

export default api;