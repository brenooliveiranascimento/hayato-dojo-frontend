/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent, getDojoStudents } from "../services/students.service";
import logo from "../assets/logo.png";
import {
  User,
  Calendar,
  Weight,
  Award,
  Target,
  Plus,
  AlertCircle,
  Loader2,
  Users,
  CheckCircle,
  Search,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import { toast } from "react-toastify";
import categoriesDocx from "../assets/II-CAMPEONATO-JESUINO-COUTINHO-categorias.pdf";
import { useNavigate } from "react-router-dom";
import TechniciansManager from "./TechnichsManeger";
import Footer from "./Footer";
import { StudentRow } from "./StudentRow";
import DojoWhatsAppList from "./DojoWhatsappList";
export type Student = {
  id: number;
  nome: string;
  idade: number;
  peso: string;
  kyu: string;
  categoria: number;
  categoriaKata: number;
  dan?: number;
};

const initialValues = {
  nome: "",
  idade: 0,
  peso: "",
  kyu: "",
  categoria: 0,
  dan: undefined,
  categoriaKata: 0,
};

export default function ManageStudents() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { logout, dojo } = useAuthStore();
  const navigate = useNavigate();

  const {
    data: students,
    isLoading: qLoading,
    isError: qError,
  } = useQuery({
    queryKey: ["alunos"],
    queryFn: () => {
      return getDojoStudents();
    },
  });

  if (qError) {
    toast.error("Ocorreu um erro inesperado, logue novamente");
    logout();
    navigate("/");
  }

  const [form, setForm] = useState<Omit<Student, "id">>(initialValues);

  // Função para validar se o formulário está completo
  const isFormValid = () => {
    return (
      form.nome.trim() !== "" &&
      form.idade > 0 &&
      form.peso.trim() !== "" &&
      Boolean(form.categoria || form.categoriaKata) &&
      (form.kyu.trim() !== "" || (form.dan !== undefined && form.dan > 0))
    );
  };

  const openCategoriesDoc = () => {
    window.open(categoriesDocx, "_blank");
  };
  const createMutation = useMutation({
    onSuccess: () => {
      setIsLoading(false);
      queryClient.invalidateQueries({
        queryKey: ["alunos"],
      });
      setForm(initialValues);
    },
    mutationFn: (student: Omit<Student, "id">) => {
      setIsLoading(true);
      return createStudent({
        ...student,
        peso: student.peso.replace(",", "."),
      });
    },
    onError: (error: any) => {
      toast.error(error.response.data.error);
      setIsLoading(false);
    },
  });

  const filteredStudents = students?.filter((student) =>
    student.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para lidar com mudanças no campo Kyu
  const handleKyuChange = (value: string) => {
    setForm((f) => ({
      ...f,
      kyu: value,
      dan: value.trim() !== "" ? undefined : f.dan, // Limpa dan se kyu for preenchido
    }));
  };

  // Função para lidar com mudanças no campo Dan
  const handleDanChange = (value: string) => {
    const danValue = value.trim() !== "" ? Number(value) : undefined;
    setForm((f) => ({
      ...f,
      dan: danValue,
      kyu: danValue ? "" : f.kyu, // Limpa kyu se dan for preenchido
    }));
  };

  const handleLogout = () => {
    queryClient.invalidateQueries();

    queryClient.clear();

    logout();
  };

  const handlePesoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove todos os caracteres que não sejam números, vírgula ou ponto
    value = value.replace(/[^0-9.,]/g, "");

    // Substitui vírgula por ponto para padronizar
    value = value.replace(",", ".");

    // Garante que só existe um ponto decimal
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    // Limita a 2 casas decimais
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + "." + parts[1].substring(0, 2);
    }

    // Atualiza o form apenas se o valor for válido ou vazio
    if (value === "" || !isNaN(parseFloat(value))) {
      setForm((f) => ({ ...f, peso: value }));
    }
  };

  if (qLoading) return <p>Carregando alunos...</p>;
  if (qError) return <p>Erro ao carregar alunos</p>;

  return (
    <>
      <header className="bg-white shadow-lg border-b border-red-100 relative">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={logo}
                alt="Logo do Dojo"
                className="h-12 w-12 rounded-full shadow-md"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {dojo?.nome || "Dojo"}
                </h1>
                <p className="text-sm text-gray-600">Seja bem vindo</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4 pt-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center">
            <div className="mx-auto mb-6">
              <img
                src={logo}
                alt="Logo do Dojo"
                className="h-16 w-auto mx-auto mb-4 drop-shadow-lg rounded-full"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gerenciamento de atletas
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Gerencie os atletas para a II CAMPEONATO JESUÍNO COUTINHO
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-red-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Meus atletas Cadastrados ({students?.length})
                    </h2>
                  </div>

                  <div className="relative w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Buscar aluno..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate("/chaves");
                  }}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer mb-2 cursor-pointer mb-6"
                >
                  <span className="text-center">
                    VER CHAVEAMENTO DE ATLETAS
                  </span>
                </button>
                <div className="space-y-4">
                  {filteredStudents?.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        {searchTerm
                          ? "Nenhum aluno encontrado"
                          : "Nenhum aluno cadastrado"}
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full table-auto">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nome
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Idade
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Peso
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Kyu
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Dan
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Categoria Shiai
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Categoria Kata
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ações
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredStudents?.map((student) => {
                            return <StudentRow student={student} />;
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
              <div className="max-w-4xl mx-auto mt-6">
                <TechniciansManager />
                <DojoWhatsAppList />
              </div>
            </div>

            {/* Formulário de Cadastro */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Plus className="h-6 w-6 text-red-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cadastrar Novo Aluno
                  </h2>
                </div>
                {!isFormValid() && (
                  <div className="text-xs text-gray-500 bg-yellow-50 p-3 rounded-lg">
                    <strong>Campos obrigatórios:</strong> Preencha todos os
                    campos marcados com * e pelo menos uma graduação (Kyu ou
                    Dan) e uma categoria.
                  </div>
                )}
                <div className="space-y-4 mt-6">
                  {/* Nome */}
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="nome"
                        type="text"
                        placeholder="Digite o nome completo"
                        value={form.nome}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, nome: e.target.value }))
                        }
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Idade */}
                  <div>
                    <label
                      htmlFor="idade"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Idade *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="idade"
                        type="number"
                        placeholder="Idade"
                        value={form.idade || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          setForm((f) => ({ ...f, idade: value }));
                        }}
                        required
                        min="1"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Peso */}
                  <div>
                    <label
                      htmlFor="peso"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Peso *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Weight className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="peso"
                        type="text"
                        placeholder="Ex: 70,5 ou 70.5"
                        value={form.peso}
                        onChange={handlePesoChange}
                        onBlur={(e) => {
                          // Remove ponto final se existir
                          let value = e.target.value;
                          if (value.endsWith(".")) {
                            value = value.slice(0, -1);
                            setForm((f) => ({ ...f, peso: value }));
                          }
                        }}
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Kyu */}
                  <div>
                    <label
                      htmlFor="kyu"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Graduação (Kyu) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Award className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="kyu"
                        type="text"
                        placeholder="Ex: 1º Kyu"
                        value={form.kyu}
                        onChange={(e) => {
                          if (isNaN(Number(e.target.value))) return;
                          handleKyuChange(e.target.value);
                        }}
                        disabled={form.dan !== undefined && form.dan > 0}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    {form.dan !== undefined && form.dan > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Desabilitado porque Dan foi preenchido
                      </p>
                    )}
                  </div>

                  {/* Dan */}
                  <div>
                    <label
                      htmlFor="dan"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Dan (Graduação Faixa Preta) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Award className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="dan"
                        type="number"
                        placeholder="Ex: 1 (para 1º Dan)"
                        value={form.dan || ""}
                        onChange={(e) => handleDanChange(e.target.value)}
                        disabled={form.kyu.trim() !== ""}
                        min="1"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    {form.kyu.trim() !== "" && (
                      <p className="text-xs text-gray-500 mt-1">
                        Desabilitado porque Kyu foi preenchido
                      </p>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                    <strong>Nota:</strong> Preencha apenas Kyu OU Dan, não
                    ambos. Kyu é para graduações coloridas, Dan é para faixas
                    pretas.
                  </div>

                  <div>
                    <button
                      onClick={openCategoriesDoc}
                      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer mb-2"
                    >
                      <span className="text-center">
                        Ver lista de Categorias e regulamento
                      </span>
                    </button>
                    <label
                      htmlFor="categoria"
                      className="text-sm font-medium text-gray-700 mb-2"
                    >
                      Categoria Shiai (Luta)
                    </label>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Target className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="categoria"
                        type="number"
                        placeholder="Categoria"
                        value={form.categoria || ""}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            categoria: parseInt(e.target.value) || 0,
                          }))
                        }
                        required
                        min="1"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="categoria"
                      className="text-sm font-medium text-gray-700 mb-2"
                    >
                      Categoria Kata
                    </label>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Target className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="categoria"
                        type="number"
                        placeholder="Categoria"
                        value={form.categoriaKata || ""}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            categoriaKata: parseInt(e.target.value) || 0,
                          }))
                        }
                        required
                        min="1"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm"
                      />
                    </div>

                    <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg mt-3">
                      <strong>Nota:</strong> O atleta deve estar em pelo menos
                      uma modalidade!
                    </div>
                  </div>

                  {/* Error Message */}
                  {createMutation.isError && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-sm font-medium">
                        Falha ao cadastrar atleta, tente novamente ou entre em
                        contato conosco
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    onClick={() => createMutation.mutate(form)}
                    disabled={isLoading || !isFormValid()}
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Cadastrando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Cadastrar Atleta
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-5">
                  Enfrenta problemas?{" "}
                  <a
                    href="https://api.whatsapp.com/send?phone=%205577988871958&text=Preciso+de+apoio+ao+cadastrar+atletas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-red-600 hover:text-red-500 transition-colors"
                  >
                    Entre em contato conosco
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
