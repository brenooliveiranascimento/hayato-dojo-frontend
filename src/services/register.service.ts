import { api } from "../api/axios";

export interface userData {
  email: string;
  nome: string;
  cidade: string;
  senha: string;
}

export interface RegiterDojoResponse {
  message: string;
  dojo: {
    nome: string;
    cidade: string;
    email: string;
    id: number;
    criadoEm: Date;
    atualizadoEm: Date;
  };
}

export const register = async (userData: userData) => {
  const { data } = await api.post("/dojos", userData);

  return data;
};
