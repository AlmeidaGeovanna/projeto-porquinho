import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [aberto, setAberto] = useState(false);

  function toggleMenu() {
    setAberto(!aberto);
  }

  function fecharMenu() {
    setAberto(false);
  }

  return (
    <header className="header">
      <div className="nav-container">
        <h2 className="logo">Cofrinho</h2>

        
        <nav className="menu">
          <Link to="/" className="menu-btn">Início</Link>
          <Link to="/historico" className="menu-btn">Histórico</Link>
          <Link to="/planejamento" className="menu-btn">Planejamento</Link>
        </nav>

        
        <button className="menu-toggle" onClick={toggleMenu}>
          {aberto ? "✕" : "☰"}
        </button>
      </div>

      
      <nav className={`menu-mobile ${aberto ? "open" : ""}`}>
        <Link to="/" onClick={fecharMenu}>Início</Link>
        <Link to="/historico" onClick={fecharMenu}>Histórico</Link>
        <Link to="/planejamento" onClick={fecharMenu}>Planejamento</Link>
      </nav>
    </header>
  );
}