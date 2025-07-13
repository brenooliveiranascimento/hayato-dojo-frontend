import axios from "axios";
import { useAuthStore } from "../store/auth.store";

export const api = axios.create({
  baseURL: "https://hayato-dojo-backend-production.up.railway.app",
  headers: { "Content-Type": "application/json" },
});

// adiciona token no header se existir
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers!["Authorization"] = `Bearer ${token}`;
  return config;
});
