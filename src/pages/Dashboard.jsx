export default function Dashboard({ transacoes }) {
  const entradas = transacoes
    .filter((t) => t.tipo === "entrada")
    .reduce((acc, t) => acc + t.valor, 0);

  const saidas = transacoes
    .filter((t) => t.tipo === "saida")
    .reduce((acc, t) => acc + t.valor, 0);

  const total = entradas - saidas;

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div className="dashboard-grid">

        <div className="dashboard-card entrada">
          <h3>Entradas</h3>
          <p>R$ {entradas.toFixed(2)}</p>
        </div>

        <div className="dashboard-card saida">
          <h3>Saídas</h3>
          <p>R$ {saidas.toFixed(2)}</p>
        </div>

        <div className="dashboard-card total">
          <h3>Saldo</h3>
          <p>R$ {total.toFixed(2)}</p>
        </div>

      </div>
    </div>
  );
}