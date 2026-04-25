import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./componentes/Layout";
import Inicio from "./pages/Inicio";
import Transacoes from "./pages/Transacoes";
import Dashboard from "./pages/Dashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    const dados = localStorage.getItem("transacoes");
    if (dados) setTransacoes(JSON.parse(dados));
  }, []);

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
              editando={editando}
              setEditando={setEditando}
            />
          }
        />

        <Route
          path="/dashboard"
          element={<Dashboard transacoes={transacoes} />}
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </Layout>
  );
}
