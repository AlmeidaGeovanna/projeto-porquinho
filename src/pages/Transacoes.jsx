import { useState } from "react";
import { toast } from "react-toastify";
import ModalConfirmacao from "../componentes/ModalConfirmacao";

export default function Transacoes({ transacoes, setTransacoes }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("entrada");

  const [editandoId, setEditandoId] = useState(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  // 💰 MÁSCARA DE VALOR
  function handleValor(valorDigitado) {
    let numeros = valorDigitado.replace(/\D/g, "");
    let valorNumero = Number(numeros) / 100;

    let formatado = valorNumero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setValor(formatado);
  }

  function adicionarTransacao(e) {
    e.preventDefault();

    if (!descricao || !valor) {
      toast.error("Preencha todos os campos!");
      return;
    }

    const valorNumerico =
      Number(valor.replace(/\D/g, "")) / 100;

    if (editandoId) {
      const atualizadas = transacoes.map((t) =>
        t.id === editandoId
          ? {
              ...t,
              descricao,
              valor: valorNumerico,
              tipo,
            }
          : t
      );

      setTransacoes(atualizadas);
      setEditandoId(null);

      toast.info("Transação atualizada!");
    } else {
      const nova = {
        id: Date.now(),
        descricao,
        valor: valorNumerico,
        tipo,
        data: new Date().toISOString(),
      };

      setTransacoes([...transacoes, nova]);

      toast.success("Transação adicionada!");
    }

    setDescricao("");
    setValor("");
    setTipo("entrada");
  }

  function editarTransacao(t) {
    setDescricao(t.descricao);

    // 💰 formata valor ao editar
    const formatado = t.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setValor(formatado);
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

    toast.error("Transação removida!");
  }

  return (
    <div className="container">
      <h2>Transações</h2>

      {/* FORM */}
      <form className="form" onSubmit={adicionarTransacao}>
        <h3 className="form-title">
          {editandoId ? "Editar transação" : "Nova transação"}
        </h3>

        <div className="form-group">
          <label>Descrição</label>
          <input
            type="text"
            placeholder="Ex: Mercado, Salário..."
            className="input"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Valor</label>
            <input
              type="text"
              placeholder="R$ 0,00"
              className="input"
              value={valor}
              onChange={(e) => handleValor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tipo</label>
            <select
              className="input"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>
        </div>

        <button className="button-primary">
          {editandoId ? "Salvar alteração" : "Adicionar"}
        </button>
      </form>

      {/* LISTA */}
      {transacoes.map((t) => (
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