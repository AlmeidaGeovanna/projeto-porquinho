import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [aberto, setAberto] = useState(false);

  function toggleMenu() {
    setAberto(!aberto);
  }

  return (
    <>
      <header className="header">
        <div className="nav-container">
          <button className="menu-icon" onClick={toggleMenu}>
            ☰
          </button>

          <h2 className="logo">Cofrinho</h2>
        </div>
      </header>

      
      {aberto && (
        <div className="menu-overlay" onClick={toggleMenu}></div>
      )}

      <div className={`menu-lateral ${aberto ? "aberto" : ""}`}>
        <Link to="/" onClick={toggleMenu}>Início</Link>
        <Link to="/transacoes" onClick={toggleMenu}>Transações</Link>
        <Link to="/historico" onClick={toggleMenu}>Histórico</Link>
        <Link to="/planejamento" onClick={toggleMenu}>Planejamento</Link>
      </div>
    </>
  );
}