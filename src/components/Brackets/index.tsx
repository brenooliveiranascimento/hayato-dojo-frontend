import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  Bracket,
  Seed,
  SeedItem,
  SeedTeam,
  type ISeedProps,
} from "react-brackets";
import { getKeys, type BracketGroup } from "../../services/students.service";
import logo from "../../assets/logo.png";
import { AlertCircle, Lock } from "lucide-react";
import { useAuthStore } from "../../store/auth.store";
import { Navigate, useNavigate } from "react-router-dom";

interface CustomSeeds {
  seed: ISeedProps & { dojo?: string };
  breakpoint: number;
}

const CustomSeed = ({ seed, breakpoint }: CustomSeeds) => {
  const getTeamStyle = (teamName: string | undefined, index: number) => {
    const backgroundColor = index % 2 !== 0 ? "#4A90E2" : "#D9534F";
    if (teamName === "Sem competidor") {
      return {
        color: "#E6E7EB",
        fontStyle: "italic",
        backgroundColor,
        minHeight: 30,
        textAlign: "start",
      };
    }
    return {
      fontWeight: "bold",
      backgroundColor,
      minHeight: 30,
      textAlign: "start",
    };
  };

  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <span className="text-[15px]">{seed.teams[0]?.dojo ?? ""}</span>
      <SeedItem>
        <div>
          <SeedTeam style={getTeamStyle(seed.teams[0]?.name, 0)}>
            {seed.teams[0]?.atletaId || ""} - {seed.teams[0]?.name || ""}
          </SeedTeam>
          <div style={{ height: 1, backgroundColor: "#ddd" }}></div>
          <SeedTeam style={getTeamStyle(seed.teams[1]?.name, 1)}>
            {seed.teams[1]?.atletaId || ""} - {seed.teams[1]?.name || ""}
          </SeedTeam>
        </div>
      </SeedItem>
      <span className="text-[15px]">{seed.teams[1]?.dojo ?? ""}</span>
    </Seed>
  );
};

const KarateBracketsFINAL = () => {
  const [kumiteBrackets, setKumiteBrackets] = useState<BracketGroup[]>([]);
  const [kataBrackets, setKataBrackets] = useState<BracketGroup[]>([]);
  const [selectedType, setSelectedType] = useState("kumite");

  const [allowed, setAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const { token } = useAuthStore();

  const handleCheckPassword = () => {
    if (password === "hayatoDojo321") {
      setPasswordError(false);
      setAllowed(true);
    } else {
      setPasswordError(true);
    }
  };

  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryFn: () => getKeys(),
    queryKey: ["keys"],
  });
  useEffect(() => {
    if (data?.kumite) {
      setKumiteBrackets(data?.kumite);
    }
    if (data?.kata) {
      setKataBrackets(data?.kata);
    }
  }, [data]);

  if (!token) {
    return <Navigate to={"/"} />;
  }

  if (!allowed) {
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
              Acesse o chaveamento dos competidores
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div className="space-y-6">
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
                    placeholder="Digite a senha de acesso"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              {/* Error Message */}
              {passwordError && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm font-medium">Senha incorreta</p>
                </div>
              )}

              <button
                type="submit"
                onClick={handleCheckPassword}
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Entrar
              </button>

              <button
                type="submit"
                onClick={() => {
                  navigate("/");
                }}
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium   hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Carregando brackets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-500">Erro ao buscar participantes</div>
      </div>
    );
  }

  const currentBrackets =
    selectedType === "kumite" ? kumiteBrackets : kataBrackets;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          II CAMPEONATO JESUÍNO COUTINHO DOJO HAYATO
        </h1>

        {/* Seletor de tipo */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setSelectedType("kumite")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
              selectedType === "kumite"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Kumite
          </button>
          <button
            onClick={() => setSelectedType("kata")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
              selectedType === "kata"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Kata
          </button>
        </div>

        {currentBrackets?.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Nenhuma categoria disponível para {selectedType}
          </div>
        ) : (
          currentBrackets?.map((bracket, index) => (
            <div
              key={index}
              className="mb-12 bg-white rounded-lg shadow-lg p-6"
            >
              <div className="mb-6 text-center ">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedType} Código: {bracket.categoriaInfo.categoria}
                </h2>
                <div className="flex justify-center space-x-6 text-gray-600">
                  <span>
                    <strong>Gênero:</strong>{" "}
                    {bracket.categoriaInfo.genero === "M"
                      ? "Masculino"
                      : "Feminino"}
                  </span>
                  <span>
                    <strong>Faixa:</strong> {bracket.categoriaInfo.faixa}
                  </span>
                  {bracket.categoriaInfo.peso && (
                    <span>
                      <strong>Peso:</strong> {bracket.categoriaInfo.peso}
                    </span>
                  )}
                  <span>
                    <strong>Total de Atletas:</strong>{" "}
                    {bracket.categoriaInfo.totalAtletas}
                  </span>
                </div>
              </div>

              {/* Bracket */}
              <div className="overflow-x-auto flex-row flex items-center justify-between">
                <Bracket
                  rounds={bracket.rounds}
                  renderSeedComponent={CustomSeed}
                  roundTitleComponent={(title) => (
                    <div className="text-center font-bold text-lg mb-4 text-gray-700">
                      {title}
                    </div>
                  )}
                />
                <div className="flex flex-col  rounded-2xl">
                  <h3 className="mt-5">
                    <strong>1º lugar</strong>
                  </h3>
                  <div className="border-b-2 w-[300px] h-7 "></div>

                  <h3 className="mt-5">
                    <strong>2º lugar</strong>
                  </h3>
                  <div className="border-b-2 w-[300px] h-7 "></div>

                  <h3 className="mt-5">
                    <strong>3º lugar</strong>
                  </h3>
                  <div className="border-b-2 w-[300px] h-7 "></div>
                </div>
              </div>
              <span className="text-gray-500 text-[13px]">
                Desenvolvido por Breno Nascimento. (77988871958)
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KarateBracketsFINAL;
