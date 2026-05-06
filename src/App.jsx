<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

=======

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
>>>>>>> 802c49952ef4f5294b6c0eebb4b200234d5ee8ad
import Layout from "./componentes/Layout";
import Inicio from "./pages/Inicio";
import Transacoes from "./pages/Transacoes";
import Historico from "./pages/Historico";
import Planejamento from "./pages/Planejamento";
<<<<<<< HEAD


=======
>>>>>>> 802c49952ef4f5294b6c0eebb4b200234d5ee8ad
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
<<<<<<< HEAD
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

  // 💾 salvar no localStorage
=======
  const [transacoes, setTransacoes] = useState(() => {
    const dados = localStorage.getItem("transacoes");
    return dados ? JSON.parse(dados) : [];
  });

  const [planejamentos, setPlanejamentos] = useState(() => {
    const dados = localStorage.getItem("planejamentos");
    return dados ? JSON.parse(dados) : [];
  });

>>>>>>> 802c49952ef4f5294b6c0eebb4b200234d5ee8ad
  useEffect(() => {
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  }, [transacoes]);

<<<<<<< HEAD
  return (
    <Layout>
      <Routes>


        <Route
          path="/"element={<Inicio transacoes={transacoes} />}/>
=======
  
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

>>>>>>> 802c49952ef4f5294b6c0eebb4b200234d5ee8ad
        <Route
          path="/transacoes"
          element={
            <Transacoes
              transacoes={transacoes}
              setTransacoes={setTransacoes}
            />
          }
        />

<<<<<<< HEAD

=======
>>>>>>> 802c49952ef4f5294b6c0eebb4b200234d5ee8ad
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

<<<<<<< HEAD
      
=======
>>>>>>> 802c49952ef4f5294b6c0eebb4b200234d5ee8ad
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />
    </Layout>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 802c49952ef4f5294b6c0eebb4b200234d5ee8ad
