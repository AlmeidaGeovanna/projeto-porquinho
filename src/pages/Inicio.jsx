import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="home">
      <h1>Bem-vindo ao Cofrinho</h1>

      <div className="home-botoes">
        <Link to="/transacoes" className="btn-home">
          Transações
        </Link>

        <Link to="/dashboard" className="btn-home">
          Dashboard
        </Link>
      </div>
    </div>
  );
}