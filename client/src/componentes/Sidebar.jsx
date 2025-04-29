import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <h1 className="text-2xl font-bold p-4 border-b border-gray-700">Gestión de Inventario</h1>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/productos" className="hover:text-gray-300">
              Productos
            </Link>
          </li>
          <li>
            <Link to="/devolucion" className="hover:text-gray-300">
              Devolución
            </Link>
          </li>
          <li>
            <Link to="/alertas" className="hover:text-gray-300">
              Alertas
            </Link>
          </li>
          <li>
            <Link to="/caducados" className="hover:text-gray-300">
              Caducados
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;