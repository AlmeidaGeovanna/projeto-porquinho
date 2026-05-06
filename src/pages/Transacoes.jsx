import { useState } from "react";
import { toast } from "react-toastify";
import ModalConfirmacao from "../componentes/ModalConfirmacao";

export default function Transacoes({ transacoes, setTransacoes }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [categoria, setCategoria] = useState("");

  const [editandoId, setEditandoId] = useState(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  // 📂 Categorias separadas
  const categoriasEntrada = [
    "Salário",
    "Freelance",
    "Investimentos",
    "Outros"
  ];

  const categoriasSaida = [
    "Alimentação",
    "Transporte",
    "Lazer",
    "Contas",
    "Outros"
  ];

  // 🔁 Troca tipo + reseta categoria
  function handleTipoChange(novoTipo) {
    setTipo(novoTipo);
    setCategoria("");
  }

  // 💰 Máscara de valor
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

    if (!descricao || !valor || !categoria) {
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
            categoria,
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
        categoria,
        data: new Date().toISOString(),
      };

      setTransacoes([...transacoes, nova]);

      toast.success("Transação adicionada!");
    }

    // reset
    setDescricao("");
    setValor("");
    setTipo("entrada");
    setCategoria("");
  }

  function editarTransacao(t) {
    setDescricao(t.descricao);

    const formatado = t.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setValor(formatado);
    setTipo(t.tipo);
    setCategoria(t.categoria || "");
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

      <form className="form" onSubmit={adicionarTransacao}>
        <h3 className="form-title">
          {editandoId ? "Editar transação" : "Nova transação"}
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
              onChange={(e) => handleTipoChange(e.target.value)}
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select
              className="input"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecione</option>

              {(tipo === "entrada"
                ? categoriasEntrada
                : categoriasSaida
              ).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="button-primary">
          {editandoId ? "Salvar alteração" : "Adicionar"}
        </button>
      </form>

      {transacoes.map((t) => (
        <div key={t.id} className={`card ${t.tipo}`}>
          <div className="card-info">

            <div className="info-texto">
              <strong>{t.descricao}</strong>

              <span className="categoria">
                {t.categoria || "Outros"}
              </span>

              <span className="data">
                {new Date(t.data).toLocaleDateString("pt-BR")}
              </span>
            </div>


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

      {modalAberto && (
        <ModalConfirmacao
          titulo="Excluir transação"
          mensagem={`Deseja excluir "${transacoes.find(t => t.id === idParaExcluir)?.descricao
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