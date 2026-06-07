import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const location = useLocation();

  const paginasPublicas = [
    "/login",
    "/cadastro",
  ];

  const mostrarLayout =
    !paginasPublicas.includes(location.pathname);

  return (
    <div className="app">
      {mostrarLayout && <Header />}

      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>

      {mostrarLayout && <Footer />}
    </div>
  );
}