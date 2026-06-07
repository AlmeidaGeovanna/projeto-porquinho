export function getUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

export function cadastrarUsuario(usuario) {
  const usuarios = getUsuarios();

 const existe = usuarios.find(
  (u) =>
    u.email.toLowerCase() ===
    usuario.email.toLowerCase()
);

  if (existe) {
    throw new Error("Este email já está cadastrado.");
  }

  usuarios.push(usuario);

  localStorage.setItem(
    "usuarios",
    JSON.stringify(usuarios)
  );
}

export function login(email, senha) {
  const usuarios = getUsuarios();

 const usuario = usuarios.find(
  (u) =>
    u.email.toLowerCase() ===
    email.toLowerCase()
);

  if (!usuario) {
    throw new Error("Usuário não encontrado.");
  }

  if (usuario.senha !== senha) {
    throw new Error("Senha incorreta.");
  }

  localStorage.setItem(
    "usuarioLogado",
    JSON.stringify(usuario)
  );

  return usuario;
}

export function logout() {
  localStorage.removeItem("usuarioLogado");
}

export function getUsuarioLogado() {
  return JSON.parse(
    localStorage.getItem("usuarioLogado")
  );
}

export function estaLogado() {
  return !!getUsuarioLogado();
}