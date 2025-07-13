import { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import RegisterDojo from "./components/RegisterDojo";
import { useAuthStore } from "./store/auth.store";
import ManageStudents from "./components/ManageStudents";
import ChampionshipBrackets from "./components/Categorias3";
import KarateBracketsFINAL from "./components/Brackets";

export default function App() {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Só redireciona se estiver na rota raiz e tiver token
    if (token && location.pathname === "/") {
      navigate("/students", { replace: true });
    }
  }, [token, navigate, location.pathname]);

  const championshipData = {
    brackets: {
      kata: [
        {
          codigoCategoria: "11",
          nomeCategoria: "SUB12/14 M 3° KYU ACIMA",
          atletas: [
            {
              id: 1,
              nome: "Atleta A",
              idade: 12,
              peso: "56.00",
              kyu: "1",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-07T23:21:06.234Z",
              atualizadoEm: "2025-07-07T23:21:06.234Z",
            },
            {
              id: 8,
              nome: "Atleta B",
              idade: 13,
              peso: "58.00",
              kyu: "2",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-07T23:21:06.234Z",
              atualizadoEm: "2025-07-07T23:21:06.234Z",
            },
          ],
          totalAtletas: 2,
        },
        {
          codigoCategoria: "20",
          nomeCategoria: "CADETE/JUNIOR F 9° A 7° KYU",
          atletas: [
            {
              id: 4,
              nome: "teste2",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "8",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-09T06:13:33.643Z",
              atualizadoEm: "2025-07-09T06:13:33.643Z",
            },
            {
              id: 5,
              nome: "teste24",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "9",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-09T06:13:42.260Z",
              atualizadoEm: "2025-07-09T06:13:42.260Z",
            },
            {
              id: 9,
              nome: "Atleta C",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "9",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-09T06:13:42.260Z",
              atualizadoEm: "2025-07-09T06:13:42.260Z",
            },
            {
              id: 10,
              nome: "Atleta D",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "9",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-09T06:13:42.260Z",
              atualizadoEm: "2025-07-09T06:13:42.260Z",
            },
          ],
          totalAtletas: 4,
        },
        {
          codigoCategoria: "22",
          nomeCategoria: "CADETE/JUNIOR F 6° A 4° KYU",
          atletas: [
            {
              id: 2,
              nome: "teste2",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "24.00",
              kyu: "4",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-09T06:13:17.549Z",
              atualizadoEm: "2025-07-09T06:13:17.549Z",
            },
            {
              id: 3,
              nome: "teste2",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "4",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-09T06:13:27.054Z",
              atualizadoEm: "2025-07-09T06:13:27.054Z",
            },
          ],
          totalAtletas: 2,
        },
        {
          codigoCategoria: "24",
          nomeCategoria: "CADETE/JUNIOR F 3° KYU ACIMA",
          atletas: [
            {
              id: 6,
              nome: "teste24",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "57.00",
              kyu: "3",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-09T06:13:54.334Z",
              atualizadoEm: "2025-07-09T06:13:54.334Z",
            },
            {
              id: 7,
              nome: "teste24",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "80.00",
              kyu: "1",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-09T06:14:01.263Z",
              atualizadoEm: "2025-07-09T06:14:01.263Z",
            },
          ],
          totalAtletas: 2,
        },
      ],
      kumite: [
        {
          codigoCategoria: "58",
          nomeCategoria: "JUNIOR F 9° A 6° KYU ATE 55Kg",
          atletas: [
            {
              id: 4,
              nome: "teste2",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "8",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-09T06:13:33.643Z",
              atualizadoEm: "2025-07-09T06:13:33.643Z",
            },
            {
              id: 5,
              nome: "teste24",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "9",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-09T06:13:42.260Z",
              atualizadoEm: "2025-07-09T06:13:42.260Z",
            },
          ],
          totalAtletas: 2,
        },
        {
          codigoCategoria: "60",
          nomeCategoria: "JUNIOR F 5° A 2° KYU ATE 55Kg",
          atletas: [
            {
              id: 2,
              nome: "teste2",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "24.00",
              kyu: "4",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-09T06:13:17.549Z",
              atualizadoEm: "2025-07-09T06:13:17.549Z",
            },
            {
              id: 3,
              nome: "teste2",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "45.00",
              kyu: "4",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-09T06:13:27.054Z",
              atualizadoEm: "2025-07-09T06:13:27.054Z",
            },
          ],
          totalAtletas: 2,
        },
        {
          codigoCategoria: "62",
          nomeCategoria: "JUNIOR F 5° A 2° KYU 55Kg ACIMA",
          atletas: [
            {
              id: 6,
              nome: "teste24",
              idade: 16,
              categoria: 2,
              categoriaKata: null,
              peso: "57.00",
              kyu: "3",
              dan: null,
              dojoId: 2,
              criadoEm: "2025-07-09T06:13:54.334Z",
              atualizadoEm: "2025-07-09T06:13:54.334Z",
            },
          ],
          totalAtletas: 1,
        },
      ],
    },
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dojos" element={<RegisterDojo />} />
      <Route
        path="/students"
        element={token ? <ManageStudents /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/"
        element={<Navigate to={token ? "/students" : "/login"} replace />}
      />
      <Route path="/chaves" element={<KarateBracketsFINAL />} />

      <Route
        path="*"
        element={<Navigate to={token ? "/students" : "/login"} replace />}
      />
    </Routes>
  );
}
