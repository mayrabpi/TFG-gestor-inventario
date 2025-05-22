import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./componentes/Sidebar";
import Home from "./pages/Home"; // Importa la página Home
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Devolucion from "./pages/Devolucion";
import Alertas from "./pages/Alertas";
import Caducados from "./pages/Caducados";
import Proveedores from "./pages/Proveedores";
import Ventas from "./pages/Ventas"; // Importa la página de ventas
import { getProducts } from "./api";
import Inventario from "./pages/Inventario";

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
            <Route path="/" element={<Home />} /> {/* Ruta para la página Home */}
            <Route path="/inicio" element={<Inicio />} /> {/* Ruta para el control de stock */}
            <Route path="/productos" element={<Productos />} />
            <Route path="/devolucion" element={<Devolucion />} />
            <Route path="/alertas" element={<Alertas />} />
            <Route path="/caducados" element={<Caducados productos={productos} />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/ventas" element={<Ventas />} /> {/* Ruta para la página de ventas */}
            <Route path="/inventario" element={<Inventario />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;