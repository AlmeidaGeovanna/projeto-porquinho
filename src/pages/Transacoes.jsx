import { useState } from "react";
import { toast } from "react-toastify";
import { FaCalendarAlt } from "react-icons/fa";

import ModalConfirmacao from "../componentes/ModalConfirmacao";
import ModalEditarTransacao from "../componentes/ModalEditarTransacao";

export default function Transacoes({
  transacoes,
  setTransacoes,
}) {
  const [descricao, setDescricao] =
    useState("");

  const [valor, setValor] =
    useState("");

  const [tipo, setTipo] =
    useState("entrada");

  const [categoria, setCategoria] =
    useState("");

  const [data, setData] =
    useState("");

  const [modalAberto, setModalAberto] =
    useState(false);

  const [idParaExcluir, setIdParaExcluir] =
    useState(null);

  const [
    modalEditarAberto,
    setModalEditarAberto,
  ] = useState(false);

  const [
    transacaoEditando,
    setTransacaoEditando,
  ] = useState(null);

  const categoriasEntrada = [
    "Salário",
    "Freelance",
    "Investimentos",
    "Outros",
  ];

  const categoriasSaida = [
    "Alimentação",
    "Transporte",
    "Lazer",
    "Contas",
    "Outros",
  ];

  function handleTipoChange(novoTipo) {
    setTipo(novoTipo);
    setCategoria("");
  }

  function handleValor(valorDigitado) {
    const numeros =
      valorDigitado.replace(/\D/g, "");

    const valorNumero =
      Number(numeros) / 100;

    const formatado =
      valorNumero.toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL",
        }
      );

    setValor(formatado);
  }

  function limparFormulario() {
    setDescricao("");
    setValor("");
    setTipo("entrada");
    setCategoria("");
    setData("");
  }

  function adicionarTransacao(e) {
    e.preventDefault();

    const descricaoLimpa =
      descricao.trim();

    const valorNumerico =
      Number(valor.replace(/\D/g, "")) /
      100;

    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    const dataSelecionada =
      new Date(data);

    if (
      !descricaoLimpa ||
      !valor ||
      !categoria ||
      !data
    ) {
      toast.error(
        "Preencha todos os campos!"
      );

      return;
    }

    if (descricaoLimpa.length < 3) {
      toast.error(
        "Descrição inválida!"
      );

      return;
    }

    if (valorNumerico <= 0) {
      toast.error(
        "Digite um valor válido!"
      );

      return;
    }

    if (dataSelecionada > hoje) {
      toast.error(
        "A data não pode ser futura!"
      );

      return;
    }

    const nova = {
      id: Date.now(),
      descricao: descricaoLimpa,
      valor: valorNumerico,
      tipo,
      categoria,
      data,
    };

    setTransacoes([
      ...transacoes,
      nova,
    ]);

    toast.success(
      "Transação adicionada!"
    );

    limparFormulario();
  }

  function abrirModalEdicao(
    transacao
  ) {
    setTransacaoEditando(transacao);

    setModalEditarAberto(true);
  }

  function salvarEdicao(
    transacaoAtualizada
  ) {
    const atualizadas =
      transacoes.map((t) =>
        t.id ===
          transacaoAtualizada.id
          ? transacaoAtualizada
          : t
      );

    setTransacoes(atualizadas);

    setModalEditarAberto(false);

    toast.success(
      "Transação atualizada!"
    );
  }

  function abrirModal(id) {
    setIdParaExcluir(id);

    setModalAberto(true);
  }

  function confirmarExclusao() {
    setTransacoes(
      transacoes.filter(
        (t) => t.id !== idParaExcluir
      )
    );

    setModalAberto(false);

    toast.error(
      "Transação removida!"
    );
  }

  return (
    <div className="container">
      <h2>Transações</h2>

      <form
        className="form"
        onSubmit={adicionarTransacao}
      >
        <h3 className="form-title">
          Nova transação
        </h3>

        <div className="form-group">
          <label>Descrição</label>

          <input
            type="text"
            className="input"
            placeholder="Ex: Mercado"
            value={descricao}
            onChange={(e) =>
              setDescricao(
                e.target.value
              )
            }
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Valor</label>

            <input
              type="text"
              className="input"
              placeholder="R$ 0,00"
              value={valor}
              onChange={(e) =>
                handleValor(
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>Tipo</label>

            <select
              className="input"
              value={tipo}
              onChange={(e) =>
                handleTipoChange(
                  e.target.value
                )
              }
            >
              <option value="entrada">
                Entrada
              </option>

              <option value="saida">
                Saída
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Categoria</label>

            <select
              className="input"
              value={categoria}
              onChange={(e) =>
                setCategoria(
                  e.target.value
                )
              }
            >
              <option value="">
                Selecione
              </option>

              {(tipo === "entrada"
                ? categoriasEntrada
                : categoriasSaida
              ).map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Data</label>

          <div className="date-wrapper">
            <input
              type="date"
              className="input input-date"
              value={data}
              max={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                setData(
                  e.target.value
                )
              }
            />

            <FaCalendarAlt className="calendar-icon" />
          </div>
        </div>

        <button className="button-primary">
          Adicionar
        </button>
      </form>

      {transacoes.length === 0 ? (
        <div className="empty-state">
          <h3 className="empty-title">
            Nenhuma transação cadastrada
          </h3>
        </div>
      ) : (
        transacoes.map((t) => (
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

            <div className="acoes">
              <button
                className="btn-editar"
                onClick={() =>
                  abrirModalEdicao(t)
                }
              >
                Editar
              </button>

              <button
                className="btn-excluir"
                onClick={() =>
                  abrirModal(t.id)
                }
              >
                Excluir
              </button>
            </div>
          </div>
        ))
      )}

      {modalAberto && (
        <ModalConfirmacao
          titulo="Excluir transação"
          mensagem={`Deseja excluir "${transacoes.find(
            (t) =>
              t.id ===
              idParaExcluir
          )?.descricao
            }"?`}
          textoConfirmar="Excluir"
          textoCancelar="Cancelar"
          onConfirmar={
            confirmarExclusao
          }
          onCancelar={() =>
            setModalAberto(false)
          }
        />
      )}

      {modalEditarAberto &&
        transacaoEditando && (
          <ModalEditarTransacao
            transacao={
              transacaoEditando
            }
            onSalvar={salvarEdicao}
            onCancelar={() =>
              setModalEditarAberto(
                false
              )
            }
          />
        )}
    </div>
  );
}