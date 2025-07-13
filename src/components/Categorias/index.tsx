/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

const KarateBrackets = () => {
  const [activeTab, setActiveTab] = useState("kata");

  // Dados do campeonato com mais atletas
  const data = {
    brackets: {
      kata: [
        {
          codigoCategoria: "11",
          nomeCategoria: "SUB12/14 M 3° KYU ACIMA",
          atletas: [
            {
              id: 1,
              nome: "André Silva",
              idade: 12,
              categoria: 1,
              categoriaKata: 3,
              peso: "56.00",
              kyu: "1",
              dan: null,
              dojoId: 2,
            },
            {
              id: 101,
              nome: "Bruno Santos",
              idade: 13,
              categoria: 1,
              categoriaKata: 3,
              peso: "58.00",
              kyu: "2",
              dan: null,
              dojoId: 1,
            },
            {
              id: 102,
              nome: "Carlos Oliveira",
              idade: 12,
              categoria: 1,
              categoriaKata: 3,
              peso: "54.00",
              kyu: "3",
              dan: null,
              dojoId: 3,
            },
            {
              id: 103,
              nome: "Daniel Costa",
              idade: 14,
              categoria: 1,
              categoriaKata: 3,
              peso: "62.00",
              kyu: "1",
              dan: null,
              dojoId: 2,
            },
            {
              id: 104,
              nome: "Eduardo Lima",
              idade: 13,
              categoria: 1,
              categoriaKata: 3,
              peso: "57.00",
              kyu: "2",
              dan: null,
              dojoId: 1,
            },
            {
              id: 105,
              nome: "Felipe Rocha",
              idade: 12,
              categoria: 1,
              categoriaKata: 3,
              peso: "55.00",
              kyu: "3",
              dan: null,
              dojoId: 4,
            },
          ],
          totalAtletas: 6,
        },
        {
          codigoCategoria: "20",
          nomeCategoria: "CADETE/JUNIOR F 9° A 7° KYU",
          atletas: [
            {
              id: 4,
              nome: "Ana Maria",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "8",
              dan: null,
              dojoId: 2,
            },
            {
              id: 5,
              nome: "Beatriz Ferreira",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "9",
              dan: null,
              dojoId: 2,
            },
            {
              id: 106,
              nome: "Carolina Mendes",
              idade: 15,
              categoria: 2,
              categoriaKata: null,
              peso: "48.00",
              kyu: "7",
              dan: null,
              dojoId: 3,
            },
            {
              id: 107,
              nome: "Débora Alves",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "50.00",
              kyu: "8",
              dan: null,
              dojoId: 1,
            },
            {
              id: 108,
              nome: "Fernanda Torres",
              idade: 15,
              categoria: 2,
              categoriaKata: null,
              peso: "47.00",
              kyu: "9",
              dan: null,
              dojoId: 4,
            },
            {
              id: 109,
              nome: "Gabriela Reis",
              idade: 17,
              categoria: 2,
              categoriaKata: null,
              peso: "52.00",
              kyu: "7",
              dan: null,
              dojoId: 2,
            },
            {
              id: 110,
              nome: "Helena Souza",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "46.00",
              kyu: "8",
              dan: null,
              dojoId: 3,
            },
            {
              id: 111,
              nome: "Isabela Nunes",
              idade: 15,
              categoria: 2,
              categoriaKata: null,
              peso: "49.00",
              kyu: "9",
              dan: null,
              dojoId: 1,
            },
          ],
          totalAtletas: 8,
        },
        {
          codigoCategoria: "22",
          nomeCategoria: "CADETE/JUNIOR F 6° A 4° KYU",
          atletas: [
            {
              id: 2,
              nome: "Júlia Barbosa",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "24.00",
              kyu: "4",
              dan: null,
              dojoId: 2,
            },
            {
              id: 3,
              nome: "Larissa Martins",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "4",
              dan: null,
              dojoId: 2,
            },
            {
              id: 112,
              nome: "Mariana Campos",
              idade: 17,
              categoria: 2,
              categoriaKata: null,
              peso: "53.00",
              kyu: "5",
              dan: null,
              dojoId: 3,
            },
            {
              id: 113,
              nome: "Natália Gomes",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "51.00",
              kyu: "6",
              dan: null,
              dojoId: 1,
            },
            {
              id: 114,
              nome: "Patrícia Silva",
              idade: 17,
              categoria: 2,
              categoriaKata: null,
              peso: "48.00",
              kyu: "4",
              dan: null,
              dojoId: 4,
            },
          ],
          totalAtletas: 5,
        },
        {
          codigoCategoria: "24",
          nomeCategoria: "CADETE/JUNIOR F 3° KYU ACIMA",
          atletas: [
            {
              id: 6,
              nome: "Rafaela Santos",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "57.00",
              kyu: "3",
              dan: null,
              dojoId: 2,
            },
            {
              id: 7,
              nome: "Vitória Lima",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "80.00",
              kyu: "1",
              dan: null,
              dojoId: 2,
            },
            {
              id: 115,
              nome: "Amanda Costa",
              idade: 17,
              categoria: 2,
              categoriaKata: null,
              peso: "59.00",
              kyu: "2",
              dan: null,
              dojoId: 3,
            },
            {
              id: 116,
              nome: "Bianca Oliveira",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "61.00",
              kyu: "3",
              dan: null,
              dojoId: 1,
            },
            {
              id: 117,
              nome: "Camila Rocha",
              idade: 17,
              categoria: 2,
              categoriaKata: null,
              peso: "58.00",
              kyu: "1",
              dan: null,
              dojoId: 4,
            },
            {
              id: 118,
              nome: "Daniela Ferreira",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "62.00",
              kyu: "2",
              dan: null,
              dojoId: 2,
            },
            {
              id: 119,
              nome: "Eliana Mendes",
              idade: 17,
              categoria: 2,
              categoriaKata: null,
              peso: "60.00",
              kyu: "3",
              dan: null,
              dojoId: 3,
            },
          ],
          totalAtletas: 7,
        },
      ],
      kumite: [
        {
          codigoCategoria: "58",
          nomeCategoria: "JUNIOR F 9° A 6° KYU ATE 55Kg",
          atletas: [
            {
              id: 4,
              nome: "Ana Maria",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "8",
              dan: null,
              dojoId: 2,
            },
            {
              id: 5,
              nome: "Beatriz Ferreira",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "9",
              dan: null,
              dojoId: 2,
            },
            {
              id: 106,
              nome: "Carolina Mendes",
              idade: 15,
              categoria: 2,
              categoriaKata: null,
              peso: "48.00",
              kyu: "7",
              dan: null,
              dojoId: 3,
            },
            {
              id: 107,
              nome: "Débora Alves",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "50.00",
              kyu: "8",
              dan: null,
              dojoId: 1,
            },
            {
              id: 108,
              nome: "Fernanda Torres",
              idade: 15,
              categoria: 2,
              categoriaKata: null,
              peso: "47.00",
              kyu: "9",
              dan: null,
              dojoId: 4,
            },
            {
              id: 109,
              nome: "Gabriela Reis",
              idade: 17,
              categoria: 2,
              categoriaKata: null,
              peso: "52.00",
              kyu: "7",
              dan: null,
              dojoId: 2,
            },
          ],
          totalAtletas: 6,
        },
        {
          codigoCategoria: "60",
          nomeCategoria: "JUNIOR F 5° A 2° KYU ATE 55Kg",
          atletas: [
            {
              id: 2,
              nome: "Júlia Barbosa",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "24.00",
              kyu: "4",
              dan: null,
              dojoId: 2,
            },
            {
              id: 3,
              nome: "Larissa Martins",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "4",
              dan: null,
              dojoId: 2,
            },
            {
              id: 112,
              nome: "Mariana Campos",
              idade: 17,
              categoria: 2,
              categoriaKata: null,
              peso: "53.00",
              kyu: "5",
              dan: null,
              dojoId: 3,
            },
            {
              id: 113,
              nome: "Natália Gomes",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "51.00",
              kyu: "6",
              dan: null,
              dojoId: 1,
            },
            {
              id: 114,
              nome: "Patrícia Silva",
              idade: 17,
              categoria: 2,
              categoriaKata: null,
              peso: "48.00",
              kyu: "4",
              dan: null,
              dojoId: 4,
            },
            {
              id: 120,
              nome: "Roberta Alves",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "49.00",
              kyu: "5",
              dan: null,
              dojoId: 1,
            },
            {
              id: 121,
              nome: "Sabrina Costa",
              idade: 17,
              categoria: 2,
              categoriaKata: null,
              peso: "52.00",
              kyu: "3",
              dan: null,
              dojoId: 3,
            },
            {
              id: 122,
              nome: "Tatiana Reis",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "47.00",
              kyu: "4",
              dan: null,
              dojoId: 2,
            },
          ],
          totalAtletas: 8,
        },
        {
          codigoCategoria: "62",
          nomeCategoria: "JUNIOR F 5° A 2° KYU 55Kg ACIMA",
          atletas: [
            {
              id: 6,
              nome: "Rafaela Santos",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "57.00",
              kyu: "3",
              dan: null,
              dojoId: 2,
            },
            {
              id: 115,
              nome: "Amanda Costa",
              idade: 17,
              categoria: 2,
              categoriaKata: null,
              peso: "59.00",
              kyu: "2",
              dan: null,
              dojoId: 3,
            },
            {
              id: 116,
              nome: "Bianca Oliveira",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "61.00",
              kyu: "3",
              dan: null,
              dojoId: 1,
            },
            {
              id: 117,
              nome: "Camila Rocha",
              idade: 17,
              categoria: 2,
              categoriaKata: null,
              peso: "58.00",
              kyu: "1",
              dan: null,
              dojoId: 4,
            },
            {
              id: 118,
              nome: "Daniela Ferreira",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "62.00",
              kyu: "2",
              dan: null,
              dojoId: 2,
            },
          ],
          totalAtletas: 5,
        },
        {
          codigoCategoria: "65",
          nomeCategoria: "SENIOR M 9° A 6° KYU 70Kg A 80Kg",
          atletas: [
            {
              id: 200,
              nome: "Alexandre Silva",
              idade: 25,
              categoria: 3,
              categoriaKata: null,
              peso: "72.00",
              kyu: "7",
              dan: null,
              dojoId: 1,
            },
            {
              id: 201,
              nome: "Bruno Oliveira",
              idade: 28,
              categoria: 3,
              categoriaKata: null,
              peso: "75.00",
              kyu: "8",
              dan: null,
              dojoId: 2,
            },
            {
              id: 202,
              nome: "Carlos Mendes",
              idade: 26,
              categoria: 3,
              categoriaKata: null,
              peso: "78.00",
              kyu: "6",
              dan: null,
              dojoId: 3,
            },
            {
              id: 203,
              nome: "Diego Santos",
              idade: 29,
              categoria: 3,
              categoriaKata: null,
              peso: "76.00",
              kyu: "7",
              dan: null,
              dojoId: 4,
            },
            {
              id: 204,
              nome: "Eduardo Costa",
              idade: 27,
              categoria: 3,
              categoriaKata: null,
              peso: "73.00",
              kyu: "8",
              dan: null,
              dojoId: 1,
            },
            {
              id: 205,
              nome: "Fernando Lima",
              idade: 30,
              categoria: 3,
              categoriaKata: null,
              peso: "79.00",
              kyu: "6",
              dan: null,
              dojoId: 2,
            },
            {
              id: 206,
              nome: "Gustavo Rocha",
              idade: 24,
              categoria: 3,
              categoriaKata: null,
              peso: "74.00",
              kyu: "7",
              dan: null,
              dojoId: 3,
            },
            {
              id: 207,
              nome: "Henrique Alves",
              idade: 31,
              categoria: 3,
              categoriaKata: null,
              peso: "77.00",
              kyu: "8",
              dan: null,
              dojoId: 4,
            },
          ],
          totalAtletas: 8,
        },
      ],
    },
  };

  // Função para criar estrutura de bracket
  const createBracketStructure = (atletas: any) => {
    const sortedAtletas = [...atletas].sort((a, b) =>
      a.nome.localeCompare(b.nome)
    );

    if (sortedAtletas.length < 2) {
      return null;
    }

    // Calcular próxima potência de 2
    const nextPowerOf2 = Math.pow(
      2,
      Math.ceil(Math.log2(sortedAtletas.length))
    );

    // Criar primeira rodada
    const firstRound = [];
    for (let i = 0; i < nextPowerOf2; i += 2) {
      const participant1 = sortedAtletas[i] || { nome: "BYE", isbye: true };
      const participant2 = sortedAtletas[i + 1] || { nome: "BYE", isbye: true };

      if (!participant1.isbye && !participant2.isbye) {
        firstRound.push({
          id: `match-${i / 2}`,
          nextMatchId:
            nextPowerOf2 > 2
              ? `match-${Math.floor(i / 4) + nextPowerOf2 / 2}`
              : null,
          participants: [
            {
              id: participant1.id,
              name: participant1.nome,
              status: "PLAYED",
              isWinner: false,
              color: "blue",
            },
            {
              id: participant2.id,
              name: participant2.nome,
              status: "PLAYED",
              isWinner: false,
              color: "red",
            },
          ],
        });
      }
    }

    // Criar rodadas subsequentes
    const rounds = [firstRound];
    let currentRoundSize = firstRound.length;
    let matchIdCounter = nextPowerOf2;

    while (currentRoundSize > 1) {
      const nextRound: any[] = [];
      const nextRoundSize = currentRoundSize / 2;

      for (let i = 0; i < nextRoundSize; i++) {
        nextRound.push({
          id: `match-${matchIdCounter + i}`,
          nextMatchId:
            nextRoundSize > 1
              ? `match-${matchIdCounter + nextRoundSize + Math.floor(i / 2)}`
              : null,
          participants: [
            { id: null, name: "", status: "PENDING", isWinner: false },
            { id: null, name: "", status: "PENDING", isWinner: false },
          ],
        });
      }

      rounds.push(nextRound);
      currentRoundSize = nextRoundSize;
      matchIdCounter += nextRoundSize;
    }

    return rounds;
  };

  // Componente customizado para renderizar partidas
  const CustomMatch = ({ match, onMatchClick }: any) => {
    const participant1 = match.participants[0];
    const participant2 = match.participants[1];

    return (
      <div
        className="bg-white border-2 border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => onMatchClick && onMatchClick(match)}
        style={{ width: "200px", minHeight: "80px" }}
      >
        <div className="space-y-2">
          {/* Participante 1 (Azul) */}
          <div
            className={`flex items-center justify-between p-2 rounded ${
              participant1.color === "blue"
                ? "bg-blue-100 border-l-4 border-blue-500"
                : "bg-gray-50"
            }`}
          >
            <span className="text-sm font-medium truncate">
              {participant1.name || "TBD"}
            </span>
            {participant1.color === "blue" && (
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                AZ
              </span>
            )}
          </div>

          {/* Participante 2 (Vermelho) */}
          <div
            className={`flex items-center justify-between p-2 rounded ${
              participant2.color === "red"
                ? "bg-red-100 border-l-4 border-red-500"
                : "bg-gray-50"
            }`}
          >
            <span className="text-sm font-medium truncate">
              {participant2.name || "TBD"}
            </span>
            {participant2.color === "red" && (
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                VM
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Componente de bracket SVG customizado
  const CustomBracket = ({ rounds, title }: any) => {
    const roundWidth = 220;
    const matchHeight = 100;
    const matchSpacing = 20;

    const totalWidth = rounds.length * roundWidth;
    const maxRoundMatches = Math.max(
      ...rounds.map((round: any) => round.length)
    );
    const totalHeight = maxRoundMatches * (matchHeight + matchSpacing);

    return (
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 bg-gray-100 p-3 rounded text-center">
          {title}
        </h3>

        <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg">
          <div
            style={{
              width: totalWidth,
              height: totalHeight,
              position: "relative",
            }}
          >
            <svg
              width={totalWidth}
              height={totalHeight}
              style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
            >
              {/* Renderizar linhas de conexão */}
              {rounds.map((round: any, roundIndex: any) => {
                if (roundIndex === rounds.length - 1) return null;

                return round.map((match: any, matchIndex: any) => {
                  const nextRound = rounds[roundIndex + 1];
                  const nextMatchIndex = Math.floor(matchIndex / 2);

                  if (nextRound && nextRound[nextMatchIndex]) {
                    const startX = (roundIndex + 1) * roundWidth - 20;
                    const startY =
                      matchIndex * (matchHeight + matchSpacing) +
                      matchHeight / 2;
                    const endX = (roundIndex + 1) * roundWidth + 20;
                    const endY =
                      nextMatchIndex *
                        (matchHeight + matchSpacing) *
                        Math.pow(2, roundIndex + 1) +
                      matchHeight / 2;
                    const midX = startX + (endX - startX) / 2;

                    return (
                      <g key={`${roundIndex}-${matchIndex}`}>
                        <line
                          x1={startX}
                          y1={startY}
                          x2={midX}
                          y2={startY}
                          stroke="#666"
                          strokeWidth="2"
                        />
                        <line
                          x1={midX}
                          y1={startY}
                          x2={midX}
                          y2={endY}
                          stroke="#666"
                          strokeWidth="2"
                        />
                        <line
                          x1={midX}
                          y1={endY}
                          x2={endX}
                          y2={endY}
                          stroke="#666"
                          strokeWidth="2"
                        />
                      </g>
                    );
                  }
                  return null;
                });
              })}
            </svg>

            {/* Renderizar partidas */}
            {rounds.map((round: any, roundIndex: any) => (
              <div key={roundIndex}>
                {round.map((match: any, matchIndex: any) => {
                  const spacing =
                    Math.pow(2, roundIndex) * (matchHeight + matchSpacing);
                  const yPosition = matchIndex * spacing;

                  return (
                    <div
                      key={match.id}
                      style={{
                        position: "absolute",
                        left: roundIndex * roundWidth,
                        top: yPosition,
                        zIndex: 2,
                      }}
                    >
                      <CustomMatch match={match} />
                    </div>
                  );
                })}

                {/* Cabeçalho da rodada */}
                <div
                  style={{
                    position: "absolute",
                    left: roundIndex * roundWidth,
                    top: -40,
                    zIndex: 3,
                  }}
                >
                  <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">
                    {roundIndex === 0
                      ? "Primeira Rodada"
                      : roundIndex === rounds.length - 1
                      ? "Final"
                      : `Rodada ${roundIndex + 1}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          BRACKETS - CAMPEONATO DE KARATE
        </h1>
        <p className="text-gray-600">Sistema de Chaves para Competição</p>
      </div>

      {/* Navegação por abas */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("kata")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === "kata"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            KATA
          </button>
          <button
            onClick={() => setActiveTab("kumite")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ml-2 ${
              activeTab === "kumite"
                ? "bg-red-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            KUMITE
          </button>
        </div>
      </div>

      {/* Conteúdo das abas */}
      <div>
        {activeTab === "kata" && (
          <div>
            {data.brackets.kata.map((categoria, index) => {
              const rounds = createBracketStructure(categoria.atletas);
              return rounds ? (
                <CustomBracket
                  key={index}
                  rounds={rounds}
                  title={categoria.nomeCategoria}
                />
              ) : null;
            })}
          </div>
        )}

        {activeTab === "kumite" && (
          <div>
            {data.brackets.kumite.map((categoria, index) => {
              const rounds = createBracketStructure(categoria.atletas);
              return rounds ? (
                <CustomBracket
                  key={index}
                  rounds={rounds}
                  title={categoria.nomeCategoria}
                />
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Legenda */}
      <div className="mt-8 bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Legenda:</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm">Competidor Azul</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm">Competidor Vermelho</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
            <span className="text-sm">TBD (A ser definido)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KarateBrackets;
