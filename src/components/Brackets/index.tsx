import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Download, Loader2 } from "lucide-react";
import { getKeys, type BracketGroup } from "../../services/students.service";
import { useAuthStore } from "../../store/auth.store";
import { Navigate } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { BracketItem } from "./BracketItem";

const KarateBracketsFINAL = () => {
  const [kumiteBrackets, setKumiteBrackets] = useState<BracketGroup[]>([]);
  const [kataBrackets, setKataBrackets] = useState<BracketGroup[]>([]);
  const [selectedType, setSelectedType] = useState("kumite");
  const [onlyMyDojo, setOnlyMyDojo] = useState(false);

  const { token, dojo } = useAuthStore();

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

  const totalCategories = kataBrackets.length + kumiteBrackets.length;

  const currentBrackets =
    selectedType === "kumite" ? kumiteBrackets : kataBrackets;

  const filteredBrackets = currentBrackets.filter(({ rounds }) => {
    if (!onlyMyDojo) return true;
    return rounds.some(({ seeds }) => {
      return seeds.some(({ teams }) => {
        return teams.some(({ dojo: currDojo }) => currDojo === dojo?.nome);
      });
    });
  });
  if (!token) {
    return <Navigate to={"/"} />;
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          II CAMPEONATO JESUÍNO COUTINHO DOJO HAYATO - Total de categorias:{" "}
          {totalCategories}
        </h1>

        <div className="flex flex-wrap justify-center mb-8 gap-4">
          <button
            onClick={() => setSelectedType("kumite")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
              selectedType === "kumite"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Kumite ({kumiteBrackets.length})
          </button>

          <button
            onClick={() => setSelectedType("kata")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
              selectedType === "kata"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Kata ({kataBrackets.length})
          </button>

          <button
            onClick={() => setOnlyMyDojo((prev) => !prev)}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
              onlyMyDojo
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Mostrar apenas chaves com meus atletas
          </button>
        </div>

        {filteredBrackets.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Nenhuma categoria disponível para {selectedType}
          </div>
        ) : (
          filteredBrackets.map((bracket, index) => (
            <BracketItem
              key={`${selectedType}-${index}`}
              bracket={bracket}
              index={index}
              selectedType={selectedType}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KarateBracketsFINAL;
