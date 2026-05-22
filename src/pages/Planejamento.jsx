import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaCalendarAlt } from "react-icons/fa";

import ModalConfirmacao from "../componentes/ModalConfirmacao";
import ModalEditarPlanejamento from "../componentes/ModalEditarPlanejamento";

const categorias = [
  "Alimentação",
  "Transporte",
  "Lazer",
  "Contas",
  "Outros",
];

export default function Planejamento({
  planejamentos,
  setPlanejamentos,
  transacoes,
  setTransacoes,
}) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [planejamentoEditando, setPlanejamentoEditando] =
    useState(null);

  function handleValor(valorDigitado) {
    const numeros = valorDigitado.replace(/\D/g, "");
    const valorNumero = Number(numeros) / 100;

    const formatado = valorNumero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setValor(formatado);
  }

  useEffect(() => {
    localStorage.setItem(
      "planejamentos",
      JSON.stringify(planejamentos)
    );
  }, [planejamentos]);

  function limparFormulario() {
    setDescricao("");
    setValor("");
    setData("");
    setCategoria("");
  }

  function adicionarPlanejamento(e) {
    e.preventDefault();

    if (!descricao || !valor || !data || !categoria) {
      toast.error("Preencha todos os campos!");
      return;
    }

    const valorNumerico =
      Number(valor.replace(/\D/g, "")) / 100;

    if (valorNumerico <= 0) {
      toast.error("Informe um valor válido!");
      return;
    }

    const novoPlanejamento = {
      id: Date.now(),
      descricao,
      valor: valorNumerico,
      data,
      categoria,
    };

    setPlanejamentos((prev) => [
      ...prev,
      novoPlanejamento,
    ]);

    toast.success("Conta planejada!");

    limparFormulario();
  }

  function editarPlanejamento(planejamento) {
    setPlanejamentoEditando(planejamento);
    setModalEditarAberto(true);
  }

  function salvarEdicaoPlanejamento(atualizado) {
    const atualizados = planejamentos.map((p) =>
      p.id === atualizado.id ? atualizado : p
    );

    setPlanejamentos(atualizados);

    setModalEditarAberto(false);

    toast.info("Planejamento atualizado!");
  }

  function abrirModal(id) {
    setIdParaExcluir(id);
    setModalAberto(true);
  }

  function confirmarExclusao() {
    setPlanejamentos((prev) =>
      prev.filter((p) => p.id !== idParaExcluir)
    );

    setModalAberto(false);

    toast.error("Planejamento removido!");
  }

  function marcarComoPago(item) {
    const novaTransacao = {
      id: Date.now(),
      descricao: item.descricao,
      valor: item.valor,
      tipo: "saida",
      categoria: item.categoria,
      data: new Date().toISOString().split("T")[0],
    };

    setTransacoes((prev) => [...prev, novaTransacao]);

    setPlanejamentos((prev) =>
      prev.filter((p) => p.id !== item.id)
    );

    toast.success("Conta paga!");
  }

  const totalPrevisto = planejamentos.reduce(
    (acc, item) => acc + item.valor,
    0
  );

  const planejamentosOrdenados = [...planejamentos].sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  return (
    <div className="container">
      <h2>Planejamento</h2>

      {/* FORMULÁRIO NOVO */}
      <form className="form" onSubmit={adicionarPlanejamento}>
        <h3 className="form-title">Novo planejamento</h3>

        <div className="form-group">
          <label>Descrição</label>
          <input
            className="input"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Valor</label>
            <input
              className="input"
              value={valor}
              onChange={(e) => handleValor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Data</label>
            <div className="date-wrapper">
              <input
                type="date"
                className="input input-date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              <FaCalendarAlt className="calendar-icon" />
            </div>
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select
              className="input"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecione</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="button-primary">
          Adicionar
        </button>
      </form>

      {/* RESUMO */}
      <div className="card-resumo">
        <p>Total previsto</p>
        <h3>
          {totalPrevisto.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h3>
      </div>

      {/* LISTA */}
      {planejamentosOrdenados.map((p) => (
        <div key={p.id} className="card">
          <div className="card-info">
            <div className="info-texto">
              <strong>{p.descricao}</strong>
              <span className="categoria">{p.categoria}</span>
              <span className="data">
                {p.data.split("-").reverse().join("/")}
              </span>
            </div>

            <span className="valor">
              {p.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <div className="acoes">
            <button
              className="btn-pagar"
              onClick={() => marcarComoPago(p)}
            >
              Pago
            </button>

            <button
              className="btn-editar"
              onClick={() => editarPlanejamento(p)}
            >
              Editar
            </button>

            <button
              className="btn-excluir"
              onClick={() => abrirModal(p.id)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}

      {/* MODAL EXCLUSÃO */}
      {modalAberto && (
        <ModalConfirmacao
          titulo="Excluir planejamento"
          mensagem={`Deseja excluir "${
            planejamentos.find((p) => p.id === idParaExcluir)
              ?.descricao || ""
          }"?`}
          textoConfirmar="Excluir"
          textoCancelar="Cancelar"
          onConfirmar={confirmarExclusao}
          onCancelar={() => setModalAberto(false)}
        />
      )}

      {/* MODAL EDIÇÃO */}
      {modalEditarAberto && planejamentoEditando && (
        <ModalEditarPlanejamento
          planejamento={planejamentoEditando}
          onSalvar={salvarEdicaoPlanejamento}
          onCancelar={() => setModalEditarAberto(false)}
        />
      )}
    </div>
  );
}