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
import KarateBracketsFINAL from "./components/Brackets";

export default function App() {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token && location.pathname === "/") {
      navigate("/students", { replace: true });
    }
  }, [token, navigate, location.pathname]);

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
