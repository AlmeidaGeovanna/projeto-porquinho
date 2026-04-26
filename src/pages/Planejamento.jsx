import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ModalConfirmacao from "../componentes/ModalConfirmacao";

export default function Planejamento({
  planejamentos,
  setPlanejamentos,
  transacoes,
  setTransacoes
}) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");

  const [editandoId, setEditandoId] = useState(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  const categorias = [
    "Alimentação",
    "Transporte",
    "Lazer",
    "Contas",
    "Outros"
  ];

  // 💰 máscara de valor
  function handleValor(valorDigitado) {
    let numeros = valorDigitado.replace(/\D/g, "");
    let valorNumero = Number(numeros) / 100;

    let formatado = valorNumero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setValor(formatado);
  }

  // 💾 salvar no localStorage
  useEffect(() => {
    localStorage.setItem(
      "planejamentos",
      JSON.stringify(planejamentos)
    );
  }, [planejamentos]);

  function adicionarPlanejamento(e) {
    e.preventDefault();

    if (!descricao || !valor || !data || !categoria) {
      toast.error("Preencha todos os campos!");
      return;
    }

    const valorNumerico =
      Number(valor.replace(/\D/g, "")) / 100;

    if (editandoId) {
      const atualizados = planejamentos.map((p) =>
        p.id === editandoId
          ? {
              ...p,
              descricao,
              valor: valorNumerico,
              data,
              categoria,
            }
          : p
      );

      setPlanejamentos(atualizados);
      setEditandoId(null);

      toast.info("Planejamento atualizado!");
    } else {
      const novo = {
        id: Date.now(),
        descricao,
        valor: valorNumerico,
        data,
        categoria,
      };

      setPlanejamentos([...planejamentos, novo]);

      toast.success("Conta planejada!");
    }

    setDescricao("");
    setValor("");
    setData("");
    setCategoria("");
  }

  function editarPlanejamento(p) {
    setDescricao(p.descricao);

    const formatado = p.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setValor(formatado);
    setData(p.data);
    setCategoria(p.categoria);

    setEditandoId(p.id);
  }

  function abrirModal(id) {
    setIdParaExcluir(id);
    setModalAberto(true);
  }

  function confirmarExclusao() {
    setPlanejamentos(
      planejamentos.filter((p) => p.id !== idParaExcluir)
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
      data: new Date().toISOString(),
    };

    setTransacoes([...transacoes, novaTransacao]);

    setPlanejamentos(
      planejamentos.filter((p) => p.id !== item.id)
    );

    toast.success("Conta paga!");
  }

  const totalPrevisto = planejamentos.reduce(
    (acc, p) => acc + p.valor,
    0
  );

  return (
    <div className="container">
      <h2>Planejamento</h2>

      {/* FORM */}
      <form className="form" onSubmit={adicionarPlanejamento}>
        <h3 className="form-title">
          {editandoId ? "Editar planejamento" : "Novo planejamento"}
        </h3>

        <div className="form-group">
          <label>Descrição</label>
          <input
            type="text"
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
            <label>Data</label>
            <input
              type="date"
              className="input"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
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
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="button-primary">
          {editandoId ? "Salvar alteração" : "Adicionar"}
        </button>
      </form>

      {/* RESUMO */}
      <div className="resumo">
        <strong>
          Total previsto:{" "}
          {totalPrevisto.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </strong>
      </div>

      {/* LISTA */}
      {planejamentos.map((p) => (
        <div key={p.id} className="card">
          <div className="card-info">
            <div className="info-texto">
              <strong>{p.descricao}</strong>

              <span className="categoria">
                {p.categoria}
              </span>

              <span className="data">
                {new Date(p.data).toLocaleDateString("pt-BR")}
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
              onClick={() => marcarComoPago(p)}>
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

     {modalAberto && (
  <ModalConfirmacao
    titulo="Excluir planejamento"
    mensagem={`Deseja excluir "${
      planejamentos.find(p => p.id === idParaExcluir)?.descricao || ""
    }"?`}
    textoConfirmar="Excluir"
    textoCancelar="Cancelar"
    onConfirmar={confirmarExclusao}
    onCancelar={() => setModalAberto(false)}
  />
)}
    </div>
  );
}