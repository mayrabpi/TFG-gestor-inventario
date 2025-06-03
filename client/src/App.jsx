import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./componentes/Sidebar";
import Home from "./pages/Home";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Devolucion from "./pages/Devolucion";
import Alertas from "./pages/Alertas";
import Caducados from "./pages/Caducados";
import Proveedores from "./pages/Proveedores";
import Ventas from "./pages/Ventas";
import { getProducts } from "./api";
import Inventario from "./pages/Inventario";
import ManualUsuario from "./pages/ManualUsuario";
import { FaBars } from "react-icons/fa";

// Componente para manejar la lógica del sidebar
const AppContent = () => {
  const [productos, setProductos] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Determinar si estamos en una página sin sidebar
  const noSidebarPage = location.pathname === "/ventas" || location.pathname === "/";
  
  // Determinar si estamos específicamente en la página Home
  const isHomePage = location.pathname === "/";
  
  // Determinar si estamos en la página de ventas
  const isVentasPage = location.pathname === "/ventas";

  useEffect(() => {
    getProducts()
      .then((response) => setProductos(response.data))
      .catch((err) => console.error("Error al obtener los productos:", err));
  }, []);

  return (
    <div className="flex">
      {/* Sidebar condicional */}
      {noSidebarPage ? (
        // En página de ventas o home, sin botón de sidebar
        <>
          {/* El botón fue eliminado - ya no se muestra en ninguna página */}
          
          {/* Sidebar flotante cuando se abre (se mantiene aunque no hay forma de abrirlo desde UI) */}
          {sidebarOpen && (
            <>
              {/* Overlay para cerrar el sidebar al hacer clic fuera */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-30 z-10"
                onClick={() => setSidebarOpen(false)}
              ></div>
              
              {/* Sidebar con función para cerrarse */}
              <div className="fixed top-0 left-0 z-20 h-screen">
                <Sidebar onClose={() => setSidebarOpen(false)} />
              </div>
            </>
          )}
        </>
      ) : (
        // En otras páginas, mostrar sidebar normal
        <Sidebar />
      )}

      {/* Contenido principal */}
      <div className={`${noSidebarPage ? "w-full" : "flex-1"} p-4`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/devolucion" element={<Devolucion />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/caducados" element={<Caducados productos={productos} />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/manual" element={<ManualUsuario />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;