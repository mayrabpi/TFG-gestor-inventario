import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaTimes, FaTachometerAlt, FaHome, FaBox, FaUndo, FaExclamationTriangle, FaCalendarAlt, FaTruck } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="md:hidden top-4 right-4 z-20 fixed bg-blue-500 hover:bg-blue-600 p-2 rounded text-white"
      >
        {isOpen ? "Cerrar" : "Menú"}
      </button>
      <div
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative z-10 bg-gray-700 text-white w-48 md:w-64 h-screen transition-transform`}
      >
        <h1 className="p-4 border-gray-700 border-b font-bold text-2xl">Gestión de Inventario</h1>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            {/* Enlace a la página Home */}
            <li>
              <Link to="/" className="flex items-center hover:text-gray-300">
                <FaHome className="mr-2" /> Home
              </Link>
            </li>
            {/* Enlace al Panel de Control (Inicio) */}
            <li>
              <Link to="/inicio" className="flex items-center hover:text-gray-300">
                <FaTachometerAlt className="mr-2" /> Panel de Control
              </Link>
            </li>
            <li>
              <Link to="/productos" className="flex items-center hover:text-gray-300">
                <FaBox className="mr-2" /> Productos
              </Link>
            </li>
            <li>
              <Link to="/devolucion" className="flex items-center hover:text-gray-300">
                <FaUndo className="mr-2" /> Devolución
              </Link>
            </li>
            <li>
              <Link to="/alertas" className="flex items-center hover:text-gray-300">
                < FaBell className="mr-2" /> Alertas
              </Link>
            </li>
            <li>
              <Link to="/caducados" className="flex items-center hover:text-gray-300">
                <FaCalendarAlt className="mr-2" /> Caducados
              </Link>
            </li>
            <li>
              <Link to="/proveedores" className="flex items-center hover:text-gray-300">
                <FaTruck className="mr-2" /> Proveedores
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;