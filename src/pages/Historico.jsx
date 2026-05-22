import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Historico({
  transacoes,
}) {
  const [dataSelecionada, setDataSelecionada] =
    useState(new Date());

  const [busca, setBusca] = useState("");

  const [filtroTipo, setFiltroTipo] =
    useState("todas");

  const [periodo, setPeriodo] =
    useState("dia");

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

  const dataFormatada =
    formatarData(dataSelecionada);

  const mesSelecionado =
    dataFormatada.slice(0, 7);

  const anoSelecionado =
    dataFormatada.slice(0, 4);

  const filtradas = transacoes
    .filter((t) => {
      if (!t.data) return false;

      let matchPeriodo = false;

      if (periodo === "dia") {
        matchPeriodo =
          t.data === dataFormatada;
      }

      if (periodo === "mes") {
        matchPeriodo =
          t.data.slice(0, 7) ===
          mesSelecionado;
      }

      if (periodo === "ano") {
        matchPeriodo =
          t.data.slice(0, 4) ===
          anoSelecionado;
      }

      if (periodo === "todas") {
        matchPeriodo = true;
      }

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

        <div className="tipo-filtros">
          <button
            type="button"
            className={
              periodo === "dia"
                ? "filtro-btn ativo"
                : "filtro-btn"
            }
            onClick={() =>
              setPeriodo("dia")
            }
          >
            Dia
          </button>

          <button
            type="button"
            className={
              periodo === "mes"
                ? "filtro-btn ativo"
                : "filtro-btn"
            }
            onClick={() =>
              setPeriodo("mes")
            }
          >
            Mês
          </button>

          <button
            type="button"
            className={
              periodo === "ano"
                ? "filtro-btn ativo"
                : "filtro-btn"
            }
            onClick={() =>
              setPeriodo("ano")
            }
          >
            Ano
          </button>

          <button
            type="button"
            className={
              periodo === "todas"
                ? "filtro-btn ativo"
                : "filtro-btn"
            }
            onClick={() =>
              setPeriodo("todas")
            }
          >
            Todas
          </button>
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
              filtroTipo === "entrada"
                ? "filtro-btn ativo"
                : "filtro-btn"
            }
            onClick={() =>
              setFiltroTipo("entrada")
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

      {periodo !== "todas" && (
        <Calendar
          onChange={setDataSelecionada}
          value={dataSelecionada}
        />
      )}
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

      <h3 style={{ marginTop: "20px" }}>
        Transações encontradas
      </h3>

      {filtradas.length === 0 && (
        <p>Nenhuma transação</p>
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