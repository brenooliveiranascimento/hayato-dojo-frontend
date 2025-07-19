import {
  Seed,
  SeedItem,
  SeedTeam,
  type IRenderSeedProps,
} from "react-brackets";
import type { Team } from "../../../services/students.service";
import { Tooltip } from "react-tooltip";

export const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
  const getTeamStyle = (teamName: Team | undefined, index: number) => {
    const backgroundColor = index % 2 !== 0 ? "#4A90E2" : "#D9534F";
    if (teamName?.name === "--- Sem competidor ---") {
      return {
        color: "#E6E7EB",
        fontStyle: "italic",
        backgroundColor,
        minHeight: 30,
        textAlign: "start" as const,
        minWidth: 300,
        padding: "5px 10px",
        cursor: "default",
      };
    }
    return {
      fontWeight: "bold",
      backgroundColor,
      minHeight: 30,
      textAlign: "start" as const,
      minWidth: 300,
      padding: "5px 10px",
      cursor: "pointer",
    };
  };

  // Função para formatar as informações do tooltip
  const getTooltipContent = (team: Team) => {
    if (!team || team.name === "--- Sem competidor ---" || !team.name)
      return "";

    const parts = [];
    if (team.dojo) parts.push(`Dojo: ${team.dojo}`);
    if (team.categoria) parts.push(`Categoria Kumite: ${team.categoria}`);
    if (team.categoriaKata) parts.push(`Categoria Kata: ${team.categoriaKata}`);
    if (team.idade) parts.push(`Idade: ${team.idade} anos`);
    if (team.kyu) parts.push(`Kyu: ${team.kyu}`);
    if (team.dan) parts.push(`Dan: ${team.dan}`);
    if (team.peso) parts.push(`Peso: ${team.peso}kg`);

    return parts.join(" | ");
  };

  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 18 }}>
      <SeedItem>
        <div>
          {/* Primeiro competidor */}
          <div
            data-tooltip-id={`athlete-tooltip-${seed.id}-0-${seed.teams[0]?.name}`}
            data-tooltip-content={getTooltipContent(seed.teams[0] as Team)}
            data-tooltip-place="top"
          >
            <SeedTeam style={getTeamStyle(seed.teams[0] as Team, 0)}>
              {seed.teams[0]?.name || ""}
            </SeedTeam>
          </div>

          {seed.teams[0]?.name &&
            seed.teams[0]?.name !== "--- Sem competidor ---" && (
              <Tooltip
                id={`athlete-tooltip-${seed.id}-0-${seed.teams[0]?.name}`}
                className="custom-tooltip"
                style={{
                  backgroundColor: "#1f2937",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  zIndex: 9999,
                }}
              />
            )}

          <div style={{ height: 1, backgroundColor: "#ddd" }}></div>

          {/* Segundo competidor */}
          <div
            data-tooltip-id={`athlete-tooltip-${seed.id}-1-${seed.teams[1]?.name}`}
            data-tooltip-content={getTooltipContent(seed.teams[1] as Team)}
            data-tooltip-place="top"
          >
            <SeedTeam style={getTeamStyle(seed.teams[1] as Team, 1)}>
              {seed.teams[1]?.name || ""}
            </SeedTeam>
          </div>

          {seed.teams[1]?.name &&
            seed.teams[1]?.name !== "--- Sem competidor ---" && (
              <Tooltip
                id={`athlete-tooltip-${seed.id}-1-${seed.teams[1]?.name}`}
                className="custom-tooltip"
                style={{
                  backgroundColor: "#1f2937",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  zIndex: 9999,
                }}
              />
            )}
        </div>
      </SeedItem>
    </Seed>
  );
};
