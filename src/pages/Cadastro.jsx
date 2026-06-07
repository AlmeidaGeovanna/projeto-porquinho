import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {cadastrarUsuario,} from "../utils/Autenticacao";

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  

function handleSubmit(e) {
  e.preventDefault();

  if (
  !nome.trim() ||
  !email.trim() ||
  !senha.trim()
) {
  toast.error(
    "Preencha todos os campos."
  );

  return;
}

  try {
    cadastrarUsuario({
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
    senha,
});

    toast.success(
  "Conta criada com sucesso!"
);

setNome("");
setEmail("");
setSenha("");

setTimeout(() => {
  navigate("/login");
}, 1500);

  } catch (err) {
    toast.error(err.message);
  }
}

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <h1>Criar Conta</h1>
          <p>Comece a controlar suas finanças</p>
        </div>


        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Nome</label>

            <input
              type="text"
              value={nome}
              onChange={(e) =>
                setNome(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>

            <input
              type="password"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="button-primary"
          >
            Criar Conta
          </button>

        </form>

        <p className="auth-link">
          Já possui conta?{" "}
          <Link to="/login">
            Entrar
          </Link>
        </p>

      </div>
    </div>
  );
}