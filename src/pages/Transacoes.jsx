import { useState } from "react";
import ModalConfirmacao from "../componentes/ModalConfirmacao";

export default function Transacoes({ transacoes, setTransacoes }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("entrada");

  const [editandoId, setEditandoId] = useState(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  function adicionarTransacao(e) {
    e.preventDefault();

    if (!descricao || !valor) return;

    if (editandoId) {
      const atualizadas = transacoes.map((t) =>
        t.id === editandoId
          ? { ...t, descricao, valor: Number(valor), tipo }
          : t
      );

      setTransacoes(atualizadas);
      setEditandoId(null);
    } else {
      const nova = {
        id: Date.now(),
        descricao,
        valor: Number(valor),
        tipo,
      };

      setTransacoes([...transacoes, nova]);
    }

    setDescricao("");
    setValor("");
    setTipo("entrada");
  }

  function editarTransacao(t) {
    setDescricao(t.descricao);
    setValor(t.valor);
    setTipo(t.tipo);
    setEditandoId(t.id);
  }

  function abrirModal(id) {
    setIdParaExcluir(id);
    setModalAberto(true);
  }

  function confirmarExclusao() {
    setTransacoes(transacoes.filter((t) => t.id !== idParaExcluir));
    setModalAberto(false);
  }

  return (
    <div className="container">
      <h2>Transações</h2>

      {/* FORM */}
      <form className="form" onSubmit={adicionarTransacao}>
        <input
          type="text"
          placeholder="Descrição"
          className="input"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          className="input"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <select
          className="input"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>

        <button className="button-primary">
          {editandoId ? "Salvar" : "Adicionar"}
        </button>
      </form>

      {/* LISTA */}
      {transacoes.map((t) => (
        <div key={t.id} className={`card ${t.tipo}`}>
          <div className="card-info">
            <strong>{t.descricao}</strong>
            <span className="valor">R$ {t.valor.toFixed(2)}</span>
          </div>

          <div className="acoes">
            <button
              className="btn-editar"
              onClick={() => editarTransacao(t)}
            >
              Editar
            </button>

            <button
              className="btn-excluir"
              onClick={() => abrirModal(t.id)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}

      {/* MODAL */}
      {modalAberto && (
        <ModalConfirmacao
          onConfirmar={confirmarExclusao}
          onCancelar={() => setModalAberto(false)}
        />
      )}
    </div>
  );
}