import { useState, useEffect } from "react";

export default function Formulario({ onSubmit, editando }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [categoria, setCategoria] = useState("");

<<<<<<< HEAD
  // 📂 Categorias separadas
=======
  
>>>>>>> 802c49952ef4f5294b6c0eebb4b200234d5ee8ad
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

  useEffect(() => {
    if (editando) {
      setDescricao(editando.descricao);
      setValor(editando.valor);
      setTipo(editando.tipo);
      setCategoria(editando.categoria || "");
    }
  }, [editando]);

<<<<<<< HEAD
  // 🔁 Troca tipo e limpa categoria
=======
  
>>>>>>> 802c49952ef4f5294b6c0eebb4b200234d5ee8ad
  function handleTipoChange(novoTipo) {
    setTipo(novoTipo);
    setCategoria("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!descricao || !valor || !categoria) {
      alert("Preencha todos os campos!");
      return;
    }

    onSubmit({ descricao, valor, tipo, categoria });

    setDescricao("");
    setValor("");
    setTipo("entrada");
    setCategoria("");
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
        onChange={(e) => handleTipoChange(e.target.value)}
      >
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
      </select>

      <select
        className="input"
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
      >
        <option value="">Selecione a categoria</option>

        {(tipo === "entrada"
          ? categoriasEntrada
          : categoriasSaida
        ).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button className="button-primary">
        {editando ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
}