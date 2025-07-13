import React, { useState } from "react";

// Simulando a biblioteca react-brackets (já que não está disponível no ambiente)
// Esta é uma implementação simplificada que imita o comportamento da biblioteca

const Bracket = ({ rounds, onMatchClick }) => {
  return (
    <div className="bracket-container overflow-x-auto">
      <div className="flex gap-8 p-4">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="bracket-round">
            <div className="text-center mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">
                {roundIndex === 0
                  ? "Primeira Rodada"
                  : roundIndex === rounds.length - 1
                  ? "Final"
                  : `Rodada ${roundIndex + 1}`}
              </span>
            </div>
            <div className="space-y-4">
              {round.map((match, matchIndex) => (
                <div
                  key={match.id}
                  className="bg-white border-2 border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors w-48"
                  onClick={() => onMatchClick && onMatchClick(match)}
                >
                  <div className="space-y-2">
                    <div
                      className={`flex items-center justify-between p-2 rounded ${
                        match.participants[0].isWinner
                          ? "bg-green-100 border-l-4 border-green-500"
                          : "bg-blue-100 border-l-4 border-blue-500"
                      }`}
                    >
                      <span className="text-sm font-medium truncate">
                        {match.participants[0].name || "TBD"}
                      </span>
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                        AZ
                      </span>
                    </div>
                    <div
                      className={`flex items-center justify-between p-2 rounded ${
                        match.participants[1].isWinner
                          ? "bg-green-100 border-l-4 border-green-500"
                          : "bg-red-100 border-l-4 border-red-500"
                      }`}
                    >
                      <span className="text-sm font-medium truncate">
                        {match.participants[1].name || "TBD"}
                      </span>
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                        VM
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const KarateBrackets = () => {
  const [activeTab, setActiveTab] = useState("kata");

  // Dados do campeonato
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

  // Função simplificada para gerar bracket
  const generateBracket = (atletas) => {
    if (atletas.length < 2) return null;

    const shuffled = [...atletas].sort(() => Math.random() - 0.5);
    const rounds = [];
    let currentRound = [];

    // Primeira rodada
    for (let i = 0; i < shuffled.length; i += 2) {
      if (i + 1 < shuffled.length) {
        currentRound.push({
          id: `match-${i / 2}`,
          participants: [
            {
              id: shuffled[i].id,
              name: shuffled[i].nome,
              isWinner: false,
            },
            {
              id: shuffled[i + 1].id,
              name: shuffled[i + 1].nome,
              isWinner: false,
            },
          ],
        });
      }
    }

    rounds.push(currentRound);

    // Rodadas seguintes
    while (currentRound.length > 1) {
      const nextRound = [];
      for (let i = 0; i < Math.floor(currentRound.length / 2); i++) {
        nextRound.push({
          id: `match-next-${i}`,
          participants: [
            { id: null, name: "TBD", isWinner: false },
            { id: null, name: "TBD", isWinner: false },
          ],
        });
      }
      rounds.push(nextRound);
      currentRound = nextRound;
    }

    return rounds;
  };

  const handleMatchClick = (match) => {
    console.log("Match clicked:", match);
    // Aqui você pode adicionar lógica para editar resultados
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
          <div className="space-y-8">
            {data.brackets.kata.map((categoria, index) => {
              const bracket = generateBracket(categoria.atletas);
              if (!bracket) return null;

              return (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 text-center bg-gray-100 p-3 rounded">
                    {categoria.nomeCategoria}
                  </h2>
                  <Bracket rounds={bracket} onMatchClick={handleMatchClick} />
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "kumite" && (
          <div className="space-y-8">
            {data.brackets.kumite.map((categoria, index) => {
              const bracket = generateBracket(categoria.atletas);
              if (!bracket) return null;

              return (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 text-center bg-gray-100 p-3 rounded">
                    {categoria.nomeCategoria}
                  </h2>
                  <Bracket rounds={bracket} onMatchClick={handleMatchClick} />
                </div>
              );
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
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm">Vencedor</span>
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
