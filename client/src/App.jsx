import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./componentes/Sidebar";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Devolucion from "./pages/Devolucion";
import Alertas from "./pages/Alertas";
import Caducados from "./pages/Caducados";

const App = () => {
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
            <Route path="/caducados" element={<Caducados />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;