import { Navigate } from "react-router-dom";
import { estaLogado } from "../utils/autenticacao";

export default function RotaProtegida({
  children,
}) {
  if (!estaLogado()) {
    return <Navigate to="/login" />;
  }

  return children;
}