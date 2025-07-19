import type { FC } from "react";
import type { BracketGroup, Team } from "../../../services/students.service";
import { Bracket } from "react-brackets";
import { CustomSeed } from "../CustomSeed";

interface Props {
  bracket: BracketGroup;
  index: number;
  selectedType: string;
}

export const BracketItem: FC<Props> = ({ bracket, index, selectedType }) => {
  const bracketId = `bracket-${selectedType}-${index}`;

  // Função para extrair todos os atletas do bracket
  const getAllAthletes = (): Team[] => {
    const athletes: Team[] = [];

    // Percorre todas as rodadas e extrai os atletas
    bracket.rounds.forEach((round) => {
      round.seeds.forEach((seed) => {
        seed.teams.forEach((team) => {
          if (team && team.name && team.name !== "--- Sem competidor ---") {
            // Verifica se o atleta já não foi adicionado
            const exists = athletes.some(
              (athlete) => athlete.name === team.name
            );
            if (!exists) {
              athletes.push(team);
            }
          }
        });
      });
    });

    return athletes;
  };

  const athletes = getAllAthletes();

  // Componente para lista mobile
  const MobileAthletesList = () => (
    <div className="w-full">
      <h3 className="text-lg font-bold mb-4 text-center text-gray-700">
        Lista de Atletas
      </h3>
      <div className="mt-4">
        {athletes.map((athlete, idx) => (
          <div
            key={`${athlete.name}-${idx}`}
            className={`p-3 rounded-lg text-white font-bold ${
              idx % 2 === 0 ? "bg-red-500" : "bg-blue-500 mb-4"
            }`}
          >
            <div className="text-sm font-bold">{athlete.name}</div>
            {athlete.dojo && (
              <div className="text-xs opacity-90 ">Dojo: {athlete.dojo}</div>
            )}
            <div className="text-xs opacity-90 flex flex-wrap gap-2">
              {athlete.categoria && <span>Kumite: {athlete.categoria}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      id={bracketId}
      key={index}
      className={`mb-12 bg-white rounded-lg shadow-lg p-2 flex items-center flex-col content-center`}
    >
      <div className="text-center mt-4 pt-2 border-b border-gray-200 mb-2">
        <span className="text-gray-500 text-xs">
          Desenvolvido por Breno Nascimento • Solicitar serviço para seu Dojo:
          (77) 98887-1958
        </span>
      </div>
      <div className="mb-4 text-center print:mb-2">
        <h2 className="text-xl font-bold mb-1 print:text-lg">
          {selectedType.toUpperCase()} - Código:{" "}
          {bracket.categoriaInfo.categoria}
        </h2>
        <div className="flex justify-center space-x-4 text-sm text-gray-600 print:text-xs">
          <span>
            <strong>Gênero:</strong>{" "}
            {bracket.categoriaInfo.genero === "M" ? "Masculino" : "Feminino"}
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

      {/* Renderização condicional: Lista em mobile, Bracket em desktop */}
      <div className="relative w-full" style={{ minHeight: "150mm" }}>
        {/* Lista para mobile (visível apenas em telas pequenas) */}
        <div className="block md:hidden w-full px-4">
          <MobileAthletesList />
        </div>

        {/* Bracket tradicional para desktop (oculto em mobile) */}
        <div className="hidden md:block">
          <div className="overflow-x-auto pb-24 print:overflow-visible print:pb-20">
            <div
              className="w-full flex justify-center print:w-full"
              style={{
                transform: "scale(0.8)",
                transformOrigin: "top center",
              }}
            >
              <Bracket
                rounds={bracket.rounds}
                renderSeedComponent={CustomSeed}
                roundTitleComponent={(title) => (
                  <div className="text-center font-bold text-base mb-2 text-gray-700 print:text-sm print:mb-1">
                    {title}
                  </div>
                )}
              />
            </div>
          </div>

          <div
            className={`absolute ${
              bracket.categoriaInfo.totalAtletas >= 5 &&
              bracket.categoriaInfo.totalAtletas <= 8
                ? "bottom-0"
                : "bottom-70"
            } right-0 bg-white p-3 shadow-lg rounded-lg m-3 print:shadow-none print:border print:border-gray-400 print:p-2 print:m-2 mt-[-50]`}
          >
            <h3 className="font-bold mb-1 text-sm print:text-xs">
              Classificação Final
            </h3>

            <div className="space-y-2 print:space-y-1">
              <div>
                <h4 className="text-xs font-semibold text-gray-700">
                  1º lugar
                </h4>
                <div className="border-b-2 border-gray-300 w-[180px] h-5 print:border-gray-600"></div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-700">
                  2º lugar
                </h4>
                <div className="border-b-2 border-gray-300 w-[180px] h-5 print:border-gray-600"></div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-700">
                  3º lugar
                </h4>
                <div className="border-b-2 border-gray-300 w-[180px] h-5 print:border-gray-600"></div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-700">
                  3º lugar
                </h4>
                <div className="border-b-2 border-gray-300 w-[180px] h-5 print:border-gray-600"></div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-700 ">Koto:</h4>
                <div className="border-b-2 border-gray-300 w-[180px] h-5 print:border-gray-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
