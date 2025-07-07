import { api } from "../api/axios";

export interface userData {
  email: string;
  nome: string;
  cidade: string;
  senha: string;
}

export interface Dojo {
  id: 1;
  nome: string;
  cidade: string;
  email: string;
}

export interface RegisterResponse {
  message: string;
  token: string;
  dojo: Dojo;
}

export const register = async (
  userData: userData
): Promise<RegisterResponse> => {
  const { data } = await api.post("/dojos", userData);

  return data;
};
