import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";
import { getKeys, type BracketGroup } from "../../services/students.service";

// Componente customizado para renderizar cada seed
const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
  const getTeamStyle = (teamName, index) => {
    const backgroundColor =
      index % 2 !== 0
        ? "#4A90E2" // azul médio
        : "#D9534F"; // vermelho carmesim

    if (teamName === "Sem competidor") {
      return { color: "#E6E7EB", fontStyle: "italic", backgroundColor };
    }
    // if (teamName === "TBD") {
    //   return { color: "#E6E7EB", backgroundColor };
    // }
    return {
      fontWeight: "bold",
      backgroundColor,
    };
  };

  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam style={getTeamStyle(seed.teams[0]?.name, 0)}>
            {seed.teams[0]?.name || "____________"}
          </SeedTeam>
          <div style={{ height: 1, backgroundColor: "#ddd" }}></div>
          <SeedTeam style={getTeamStyle(seed.teams[1]?.name, 1)}>
            {seed.teams[1]?.name || "____________"}
          </SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

// Componente principal
const KarateBracketsFINAL = () => {
  const [kumiteBrackets, setKumiteBrackets] = useState<BracketGroup[]>([]);
  const [kataBrackets, setKataBrackets] = useState<BracketGroup[]>([]);
  const [selectedType, setSelectedType] = useState("kumite");

  // Simulação de dados para demonstração
  // useEffect(() => {
  //   // Simular chamada à API

  //   // Simular delay de carregamento
  //   setTimeout(() => {
  //     setKumiteBrackets(mockData.kumite);
  //     setKataBrackets(mockData.kata);
  //     setLoading(false);
  //   }, 1000);

  //   // Código real para chamar a API:
  //   /*
  //   const fetchBrackets = async () => {
  //     try {
  //       const response = await fetch('/api/brackets', {
  //         headers: {
  //           'Authorization': 'seu-token-aqui'
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error('Erro ao buscar dados');
  //       }

  //       const data = await response.json();
  //       setKumiteBrackets(data.kumite);
  //       setKataBrackets(data.kata);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBrackets();
  //   */
  // }, []);

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
      setKumiteBrackets(data?.kata);
    }
    if (data?.kata) {
      setKataBrackets(data?.kumite);
    }
  }, [data]);

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
        <div className="text-xl text-red-500">Erro: {error}</div>
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
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              selectedType === "kumite"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Kumite (Luta)
          </button>
          <button
            onClick={() => setSelectedType("kata")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              selectedType === "kata"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Kata (Forma)
          </button>
        </div>

        {/* Brackets */}
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
              {/* Informações da categoria */}
              <div className="mb-6 text-center ">
                <h2 className="text-2xl font-bold mb-2">
                  {bracket.categoriaInfo.categoria}
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
                <div className="flex flex-col bg-red-50 p-2 rounded-2xl">
                  <h3 className="mt-5">
                    <strong>1º lugar</strong>
                  </h3>
                  <div className="border-2 w-[300px] h-7 rounded-2xl"></div>

                  <h3 className="mt-5">
                    <strong>2º lugar</strong>
                  </h3>
                  <div className="border-2 w-[300px] h-7 rounded-2xl"></div>

                  <h3 className="mt-5">
                    <strong>3º lugar</strong>
                  </h3>
                  <div className="border-2 w-[300px] h-7 rounded-2xl"></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KarateBracketsFINAL;
