export default function ResumoFinanceiro({
  transacoes,
}) {
  const entradas = transacoes
    .filter(
      (t) => t.tipo === "entrada"
    )
    .reduce(
      (acc, t) => acc + t.valor,
      0
    );

  const saidas = transacoes
    .filter(
      (t) => t.tipo === "saida"
    )
    .reduce(
      (acc, t) => acc + t.valor,
      0
    );

  const saldo = entradas - saidas;

  function formatar(valor) {
    return valor.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
  }

  return (
    <div className="dashboard-resumo">
      <div className="card-resumo entrada">
        <p>Entradas</p>

        <h3>
          {formatar(entradas)}
        </h3>
      </div>

      <div className="card-resumo saida">
        <p>Saídas</p>

        <h3>
          {formatar(saidas)}
        </h3>
      </div>

      <div className="card-resumo saldo">
        <p>Saldo</p>

        <h3
          style={{
            color:
              saldo >= 0
                ? "#22c55e"
                : "#ef4444",
          }}
        >
          {formatar(saldo)}
        </h3>
      </div>
    </div>
  );
}