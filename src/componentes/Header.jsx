import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [aberto, setAberto] = useState(false);

  function toggleMenu() {
    setAberto(!aberto);
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> 802c49952ef4f5294b6c0eebb4b200234d5ee8ad
  );
}