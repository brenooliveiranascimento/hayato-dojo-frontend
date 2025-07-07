import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../services/register.service";
import {
  Building2,
  MapPin,
  Mail,
  Lock,
  AlertCircle,
  Loader2,
  CheckCircle,
} from "lucide-react";
import logo from "../assets/logo.png";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterDojo() {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);
  const setDojo = useAuthStore((state) => state.setDojo);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => {
      setIsLoading(true);
      return register({
        cidade,
        email,
        nome,
        senha,
      });
    },
    onSuccess: (res) => {
      setIsLoading(false);
      const { token, dojo } = res;
      if (token) {
        setToken(token);
        setDojo(dojo);
        navigate("/students");
      } else {
        console.error("Token não recebido no login");
      }
    },
    onError: () => {
      toast.error(
        "Erro ao realizar o cadastro, caso persista entre em contato conosco"
      );
      setIsLoading(false);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-6">
            <img
              src={logo}
              alt="Logo do Dojo"
              className="h-20 w-auto mx-auto mb-4 drop-shadow-lg rounded-full"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Cadastrar Novo Dojo
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Registre seu dojo e comece a gerenciar seus alunos
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="space-y-6">
            {/* Nome do Dojo Input */}
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nome do Dojo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="nome"
                  type="text"
                  placeholder="Digite o nome do seu dojo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Cidade Input */}
            <div>
              <label
                htmlFor="cidade"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cidade
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="cidade"
                  type="text"
                  placeholder="Digite a cidade do dojo"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Error Message */}
            {mutation.error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm font-medium">
                  Algo deu errado, tente novamente ou entre em contato conosco
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              onClick={() => mutation.mutate()}
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Cadastrando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Cadastrar Dojo
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <a
                href="/login"
                className="font-medium text-red-600 hover:text-red-500 transition-colors"
              >
                Faça login aqui
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
