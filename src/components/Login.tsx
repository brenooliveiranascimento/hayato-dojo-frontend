import { useState } from "react";
import { Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api/axios";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);
  const setDojo = useAuthStore((state) => state.setDojo);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => {
      setLoading(true);
      return api.post("/login", { email, senha });
    },
    onError: () => {
      toast.error(
        "Erro ao realizar o login, caso persista entre em contato conosco"
      );
      setLoading(false);
    },
    onSuccess: (res) => {
      const { token, dojo } = res.data;
      setLoading(false);
      if (token) {
        setToken(token);
        setDojo(dojo);
        navigate("/students");
      } else {
        console.error("Token não recebido no login");
      }
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
            II CAMPEONATO JESUÍNO COUTINHO DOJO HAYATO
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Acesse sua conta para gerenciar seus atletas
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
            className="space-y-6"
          >
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
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Não tem dojo cadastrado?{" "}
              <a
                href="/dojos"
                className="font-medium text-red-600 hover:text-red-500 transition-colors"
              >
                Cadastre aqui
              </a>
            </p>

            <p className="text-sm text-gray-600 mt-5">
              Esqueceu sua senha ou enfrenta problemas?{" "}
              <a
                href="https://api.whatsapp.com/send?phone=%205577988871958&text=Preciso+de+apoio+ao+cadastrar+ao+realizar+o+login+da+minha+conta"
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
  );
}
