import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../utils/autenticacao";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

function handleSubmit(e) {
  e.preventDefault();

  if (
  !email.trim() ||
  !senha.trim()
) {
  toast.error(
    "Preencha email e senha."
  );

  return;
}

  try {
   const usuario = login(
   email.trim().toLowerCase(),
   senha
);

   toast.success(
  `Bem-vindo(a), ${usuario.nome}!`
);

setEmail("");
setSenha("");

setTimeout(() => {
  navigate("/");
}, 1200);

  } catch (err) {
    toast.error(err.message);
  }
}

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <h1>Cofrinho</h1>
          <p>Controle financeiro pessoal</p>
        </div>

        <form onSubmit={handleSubmit}>
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
            Entrar
          </button>
        </form>

        <p className="auth-link">
          Não possui conta?{" "}
          <Link to="/cadastro">
            Cadastre-se
          </Link>
        </p>

      </div>
    </div>
  );
}