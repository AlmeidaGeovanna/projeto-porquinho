import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Historico({ transacoes }) {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  const filtradas = transacoes.filter((t) => {
    if (!t.data) return false;

    const data = new Date(t.data);

    return (
      data.toDateString() ===
      dataSelecionada.toDateString()
    );
  });

  return (
    <div className="container">
      <h2>Histórico</h2>

      <Calendar
        onChange={setDataSelecionada}
        value={dataSelecionada}
      />

      <h3 style={{ marginTop: "20px" }}>
        Transações do dia
      </h3>

      {filtradas.length === 0 && <p>Nenhuma transação</p>}

      {filtradas.map((t) => (
        <div key={t.id} className={`card ${t.tipo}`}>
          <div className="card-info">
            <strong>{t.descricao}</strong>

            <span className="valor">
              {t.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}