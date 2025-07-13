import React from "react";
import { Seed,Bracket, } from "react-brackets";
import "./ChampionshipBrackets.css"; // Vamos criar este arquivo para os estilos

const ChampionshipBrackets = ({ data }) => {
  if (!data || !data.brackets) {
    return (
      <div className="text-center text-gray-500">
        Nenhum dado de brackets disponível.
      </div>
    );
  }

  const renderCategoryBrackets = (categoryType, categoryData) => {
    // Filtra apenas categorias com 2 ou mais atletas para formar chaves de luta.
    // Categorias com 1 atleta não formam uma partida inicial.
    const categoriesWithMatches = categoryData.filter(
      (cat) => cat.atletas.length >= 2
    );

    if (categoriesWithMatches.length === 0) {
      return (
        <div className="text-center text-gray-400 mt-4">
          Nenhuma partida inicial para{" "}
          {categoryType === "kata" ? "Kata" : "Shiai"}.
        </div>
      );
    }

    return categoriesWithMatches.map((category) => {
      // Ordena os atletas alfabeticamente para a visualização da partida
      const sortedAtletas = [...category.atletas].sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );

      // Cria as partidas iniciais (uma por categoria com pelo menos 2 atletas)
      // Para o propósito de impressão das partidas iniciais,
      // pegamos os dois primeiros atletas após a ordenação.
      const initialMatches = [];
      for (let i = 0; i < sortedAtletas.length; i += 2) {
        const atleta1 = sortedAtletas[i];
        const atleta2 = sortedAtletas[i + 1];

        if (atleta1 && atleta2) {
          initialMatches.push({
            id: `${category.codigoCategoria}-match-${i / 2}`,
            sides: [
              {
                entrant: { id: atleta1.id, name: atleta1.nome, color: "blue" },
              },
              { entrant: { id: atleta2.id, name: atleta2.nome, color: "red" } },
            ],
          });
        }
      }

      // 'react-brackets' espera uma estrutura de rounds.
      // Para as partidas iniciais, criamos um único round.
      const rounds =
        initialMatches.length > 0
          ? [
              {
                id: category.codigoCategoria,
                name: category.nomeCategoria,
                matches: initialMatches.map((match) => ({
                  id: match.id,
                  sides: [
                    {
                      seed: {
                        id: match.sides[0].entrant.id,
                        date: new Date().toDateString(),
                        teams: [
                          {
                            name: match.sides[0].entrant.name,
                            customColor: match.sides[0].entrant.color,
                          },
                        ],
                      },
                    },
                    {
                      seed: {
                        id: match.sides[1].entrant.id,
                        date: new Date().toDateString(),
                        teams: [
                          {
                            name: match.sides[1].entrant.name,
                            customColor: match.sides[1].entrant.color,
                          },
                        ],
                      },
                    },
                  ],
                })),
              },
            ]
          : [];

      return (
        <div
          key={category.codigoCategoria}
          className="mb-8 p-4 border rounded-lg shadow-sm bg-white"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {category.nomeCategoria}
          </h3>
          {rounds.length > 0 ? (
            <Brackets
              rounds={rounds}
              renderMatch={(match, round, matchIndex) => {
                const team1 = match.sides[0]?.seed?.teams[0];
                const team2 = match.sides[1]?.seed?.teams[0];
                return (
                  <Match match={match} round={round} matchIndex={matchIndex}>
                    <Seed
                      seed={match.sides[0]?.seed}
                      style={{ backgroundColor: team1?.customColor }}
                    >
                      <div
                        className="bracket-player"
                        style={{
                          backgroundColor: team1?.customColor || "inherit",
                          color: "white",
                        }}
                      >
                        {team1?.name || "A definir"}
                      </div>
                    </Seed>
                    <Seed
                      seed={match.sides[1]?.seed}
                      style={{ backgroundColor: team2?.customColor }}
                    >
                      <div
                        className="bracket-player"
                        style={{
                          backgroundColor: team2?.customColor || "inherit",
                          color: "white",
                        }}
                      >
                        {team2?.name || "A definir"}
                      </div>
                    </Seed>
                  </Match>
                );
              }}
            />
          ) : (
            <p className="text-gray-600">
              Categoria com menos de 2 atletas. Não há partida inicial.
            </p>
          )}
        </div>
      );
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-8">
        Chaves do Campeonato de Karatê
      </h1>

      {/* Brackets para Kata */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">
        Chaves de Kata
      </h2>
      {renderCategoryBrackets("kata", data.brackets.kata || [])}

      {/* Brackets para Kumite (Shiai) */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-10 mb-6 border-b pb-2">
        Chaves de Shiai (Kumite)
      </h2>
      {renderCategoryBrackets("kumite", data.brackets.kumite || [])}
    </div>
  );
};

export default ChampionshipBrackets;
