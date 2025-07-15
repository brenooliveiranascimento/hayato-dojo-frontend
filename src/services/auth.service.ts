import { api } from "../api/axios";

export interface userData {
  email: string;
  senha: string;
}

export interface Dojo {
  id: number;
  nome: string;
  cidade: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  dojo: Dojo;
}

export const auth = async (userData: userData) => {
  const { data } = await api.post("/login", userData);
  return data;
};
