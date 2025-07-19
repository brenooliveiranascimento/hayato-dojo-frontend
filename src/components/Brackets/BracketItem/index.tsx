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
      className={`mb-12 bg-white rounded-lg shadow-lg p-6 w-full`}
    >
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

      <div className="relative w-full" style={{ minHeight: "150mm" }}>
        <div className="overflow-x-auto pb-24 print:overflow-visible print:pb-20">
          <div
            className="inline-block min-w-full print:w-full"
            style={{
              transform: "scale(0.8)",
              transformOrigin: "top center",
              // "@media print": {
              //   transform: "scale(0.85)",
              // },
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

        <div className="absolute bottom-80 right-0 bg-white p-3 shadow-lg rounded-lg m-3 print:shadow-none print:border print:border-gray-400 print:p-2 print:m-2 mt-[-50]">
          <h3 className="font-bold mb-1 text-sm print:text-xs">
            Classificação Final
          </h3>

          <div className="space-y-2 print:space-y-1">
            <div>
              <h4 className="text-xs font-semibold text-gray-700">1º lugar</h4>
              <div className="border-b-2 border-gray-300 w-[180px] h-5 print:border-gray-600"></div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-700">2º lugar</h4>
              <div className="border-b-2 border-gray-300 w-[180px] h-5 print:border-gray-600"></div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-700">3º lugar</h4>
              <div className="border-b-2 border-gray-300 w-[180px] h-5 print:border-gray-600"></div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-700">3º lugar</h4>
              <div className="border-b-2 border-gray-300 w-[180px] h-5 print:border-gray-600"></div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-700 ">Koto:</h4>
              <div className="border-b-2 border-gray-300 w-[180px] h-5 print:border-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 pt-2 border-t border-gray-200 ">
        <span className="text-gray-500 text-xs print:text-[10px]">
          Desenvolvido por Breno Nascimento • Solicitar serviço para seu Dojo:
          (77) 98887-1958
        </span>
      </div>
    </div>
  );
};
