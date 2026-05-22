import { useState } from "react";
import { toast } from "react-toastify";
import { FaCalendarAlt } from "react-icons/fa";

export default function ModalEditarPlanejamento({
  planejamento,
  onSalvar,
  onCancelar,
}) {
  const [descricao, setDescricao] = useState(
    planejamento.descricao
  );

  const [valor, setValor] = useState(
    Number(planejamento.valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  );

  const [categoria, setCategoria] = useState(
    planejamento.categoria
  );

  const [data, setData] = useState(
    planejamento.data
  );

  const categorias = [
    "Alimentação",
    "Transporte",
    "Lazer",
    "Contas",
    "Outros",
  ];

  function handleValor(valorDigitado) {
    const numeros = valorDigitado.replace(/\D/g, "");
    const valorNumero = Number(numeros) / 100;

    const formatado = valorNumero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setValor(formatado);
  }

  function salvar(e) {
    e.preventDefault();

    const descricaoLimpa = descricao.trim();
    const valorNumerico = Number(valor.replace(/\D/g, "")) / 100;

    if (!descricaoLimpa || !valor || !categoria || !data) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (valorNumerico <= 0) {
      toast.error("Informe um valor válido!");
      return;
    }

    onSalvar({
      ...planejamento,
      descricao: descricaoLimpa,
      valor: valorNumerico,
      categoria,
      data,
    });
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar planejamento</h2>

        <form onSubmit={salvar}>
          <div className="form-group">
            <label>Descrição</label>
            <input
              className="input"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Valor</label>
            <input
              className="input"
              value={valor}
              onChange={(e) => handleValor(e.target.value)}
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
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
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

          <div className="modal-botoes">
            <button
              type="button"
              className="btn-cancelar"
              onClick={onCancelar}
            >
              Cancelar
            </button>

            <button type="submit" className="btn-confirmar">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}