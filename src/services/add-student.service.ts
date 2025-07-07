import { api } from "../api/axios";

export interface StudentData {
  nome: string;
  idade: string;
  peso: string;
  kyu: string;
  categoria: string;
}

export const registerStudent = async (userData: StudentData) => {
  const { data } = await api.post("/dojos", userData);

  return data;
};
