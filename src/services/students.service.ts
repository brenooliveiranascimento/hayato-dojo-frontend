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

export const createStudent = async (student: Omit<Student, "id">) => {
  await api.post("/alunos", student);
};

export const updateStudent = async (student: Student) => {
  await api.put(`/alunos/${student.id}`, student);
};

export const deleteStudent = async (id: number) => {
  await api.delete(`/alunos/${id}`);
};
