import { useState, useEffect } from "react";

export default function Formulario({ onSubmit, editando }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("entrada");

  useEffect(() => {
    if (editando) {
      setDescricao(editando.descricao);
      setValor(editando.valor);
      setTipo(editando.tipo);
    }
  }, [editando]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({ descricao, valor, tipo });

    setDescricao("");
    setValor("");
    setTipo("entrada");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="Descrição"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
      />

      <input
        className="input"
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={e => setValor(e.target.value)}
      />

      <select
        className="input"
        value={tipo}
        onChange={e => setTipo(e.target.value)}
      >
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
      </select>

      <button className="button-primary">
        {editando ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
}