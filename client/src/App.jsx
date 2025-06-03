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
      {isVentasPage ? (
        // En página de ventas, mostrar solo botón de acceso al sidebar
        <>
          {/* Botón para mostrar sidebar */}
          <button 
            onClick={() => setSidebarOpen(true)}
            className={`${sidebarOpen ? 'hidden' : 'block'} fixed z-20 top-4 left-4 bg-blue-500 hover:bg-blue-600 p-2 rounded-full shadow-lg text-white transition-all duration-300`}
            aria-label="Abrir menú"
          >
            <FaBars size={18} />
          </button>
          
          {/* Sidebar flotante cuando se abre */}
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
      <div className={`${isVentasPage ? "w-full" : "flex-1"} p-4`}>
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