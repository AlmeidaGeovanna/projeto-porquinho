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

  const dataSelecionadaFormatada =
    dataSelecionada
      .toISOString()
      .split("T")[0];

  const filtradas = transacoes.filter((t) => {
    if (!t.data) return false;

    const mesmaData =
      t.data === dataSelecionadaFormatada;

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
      mesmaData &&
      matchBusca &&
      matchTipo
    );
  });

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

      <Calendar
        onChange={setDataSelecionada}
        value={dataSelecionada}
      />

      <h3 style={{ marginTop: "20px" }}>
        Transações do dia
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