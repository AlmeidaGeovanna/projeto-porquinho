import ResumoFinanceiro from "../componentes/ResumoFinanceiro";
import { Link } from "react-router-dom";

export default function Inicio({ transacoes }) {
  return (
    <div className="home">
      <div className="home-topo">
        <h1>Cofrinho</h1>
<<<<<<< HEAD
        <p>Controle suas finanças de forma simples</p>
      </div>

      
      <ResumoFinanceiro transacoes={transacoes} />

      
      <Link to="/transacoes" className="btn-acao">
        + Nova movimentação
      </Link>
    </div>
  );
}
=======
        <p>Organize sua vida financeira de forma simples e inteligente</p>
      </div>

      <ResumoFinanceiro transacoes={transacoes} />

      <Link to="/transacoes" className="btn-acao">
        Nova Transação
      </Link>
    </div>
  );
}

>>>>>>> 802c49952ef4f5294b6c0eebb4b200234d5ee8ad
