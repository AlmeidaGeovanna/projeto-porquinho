import ResumoFinanceiro from "../componentes/ResumoFinanceiro";
import { Link } from "react-router-dom";

export default function Inicio({ transacoes }) {
  return (
    <div className="home">
      <div className="home-topo">
        <h1>Cofrinho</h1>
        <p>Controle suas finanças de forma simples</p>
      </div>

      
      <ResumoFinanceiro transacoes={transacoes} />

      
      <Link to="/transacoes" className="btn-acao">
        + Nova movimentação
      </Link>
    </div>
  );
}