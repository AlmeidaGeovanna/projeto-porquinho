import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [aberto, setAberto] = useState(false);

  function toggleMenu() {
    setAberto(!aberto);
  }

  function fecharMenu() {
    setAberto(false);
  }

  const links = [
    { to: "/", label: "Início" },
    { to: "/transacoes", label: "Transações" },
    { to: "/historico", label: "Histórico" },
    { to: "/planejamento", label: "Planejamento" },
  ];

  return (
    <>
      <header className="header">
        <div className="nav-container">

          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            {aberto ? "✕" : "☰"}
          </button>

          <h2 className="logo">Cofrinho</h2>

          <nav className="menu">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "menu-btn ativo"
                    : "menu-btn"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {aberto && (
        <div
          className="menu-overlay"
          onClick={fecharMenu}
        />
      )}

      <nav
        className={`menu-mobile ${aberto ? "open" : ""
          }`}
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={fecharMenu}
            className={({ isActive }) =>
              isActive ? "ativo" : ""
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}