import { api } from "../api/axios";
import type { Student } from "../components/ManageStudents";

export interface StudentResponse {
  id: number;
  nome: string;
  idade: number;
  categoria: number;
  peso: string;
  kyu: string;
  dan?: number;
  dojoId: number;
  criadoEm: string;
  atualizadoEm: string;
  categoriaKata: number;
}

interface StudentsResponse {
  alunos: StudentResponse[];
}

export const getAllStudents = async () => {
  const { data } = await api.get<StudentsResponse>("/alunos");
  return data;
};

export const getDojoStudents = async () => {
  const { data } = await api.get<StudentsResponse>("dojo/alunos");
  return data.alunos || [];
};

//
export interface Team {
  name: string;
  atletaId?: number;
}

export interface Seed {
  id: number;
  date: string;
  teams: Team[];
}

export interface Round {
  title: string;
  seeds: Seed[];
  dojo: string;
}

export interface CategoriaInfo {
  tipo: "kumite" | "kata";
  categoria: string;
  genero: string;
  faixa: string;
  peso?: string | null;
  totalAtletas: number;
}

export interface BracketGroup {
  categoriaInfo: CategoriaInfo;
  rounds: Round[];
}

export interface BracketsResponse {
  kumite: BracketGroup[];
  kata: BracketGroup[];
}

export const getKeys = async (): Promise<BracketsResponse> => {
  const { data } = await api.get<BracketsResponse>("api/brackets");
  return data;
};

export const createStudent = async (student: Omit<Student, "id">) => {
  await api.post("/alunos", student);
};

export const updateStudent = async (student: Student) => {
  await api.put(`/alunos/${student.id}`, student);
};

export const deleteStudent = async (id: number) => {
  await api.delete(`/alunos/${id}`);
};

export const addTecnic = async (tecnics: string) => {
  await api.post("/dojo/tecnics/add", { tecnics });
};

export const getTecnics = async () => {
  const { data } = await api.get<{ tecnics: string }>("/dojo/tecnics");
  return data;
};

type DojoWhatsAppResponse = {
  dojos: Array<{
    nome: string;
    mensagem: string;
    links: {
      whatsapp: string;
      whatsappApi: string;
    };
    totalAlunos: string;
  }>;
  totais: {
    alunos: number;
    dojosComAlunos: number;
  };
};

export const getDojoWhatsAppMessages =
  async (): Promise<DojoWhatsAppResponse> => {
    const { data } = await api.get("/dojo/alunos/message");

    return data;
  };
