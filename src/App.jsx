
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./componentes/Layout";
import Inicio from "./pages/Inicio";
import Transacoes from "./pages/Transacoes";
import Historico from "./pages/Historico";
import Planejamento from "./pages/Planejamento";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  const [transacoes, setTransacoes] = useState(() => {
    const dados = localStorage.getItem("transacoes");
    return dados ? JSON.parse(dados) : [];
  });

  const [planejamentos, setPlanejamentos] = useState(() => {
    const dados = localStorage.getItem("planejamentos");
    return dados ? JSON.parse(dados) : [];
  });

  useEffect(() => {
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  }, [transacoes]);

  
  useEffect(() => {
    localStorage.setItem("planejamentos", JSON.stringify(planejamentos));
  }, [planejamentos]);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Inicio transacoes={transacoes} />}
        />

        <Route
          path="/transacoes"
          element={
            <Transacoes
              transacoes={transacoes}
              setTransacoes={setTransacoes}
            />
          }
        />

        <Route
          path="/historico"
          element={<Historico transacoes={transacoes} />}
        />

        <Route
          path="/planejamento"
          element={
            <Planejamento
              planejamentos={planejamentos}
              setPlanejamentos={setPlanejamentos}
              transacoes={transacoes}
              setTransacoes={setTransacoes}
            />
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />
    </Layout>
  );
}

