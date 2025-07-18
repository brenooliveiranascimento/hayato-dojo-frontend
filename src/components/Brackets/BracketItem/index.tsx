import type { FC } from "react";
import type { BracketGroup } from "../../../services/students.service";
import { Bracket } from "react-brackets";
import { CustomSeed } from "../CustomSeed";

interface Props {
  bracket: BracketGroup;
  index: number;
  selectedType: string;
}

export const BracketItem: FC<Props> = ({ bracket, index, selectedType }) => {
  const bracketId = `bracket-${selectedType}-${index}`;

  return (
    <div
      id={bracketId}
      key={index}
      className="mb-12 bg-white rounded-lg shadow-lg p-8 w-full mx-auto"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">
          {selectedType.toUpperCase()} - Código:{" "}
          {bracket.categoriaInfo.categoria}
        </h2>
        <div className="flex justify-center space-x-6 text-gray-600">
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

      <div className="relative w-full">
        <div className="overflow-x-auto pb-32">
          <div className="inline-block min-w-full">
            <Bracket
              rounds={bracket.rounds}
              renderSeedComponent={CustomSeed}
              roundTitleComponent={(title) => (
                <div className="text-center font-bold text-lg mb-4 text-gray-700">
                  {title}
                </div>
              )}
            />
          </div>
        </div>

        <div className="absolute bottom-0 right-0 bg-white p-4 shadow-lg rounded-lg m-4">
          <h3 className="font-bold mb-2">Classificação Final</h3>

          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold text-gray-700">1º lugar</h4>
              <div className="border-b-2 border-gray-300 w-[200px] h-7"></div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700">2º lugar</h4>
              <div className="border-b-2 border-gray-300 w-[200px] h-7"></div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700">3º lugar</h4>
              <div className="border-b-2 border-gray-300 w-[200px] h-7"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 bg-white p-4 shadow-lg rounded-lg m-4">
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold text-gray-700">Koto:</h4>
              <div className="border-b-2 border-gray-300 w-[200px] h-7"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 pt-4 border-t border-gray-200">
        <span className="text-gray-500 text-xs">
          Desenvolvido por Breno Nascimento • Solicitar serviço para seu Dojo:
          (77) 98887-1958
        </span>
      </div>
    </div>
  );
};
