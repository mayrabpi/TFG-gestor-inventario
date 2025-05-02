import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./componentes/Sidebar";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Devolucion from "./pages/Devolucion";
import Alertas from "./pages/Alertas";
import Caducados from "./pages/Caducados";
import { getProducts } from "./api";

const App = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => setProductos(response.data))
      .catch((err) => console.error("Error al obtener los productos:", err));
  }, []);

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/devolucion" element={<Devolucion />} />
            <Route path="/alertas" element={<Alertas />} />
            <Route path="/caducados" element={<Caducados productos={productos} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;