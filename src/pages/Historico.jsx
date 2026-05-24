import { useState } from "react";

export default function Historico({
  transacoes,
}) {
  function formatarData(data) {
    const ano = data.getFullYear();

    const mes = String(
      data.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
      data.getDate()
    ).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  }

  const hoje = new Date();

  const [dataInicio, setDataInicio] =
    useState(
      formatarData(
        new Date(
          hoje.getFullYear(),
          hoje.getMonth(),
          1
        )
      )
    );

  const [dataFim, setDataFim] =
    useState(formatarData(hoje));

  const [busca, setBusca] =
    useState("");

  const [filtroTipo, setFiltroTipo] =
    useState("todas");

  const filtradas = transacoes
    .filter((t) => {
      if (!t.data) return false;

      const matchPeriodo =
        (!dataInicio ||
          t.data >= dataInicio) &&
        (!dataFim ||
          t.data <= dataFim);

      const matchBusca =
        t.descricao
          .toLowerCase()
          .includes(
            busca.toLowerCase()
          );

      const matchTipo =
        filtroTipo === "todas"
          ? true
          : t.tipo === filtroTipo;

      return (
        matchPeriodo &&
        matchBusca &&
        matchTipo
      );
    })
    .sort(
      (a, b) =>
        new Date(b.data) -
        new Date(a.data)
    );

  const totalEntradas =
    filtradas
      .filter(
        (t) => t.tipo === "entrada"
      )
      .reduce(
        (acc, item) =>
          acc + item.valor,
        0
      );

  const totalSaidas = filtradas
    .filter(
      (t) => t.tipo === "saida"
    )
    .reduce(
      (acc, item) =>
        acc + item.valor,
      0
    );

  const saldo =
    totalEntradas - totalSaidas;

  return (
    <div className="container">
      <h2>Histórico</h2>

      <div className="filtros-historico">
        <input
          type="text"
          placeholder="Pesquisar transação..."
          className="input"
          value={busca}
          onChange={(e) =>
            setBusca(e.target.value)
          }
        />

        <div className="filtros-data">
          <input
            type="date"
            className="input"
            value={dataInicio}
            onChange={(e) =>
              setDataInicio(
                e.target.value
              )
            }
          />

          <input
            type="date"
            className="input"
            value={dataFim}
            onChange={(e) =>
              setDataFim(
                e.target.value
              )
            }
          />
        </div>

        <div className="tipo-filtros">
          <button
            type="button"
            className={
              filtroTipo === "todas"
                ? "filtro-btn ativo"
                : "filtro-btn"
            }
            onClick={() =>
              setFiltroTipo("todas")
            }
          >
            Todas
          </button>

          <button
            type="button"
            className={
              filtroTipo ===
              "entrada"
                ? "filtro-btn ativo"
                : "filtro-btn"
            }
            onClick={() =>
              setFiltroTipo(
                "entrada"
              )
            }
          >
            Entradas
          </button>

          <button
            type="button"
            className={
              filtroTipo === "saida"
                ? "filtro-btn ativo"
                : "filtro-btn"
            }
            onClick={() =>
              setFiltroTipo("saida")
            }
          >
            Saídas
          </button>
        </div>
      </div>

      <div className="resumo-historico">
        <div className="resumo-card entradas">
          <span className="resumo-label">
            Entradas
          </span>

          <h3>
            {totalEntradas.toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL",
              }
            )}
          </h3>
        </div>

        <div className="resumo-card saidas">
          <span className="resumo-label">
            Saídas
          </span>

          <h3>
            {totalSaidas.toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL",
              }
            )}
          </h3>
        </div>

        <div className="resumo-card saldo">
          <span className="resumo-label">
            Saldo
          </span>

          <h3>
            {saldo.toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL",
              }
            )}
          </h3>
        </div>
      </div>

   {filtradas.length > 0 ? (
  <h3 className="titulo-transacoes">
    Transações encontradas
  </h3>
) : (
  <div className="estado-vazio">
    <div className="icone-vazio">
      💸
    </div>

    <h3>
      Nenhuma transação encontrada
    </h3>

    <p>
      Tente alterar os filtros
      ou adicionar novas
      transações.
    </p>
  </div>
)}

      {filtradas.map((t) => (
        <div
          key={t.id}
          className={`card ${t.tipo}`}
        >
          <div className="card-info">
            <div className="info-texto">
              <strong>
                {t.descricao}
              </strong>

              <span className="categoria">
                {t.categoria ||
                  "Outros"}
              </span>

              <span className="data">
                {t.data
                  .split("-")
                  .reverse()
                  .join("/")}
              </span>
            </div>

            <span className="valor">
              {t.valor.toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}