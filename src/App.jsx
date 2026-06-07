import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./componentes/Layout";

import Inicio from "./pages/Inicio";
import Transacoes from "./pages/Transacoes";
import Historico from "./pages/Historico";
import Planejamento from "./pages/Planejamento";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

import RotaProtegida from "./componentes/RotaProtegida";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

export default function App() {
  const [transacoes, setTransacoes] = useState([]);

  const [planejamentos, setPlanejamentos] = useState(() => {
    const salvo = localStorage.getItem("planejamentos");
    return salvo ? JSON.parse(salvo) : [];
  });

  useEffect(() => {
    const dados = localStorage.getItem("transacoes");

    if (dados) {
      setTransacoes(JSON.parse(dados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "transacoes",
      JSON.stringify(transacoes)
    );
  }, [transacoes]);

  useEffect(() => {
    localStorage.setItem(
      "planejamentos",
      JSON.stringify(planejamentos)
    );
  }, [planejamentos]);

  return (
    <Layout>
      <Routes>

        {/* Rotas públicas */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        {/* Rotas protegidas */}

        <Route
          path="/"
          element={
            <RotaProtegida>
              <Inicio transacoes={transacoes} />
            </RotaProtegida>
          }
        />

        <Route
          path="/transacoes"
          element={
            <RotaProtegida>
              <Transacoes
                transacoes={transacoes}
                setTransacoes={setTransacoes}
              />
            </RotaProtegida>
          }
        />

        <Route
          path="/historico"
          element={
            <RotaProtegida>
              <Historico
                transacoes={transacoes}
              />
            </RotaProtegida>
          }
        />

        <Route
          path="/planejamento"
          element={
            <RotaProtegida>
              <Planejamento
                planejamentos={planejamentos}
                setPlanejamentos={setPlanejamentos}
                transacoes={transacoes}
                setTransacoes={setTransacoes}
              />
            </RotaProtegida>
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
