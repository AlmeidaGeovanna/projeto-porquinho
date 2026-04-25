import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="nav-container">

        <h2 className="logo">
          🐷 Cofrinho
        </h2>

        <nav className="menu">
          <Link to="/" className="menu-btn">Início</Link>
          <Link to="/transacoes" className="menu-btn">Transações</Link>
          <Link to="/dashboard" className="menu-btn">Dashboard</Link>
          <Link to="/historico" className="menu-btn">Histórico</Link>
        </nav>

      </div>
    </header>
  );
}