export default function Dashboard({ transacoes }) {
  const entradas = transacoes
    .filter((t) => t.tipo === "entrada")
    .reduce((acc, t) => acc + t.valor, 0);

  const saidas = transacoes
    .filter((t) => t.tipo === "saida")
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = entradas - saidas;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="dashboard-resumo">
        <div className="card-resumo entrada">
          <p>Entradas</p>
          <h3>R$ {entradas.toFixed(2)}</h3>
        </div>

        <div className="card-resumo saida">
          <p>Saídas</p>
          <h3>R$ {saidas.toFixed(2)}</h3>
        </div>

        <div className="card-resumo saldo">
          <p>Saldo</p>
          <h3 style={{ color: saldo >= 0 ? "#22c55e" : "#ef4444" }}>
            R$ {saldo.toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
}