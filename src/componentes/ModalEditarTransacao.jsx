import { useState } from "react";
import { toast } from "react-toastify";
import { FaCalendarAlt } from "react-icons/fa";

export default function ModalEditarTransacao({
    transacao,
    onSalvar,
    onCancelar,
}) {
    const [descricao, setDescricao] =
        useState(transacao.descricao);

    const [valor, setValor] = useState(
        transacao.valor.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
            }
        )
    );

    const [tipo, setTipo] = useState(
        transacao.tipo
    );

    const [categoria, setCategoria] =
        useState(transacao.categoria);

    const [data, setData] = useState(
        transacao.data
    );

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

    function salvarEdicao(e) {
        e.preventDefault();

        const descricaoLimpa =
            descricao.trim();

        const valorNumerico =
            Number(valor.replace(/\D/g, "")) /
            100;

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
                "Descrição muito curta!"
            );

            return;
        }

        if (valorNumerico <= 0) {
            toast.error(
                "Digite um valor válido!"
            );

            return;
        }

        onSalvar({
            ...transacao,
            descricao: descricaoLimpa,
            valor: valorNumerico,
            tipo,
            categoria,
            data,
        });
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Editar transação</h2>

                <form onSubmit={salvarEdicao}>
                    <div className="form-group">
                        <label>Descrição</label>

                        <input
                            type="text"
                            className="input"
                            value={descricao}
                            onChange={(e) =>
                                setDescricao(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Valor</label>

                        <input
                            type="text"
                            className="input"
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
                                setTipo(
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
                                    setData(e.target.value)
                                }
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

                        <button
                            type="submit"
                            className="btn-confirmar"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}