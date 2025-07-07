import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerStudent } from "../services/add-student.service";

type StudentInput = {
  nome: string;
  idade: string;
  peso: string;
  kyu: string;
  categoria: string;
};

export default function BatchRegisterStudents() {
  const [form, setForm] = useState<StudentInput>({
    nome: "",
    idade: "",
    peso: "",
    kyu: "",
    categoria: "",
  });
  const [lista, setLista] = useState<StudentInput[]>([]);

  const batchMutation = useMutation({
    onSuccess: () => {
      setLista([]);
      alert("Alunos cadastrados com sucesso!");
    },
    mutationFn: () => {
      return registerStudent(form);
    },
  });

  const addAluno = () => {
    setLista((prev) => [...prev, form]);
    setForm({ nome: "", idade: "", peso: "", kyu: "", categoria: "" });
  };

  return (
    <div>
      <h2>Cadastro de Alunos</h2>
      <input
        placeholder="Nome"
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
      />
      <input
        placeholder="Idade"
        value={form.idade}
        onChange={(e) => setForm({ ...form, idade: e.target.value })}
      />
      <input
        placeholder="Peso"
        value={form.peso}
        onChange={(e) => setForm({ ...form, peso: e.target.value })}
      />
      <input
        placeholder="Kyu"
        value={form.kyu}
        onChange={(e) => setForm({ ...form, kyu: e.target.value })}
      />
      <input
        placeholder="Categoria"
        value={form.categoria}
        onChange={(e) => setForm({ ...form, categoria: e.target.value })}
      />
      <button type="button" onClick={addAluno}>
        Adicionar à lista
      </button>

      {lista.length > 0 && (
        <>
          <h3>Pré-visualização:</h3>
          <ul>
            {lista.map((a, i) => (
              <li
                key={i}
              >{`${a.nome} - ${a.idade} anos - ${a.peso}kg - kyu ${a.kyu} - cat ${a.categoria}`}</li>
            ))}
          </ul>
          <button
          // onClick={() => batchMutation.mutate(lista)}
          >
            Enviar todos
          </button>
        </>
      )}
      {batchMutation.isError && <p>Erro ao cadastrar alunos</p>}
    </div>
  );
}
