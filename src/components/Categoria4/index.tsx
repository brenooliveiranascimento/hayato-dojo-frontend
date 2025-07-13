// Função para criar estrutura de bracket otimizada
  const createBracketStructure = (atletas: any) => {
    const sortedAtletas = [...atletas].sort((a, b) =>
      a.nome.localeCompare(b.nome)
    );

    if (sortedAtletas.length < 2) {
      return null;
    }

    // Para qualquer número, usar lógica otimizada
    return createOptimizedBracket(sortedAtletas);
  };

  // Função para brackets otimizados (qualquer número de participantes)
  const createOptimizedBracket = (atletas: any) => {
    const numAtletas = atletas.length;
    
    if (numAtletas === 2) {
      // Só a final
      return [[{
        id: 'final',
        nextMatchId: null,
        participants: [
          { id: atletas[0].id, name: atletas[0].nome, status: "PLAYED", isWinner: false, color: "blue" },
          { id: atletas[1].id, name: atletas[1].nome, status: "PLAYED", isWinner: false, color: "red" },
        ],
      }]];
    }
    
    if (numAtletas === 3) {
      // 1 primeira rodada + 1 final (1 bye)
      const rounds = [
        // Primeira rodada
        [{
          id: 'first-1',
          nextMatchId: 'final',
          participants: [
            { id: atletas[1].id, name: atletas[1].nome, status: "PLAYED", isWinner: false, color: "blue" },
            { id: atletas[2].id, name: atletas[2].nome, status: "PLAYED", isWinner: false, color: "red" },
          ],
        }],
        // Final
        [{
          id: 'final',
          nextMatchId: null,
          participants: [
            { id: atletas[0].id, name: atletas[0].nome + " (Bye)", status: "PENDING", isWinner: false, color: "blue" },
            { id: null, name: "Vencedor da Partida 1", status: "PENDING", isWinner: false, color: "red" },
          ],
        }]
      ];
      return rounds;
    }
    
    if (numAtletas === 4) {
      // 2 semifinais + 1 final
      const rounds = [
        // Semifinais
        [
          {
            id: 'semi-1',
            nextMatchId: 'final',
            participants: [
              { id: atletas[0].id, name: atletas[0].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[1].id, name: atletas[1].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'semi-2',
            nextMatchId: 'final',
            participants: [
              { id: atletas[2].id, name: atletas[2].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[3].id, name: atletas[3].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          }
        ],
        // Final
        [{
          id: 'final',
          nextMatchId: null,
          participants: [
            { id: null, name: "Vencedor Semi-1", status: "PENDING", isWinner: false, color: "blue" },
            { id: null, name: "Vencedor Semi-2", status: "PENDING", isWinner: false, color: "red" },
          ],
        }]
      ];
      return rounds;
    }
    
    if (numAtletas === 5) {
      // 2 primeira rodada + 1 semifinal + 1 final (1 bye)
      const rounds = [
        // Primeira rodada
        [
          {
            id: 'first-1',
            nextMatchId: 'semi-1',
            participants: [
              { id: atletas[1].id, name: atletas[1].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[2].id, name: atletas[2].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'first-2',
            nextMatchId: 'semi-1',
            participants: [
              { id: atletas[3].id, name: atletas[3].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[4].id, name: atletas[4].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          }
        ],
        // Semifinal
        [{
          id: 'semi-1',
          nextMatchId: 'final',
          participants: [
            { id: null, name: "Vencedor Partida 1", status: "PENDING", isWinner: false, color: "blue" },
            { id: null, name: "Vencedor Partida 2", status: "PENDING", isWinner: false, color: "red" },
          ],
        }],
        // Final
        [{
          id: 'final',
          nextMatchId: null,
          participants: [
            { id: atletas[0].id, name: atletas[0].nome + " (Bye)", status: "PENDING", isWinner: false, color: "blue" },
            { id: null, name: "Vencedor da Semifinal", status: "PENDING", isWinner: false, color: "red" },
          ],
        }]
      ];
      return rounds;
    }
    
    if (numAtletas === 6) {
      // 3 primeira rodada + 1 semifinal + 1 final (1 vai direto)
      const rounds = [
        // Primeira rodada (3 partidas)
        [
          {
            id: 'first-1',
            nextMatchId: 'semi-1',
            participants: [
              { id: atletas[0].id, name: atletas[0].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[1].id, name: atletas[1].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'first-2',
            nextMatchId: 'semi-1',
            participants: [
              { id: atletas[2].id, name: atletas[2].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[3].id, name: atletas[3].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'first-3-direct',
            nextMatchId: 'final',
            isDirect: true, // Marca que vai direto para final
            participants: [
              { id: atletas[4].id, name: atletas[4].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[5].id, name: atletas[5].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          }
        ],
        // Semifinal (1 partida)
        [{
          id: 'semi-1',
          nextMatchId: 'final',
          participants: [
            { id: null, name: "Vencedor Partida 1", status: "PENDING", isWinner: false, color: "blue" },
            { id: null, name: "Vencedor Partida 2", status: "PENDING", isWinner: false, color: "red" },
          ],
        }],
        // Final
        [{
          id: 'final',
          nextMatchId: null,
          participants: [
            { id: null, name: "Vencedor da Semifinal", status: "PENDING", isWinner: false, color: "blue" },
            { id: null, name: "Vencedor Partida 3", status: "PENDING", isWinner: false, color: "red", isDirect: true },
          ],
        }]
      ];
      return rounds;
    }
    
    if (numAtletas === 7) {
      // 3 primeira rodada + 2 semifinais + 1 final (1 bye)
      const rounds = [
        // Primeira rodada
        [
          {
            id: 'first-1',
            nextMatchId: 'semi-1',
            participants: [
              { id: atletas[1].id, name: atletas[1].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[2].id, name: atletas[2].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'first-2',
            nextMatchId: 'semi-2',
            participants: [
              { id: atletas[3].id, name: atletas[3].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[4].id, name: atletas[4].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'first-3',
            nextMatchId: 'semi-2',
            participants: [
              { id: atletas[5].id, name: atletas[5].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[6].id, name: atletas[6].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          }
        ],
        // Semifinais
        [
          {
            id: 'semi-1',
            nextMatchId: 'final',
            participants: [
              { id: atletas[0].id, name: atletas[0].nome + " (Bye)", status: "PENDING", isWinner: false, color: "blue" },
              { id: null, name: "Vencedor Partida 1", status: "PENDING", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'semi-2',
            nextMatchId: 'final',
            participants: [
              { id: null, name: "Vencedor Partida 2", status: "PENDING", isWinner: false, color: "blue" },
              { id: null, name: "Vencedor Partida 3", status: "PENDING", isWinner: false, color: "red" },
            ],
          }
        ],
        // Final
        [{
          id: 'final',
          nextMatchId: null,
          participants: [
            { id: null, name: "Vencedor Semi-1", status: "PENDING", isWinner: false, color: "blue" },
            { id: null, name: "Vencedor Semi-2", status: "PENDING", isWinner: false, color: "red" },
          ],
        }]
      ];
      return rounds;
    }
    
    if (numAtletas === 8) {
      // 4 quartas + 2 semifinais + 1 final
      const rounds = [
        // Quartas
        [
          {
            id: 'quarter-1',
            nextMatchId: 'semi-1',
            participants: [
              { id: atletas[0].id, name: atletas[0].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[1].id, name: atletas[1].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'quarter-2',
            nextMatchId: 'semi-1',
            participants: [
              { id: atletas[2].id, name: atletas[2].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[3].id, name: atletas[3].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'quarter-3',
            nextMatchId: 'semi-2',
            participants: [
              { id: atletas[4].id, name: atletas[4].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[5].id, name: atletas[5].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'quarter-4',
            nextMatchId: 'semi-2',
            participants: [
              { id: atletas[6].id, name: atletas[6].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[7].id, name: atletas[7].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          }
        ],
        // Semifinais
        [
          {
            id: 'semi-1',
            nextMatchId: 'final',
            participants: [
              { id: null, name: "Vencedor Partida 1", status: "PENDING", isWinner: false, color: "blue" },
              { id: null, name: "Vencedor Partida 2", status: "PENDING", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'semi-2',
            nextMatchId: 'final',
            participants: [
              { id: null, name: "Vencedor Partida 3", status: "PENDING", isWinner: false, color: "blue" },
              { id: null, name: "Vencedor Partida 4", status: "PENDING", isWinner: false, color: "red" },
            ],
          }
        ],
        // Final
        [{
          id: 'final',
          nextMatchId: null,
          participants: [
            { id: null, name: "Vencedor Semi-1", status: "PENDING", isWinner: false, color: "blue" },
            { id: null, name: "Vencedor Semi-2", status: "PENDING", isWinner: false, color: "red" },
          ],
        }]
      ];
      return rounds;
    }

    // Para números maiores (9+), usar sistema híbrido
    if (numAtletas >= 9) {
      return createHybridBracket(atletas);
    }

    return null;
  };

  // Sistema híbrido para números maiores
  const createHybridBracket = (atletas: any) => {
    const numAtletas = atletas.length;
    
    // Calcular quantos precisam de primeira rodada para chegar à potência de 2
    const nextPowerOf2 = Math.pow(2, Math.floor(Math.log2(numAtletas)));
    const directToSecond = nextPowerOf2; // Quantos vão direto
    const needFirstRound = numAtletas - directToSecond; // Quantos precisam de primeira rodada
    
    const rounds = [];
    
    if (needFirstRound > 0) {
      // Primeira rodada - apenas para os que precisam
      const firstRound = [];
      for (let i = 0; i < needFirstRound; i += 2) {
        firstRound.push({
          id: `first-${Math.floor(i/2) + 1}`,
          nextMatchId: `second-${Math.floor(i/4) + Math.floor(directToSecond/2) + 1}`,
          participants: [
            { id: atletas[directToSecond + i].id, name: atletas[directToSecond + i].nome, status: "PLAYED", isWinner: false, color: "blue" },
            { id: atletas[directToSecond + i + 1].id, name: atletas[directToSecond + i + 1].nome, status: "PLAYED", isWinner: false, color: "red" },
          ],
        });
      }
      rounds.push(firstRound);
    }
    
    // Segunda rodada (ou primeira se não houver primeira rodada)
    const secondRound = [];
    const winnersFromFirst = Math.floor(needFirstRound / 2);
    const totalInSecond = directToSecond + winnersFromFirst;
    
    // Atletas que vão direto
    for (let i = 0; i < directToSecond; i += 2) {
      if (i + 1 < directToSecond) {
        secondRound.push({
          id: `second-${Math.floor(i/2) + 1}`,
          nextMatchId: totalInSecond > 2 ? `third-${Math.floor(i/4) + 1}` : 'final',
          participants: [
            { id: atletas[i].id, name: atletas[i].nome, status: "PLAYED", isWinner: false, color: "blue" },
            { id: atletas[i + 1].id, name: atletas[i + 1].nome, status: "PLAYED", isWinner: false, color: "red" },
          ],
        });
      }
    }
    
    // Vencedores da primeira rodada
    for (let i = 0; i < winnersFromFirst; i += 2) {
      if (i + 1 < winnersFromFirst) {
        secondRound.push({
          id: `second-${Math.floor(directToSecond/2) + Math.floor(i/2) + 1}`,
          nextMatchId: totalInSecond > 2 ? `third-${Math.floor((directToSecond + i)/4) + 1}` : 'final',
          participants: [
            { id: null, name: `Vencedor Partida ${i + 1}`, status: "PENDING", isWinner: false, color: "blue" },
            { id: null, name: `Vencedor Partida ${i + 2}`, status: "PENDING", isWinner: false, color: "red" },
          ],
        });
      }
    }
    
    rounds.push(secondRound);
    
    // Continuar criando rodadas até chegar à final
    let currentRoundSize = secondRound.length;
    let roundNumber = 3;
    
    while (currentRoundSize > 1) {
      const nextRound = [];
      const nextRoundSize = Math.floor(currentRoundSize / 2);
      
      for (let i = 0; i < nextRoundSize; i++) {
        nextRound.push({
          id: nextRoundSize === 1 ? 'final' : `round${roundNumber}-${i + 1}`,
          nextMatchId: nextRoundSize === 1 ? null : `round${roundNumber + 1}-${Math.floor(i/2) + 1}`,
          participants: [
            { id: null, name: `Vencedor ${rounds.length === 1 ? 'Partida' : 'Rodada'} ${i * 2 + 1}`, status: "PENDING", isWinner: false, color: "blue" },
            { id: null, name: `Vencedor ${rounds.length === 1 ? 'Partida' : 'Rodada'} ${i * 2 + 2}`, status: "PENDING", isWinner: false, color: "red" },
          ],
        });
      }
      
      rounds.push(nextRound);
      currentRoundSize = nextRoundSize;
      roundNumber++;
    }
    
    return rounds;
  }; },
            ],
          }
        ],
        // Final
        [{
          id: 'final',
          nextMatchId: null,
          participants: [
            { id: null, name: "Vencedor Semi-1", status: "PENDING", isWinner: false, color: "blue" },
            { id: null, name: "Vencedor Semi-2", status: "PENDING", isWinner: false, color: "red" },
          ],
        }]
      ];
      return rounds;
    }
    
    if (numAtletas === 8) {
      // 4 quartas + 2 semifinais + 1 final
      const rounds = [
        // Quartas
        [
          {
            id: 'quarter-1',
            nextMatchId: 'semi-1',
            participants: [
              { id: atletas[0].id, name: atletas[0].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[1].id, name: atletas[1].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'quarter-2',
            nextMatchId: 'semi-1',
            participants: [
              { id: atletas[2].id, name: atletas[2].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[3].id, name: atletas[3].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'quarter-3',
            nextMatchId: 'semi-2',
            participants: [
              { id: atletas[4].id, name: atletas[4].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[5].id, name: atletas[5].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'quarter-4',
            nextMatchId: 'semi-2',
            participants: [
              { id: atletas[6].id, name: atletas[6].nome, status: "PLAYED", isWinner: false, color: "blue" },
              { id: atletas[7].id, name: atletas[7].nome, status: "PLAYED", isWinner: false, color: "red" },
            ],
          }
        ],
        // Semifinais
        [
          {
            id: 'semi-1',
            nextMatchId: 'final',
            participants: [
              { id: null, name: "Vencedor Quarter-1", status: "PENDING", isWinner: false, color: "blue" },
              { id: null, name: "Vencedor Quarter-2", status: "PENDING", isWinner: false, color: "red" },
            ],
          },
          {
            id: 'semi-2',
            nextMatchId: 'final',
            participants: [
              { id: null, name: "Vencedor Quarter-3", status: "PENDING", isWinner: false, color: "blue" },
              { id: null, name: "Vencedor Quarter-4", status: "PENDING", isWinner: false, color: "red" },
            ],
          }
        ],
        // Final
        [{
          id: 'final',
          nextMatchId: null,
          participants: [
            { id: null, name: "Vencedor Semi-1", status: "PENDING", isWinner: false, color: "blue" },
            { id: null, name: "Vencedor Semi-2", status: "PENDING", isWinner: false, color: "red" },
          ],
        }]
      ];
      return rounds;
    }

    return null;
  };

  // Função para brackets tradicionais (potência de 2)
  const createTraditionalBracket = (atletas: any) => {
    // Calcular próxima potência de 2
    const nextPowerOf2 = Math.pow(
      2,
      Math.ceil(Math.log2(atletas.length))
    );

    // Criar array de participantes com byes
    const participants = [...atletas];
    while (participants.length < nextPowerOf2) {
      participants.push({ nome: "BYE", isbye: true });
    }

    // Criar primeira rodada
    const firstRound = [];
    for (let i = 0; i < nextPowerOf2; i += 2) {
      const participant1 = participants[i];
      const participant2 = participants[i + 1];

      // Se um dos participantes for BYE, o outro avança automaticamente
      if (participant1.isbye && !participant2.isbye) {
        continue;
      } else if (!participant1.isbye && participant2.isbye) {
        continue;
      } else if (!participant1.isbye && !participant2.isbye) {
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
      const nextRoundSize = Math.ceil(currentRoundSize / 2);

      for (let i = 0; i < nextRoundSize; i++) {
        nextRound.push({
          id: `match-${matchIdCounter + i}`,
          nextMatchId:
            nextRoundSize > 1
              ? `match-${matchIdCounter + nextRoundSize + Math.floor(i / 2)}`
              : null,
          participants: [
            { 
              id: null, 
              name: "", 
              status: "PENDING", 
              isWinner: false,
              color: "blue"
            },
            { 
              id: null, 
              name: "", 
              status: "PENDING", 
              isWinner: false,
              color: "red"
            },
          ],
        });
      }

      rounds.push(nextRound);
      currentRoundSize = nextRoundSize;
      matchIdCounter += nextRoundSize;
    }

    return rounds;
  };/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

const KarateBrackets4 = () => {
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

    // Criar array de participantes com byes
    const participants = [...sortedAtletas];
    while (participants.length < nextPowerOf2) {
      participants.push({ nome: "BYE", isbye: true });
    }

    // Criar primeira rodada
    const firstRound = [];
    for (let i = 0; i < nextPowerOf2; i += 2) {
      const participant1 = participants[i];
      const participant2 = participants[i + 1];

      // Se um dos participantes for BYE, o outro avança automaticamente
      if (participant1.isbye && !participant2.isbye) {
        // participant2 avança automaticamente
        continue;
      } else if (!participant1.isbye && participant2.isbye) {
        // participant1 avança automaticamente
        continue;
      } else if (!participant1.isbye && !participant2.isbye) {
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
      const nextRoundSize = Math.ceil(currentRoundSize / 2);

      for (let i = 0; i < nextRoundSize; i++) {
        nextRound.push({
          id: `match-${matchIdCounter + i}`,
          nextMatchId:
            nextRoundSize > 1
              ? `match-${matchIdCounter + nextRoundSize + Math.floor(i / 2)}`
              : null,
          participants: [
            { 
              id: null, 
              name: "", 
              status: "PENDING", 
              isWinner: false,
              color: "blue" // Sempre azul para o primeiro
            },
            { 
              id: null, 
              name: "", 
              status: "PENDING", 
              isWinner: false,
              color: "red" // Sempre vermelho para o segundo
            },
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

    // Verificar se é uma partida que vai direto para final
    const isDirect = match.isDirect || participant1.isDirect || participant2.isDirect;

    return (
      <div
        className="bg-white border-2 border-gray-300 rounded-lg p-3 cursor-pointer hover:shadow-md transition-all duration-200"
        onClick={() => onMatchClick && onMatchClick(match)}
        style={{ width: "200px", minHeight: "90px" }}
      >
        {isDirect ? (
          // Layout especial para partidas que vão direto
          <div className="space-y-2">
            <div className="text-center p-2 bg-yellow-50 border border-yellow-300 rounded">
              <span className="text-xs font-bold text-yellow-700">🏆 DIRETO PARA FINAL</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded transition-colors bg-blue-50 border-l-4 border-blue-500">
              <span className="text-sm font-medium truncate">
                {participant1.name || "Vencedor"}
              </span>
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded font-bold">
                AZ
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded transition-colors bg-red-50 border-l-4 border-red-500">
              <span className="text-sm font-medium truncate">
                {participant2.name || "Vencedor"}
              </span>
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded font-bold">
                VM
              </span>
            </div>
          </div>
        ) : (
          // Layout normal
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded transition-colors bg-blue-50 border-l-4 border-blue-500">
              <span className="text-sm font-medium truncate">
                {participant1.name || "Vencedor"}
              </span>
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded font-bold">
                AZ
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded transition-colors bg-red-50 border-l-4 border-red-500">
              <span className="text-sm font-medium truncate">
                {participant2.name || "Vencedor"}
              </span>
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded font-bold">
                VM
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Componente de bracket SVG customizado
  const CustomBracket = ({ rounds, title }: any) => {
    const roundWidth = 240;
    const matchHeight = 110;
    const matchSpacing = 30;
    const headerHeight = 60; // Altura reservada para o cabeçalho

    const totalWidth = rounds.length * roundWidth + 40;
    const maxMatches = Math.max(...rounds.map((round: any) => round.length));
    const totalHeight = maxMatches * (matchHeight + matchSpacing) + headerHeight + 40;

    return (
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-100 to-red-100 p-4 rounded-lg text-center shadow-sm">
          {title}
        </h3>

        <div className="overflow-x-auto bg-gray-50 p-6 rounded-lg shadow-sm">
          <div
            style={{
              width: totalWidth,
              height: totalHeight,
              position: "relative",
              margin: "0 auto",
            }}
          >
            <svg
              width={totalWidth}
              height={totalHeight}
              style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
            >
              {/* Renderizar linhas de conexão melhoradas */}
              {rounds.map((round: any, roundIndex: any) => {
                if (roundIndex === rounds.length - 1) return null;

                return round.map((match: any, matchIndex: any) => {
                  const nextRound = rounds[roundIndex + 1];
                  const nextMatchIndex = Math.floor(matchIndex / 2);

                  if (nextRound && nextRound[nextMatchIndex]) {
                    // Calcular posições para a rodada atual
                    const currentAvailableHeight = totalHeight - headerHeight - 40;
                    const currentTotalMatchesHeight = round.length * matchHeight + (round.length - 1) * matchSpacing;
                    const currentStartY = headerHeight + (currentAvailableHeight - currentTotalMatchesHeight) / 2;
                    const currentY = currentStartY + matchIndex * (matchHeight + matchSpacing) + matchHeight / 2;
                    
                    // Calcular posições para a próxima rodada
                    const nextAvailableHeight = totalHeight - headerHeight - 40;
                    const nextTotalMatchesHeight = nextRound.length * matchHeight + (nextRound.length - 1) * matchSpacing;
                    const nextStartY = headerHeight + (nextAvailableHeight - nextTotalMatchesHeight) / 2;
                    const nextY = nextStartY + nextMatchIndex * (matchHeight + matchSpacing) + matchHeight / 2;
                    
                    const startX = (roundIndex + 1) * roundWidth - 20;
                    const endX = (roundIndex + 1) * roundWidth + 20;
                    const midX = startX + (endX - startX) / 2;

                    return (
                      <g key={`${roundIndex}-${matchIndex}`}>
                        {/* Linha horizontal da partida */}
                        <line
                          x1={startX}
                          y1={currentY}
                          x2={midX}
                          y2={currentY}
                          stroke="#4a5568"
                          strokeWidth="2"
                        />
                        {/* Linha vertical conectora */}
                        <line
                          x1={midX}
                          y1={currentY}
                          x2={midX}
                          y2={nextY}
                          stroke="#4a5568"
                          strokeWidth="2"
                        />
                        {/* Linha horizontal para próxima partida */}
                        <line
                          x1={midX}
                          y1={nextY}
                          x2={endX}
                          y2={nextY}
                          stroke="#4a5568"
                          strokeWidth="2"
                        />
                        {/* Círculo na junção */}
                        <circle
                          cx={midX}
                          cy={nextY}
                          r="3"
                          fill="#4a5568"
                        />
                      </g>
                    );
                  }
                  return null;
                });
              })}
            </svg>

            {/* Renderizar partidas centralizadas */}
            {rounds.map((round: any, roundIndex: any) => (
              <div key={roundIndex}>
                {round.map((match: any, matchIndex: any) => {
                  // Calcular espaçamento dinâmico baseado no número real de partidas na rodada
                  const availableHeight = totalHeight - headerHeight - 40; // Espaço disponível
                  const totalMatchesHeight = round.length * matchHeight + (round.length - 1) * matchSpacing;
                  const startY = headerHeight + (availableHeight - totalMatchesHeight) / 2;
                  const yPosition = startY + matchIndex * (matchHeight + matchSpacing);

                  return (
                    <div
                      key={match.id}
                      style={{
                        position: "absolute",
                        left: roundIndex * roundWidth + 20,
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
                    left: roundIndex * roundWidth + 20,
                    top: 10,
                    zIndex: 3,
                  }}
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm">
                    {roundIndex === 0
                      ? "Primeira Rodada"
                      : roundIndex === rounds.length - 1
                      ? "🏆 FINAL"
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
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🥋 BRACKETS - CAMPEONATO DE KARATE
        </h1>
        <p className="text-gray-600 text-lg">Sistema de Chaves para Competição</p>
      </div>

      {/* Navegação por abas */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setActiveTab("kata")}
            className={`px-8 py-4 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === "kata"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            🥋 KATA
          </button>
          <button
            onClick={() => setActiveTab("kumite")}
            className={`px-8 py-4 rounded-lg font-semibold transition-all duration-200 ml-2 ${
              activeTab === "kumite"
                ? "bg-red-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            🥊 KUMITE
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

      {/* Legenda melhorada */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
        <h3 className="font-bold text-lg mb-4 text-gray-800">📋 Legenda:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center bg-blue-50 p-3 rounded-lg">
            <div className="w-6 h-6 bg-blue-500 rounded mr-3 shadow-sm"></div>
            <span className="text-sm font-medium">Competidor Azul</span>
          </div>
          <div className="flex items-center bg-red-50 p-3 rounded-lg">
            <div className="w-6 h-6 bg-red-500 rounded mr-3 shadow-sm"></div>
            <span className="text-sm font-medium">Competidor Vermelho</span>
          </div>
          <div className="flex items-center bg-gray-50 p-3 rounded-lg">
            <div className="w-6 h-6 bg-gray-300 rounded mr-3 shadow-sm"></div>
            <span className="text-sm font-medium">TBD (A ser definido)</span>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">💡 Dica para Árbitros:</span> O campo superior é sempre AZUL e o inferior sempre VERMELHO em todas as rodadas.
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">🏆 Partidas Especiais:</span> Partidas marcadas com "DIRETO PARA FINAL" têm o vencedor avançando direto, pulando uma rodada.
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">🔗 Conexões:</span> As linhas conectam as partidas mostrando o caminho até a final. Os círculos nas junções indicam os pontos de encontro das chaves.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KarateBrackets4;