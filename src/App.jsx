import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./componentes/Layout";
import Inicio from "./pages/Inicio";
import Transacoes from "./pages/Transacoes";
import Dashboard from "./pages/Dashboard";
import Historico from "./pages/Historico";
import Planejamento from "./pages/Planejamento";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [planejamentos, setPlanejamentos] = useState(() => {
    const salvo = localStorage.getItem("planejamentos");
    return salvo ? JSON.parse(salvo) : [];
  });

  // 🔄 carregar do localStorage
  useEffect(() => {
    const dados = localStorage.getItem("transacoes");
    if (dados) {
      setTransacoes(JSON.parse(dados));
    }
  }, []);

  // 💾 salvar no localStorage
  useEffect(() => {
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  }, [transacoes]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />

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
          path="/dashboard"
          element={<Dashboard transacoes={transacoes} />}
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

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />
    </Layout>
  );
}
