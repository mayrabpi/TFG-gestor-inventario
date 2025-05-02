import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import ModificarFechaButton from "../componentes/ModificarFechaButton";
import { updateProduct } from "../api";
import { useNavigate } from "react-router-dom";

const Caducados = ({ productos = [] }) => {
  console.log("Productos recibidos:", productos);
  const [view, setView] = useState("proximos");
  const navigate = useNavigate();

  const today = new Date();

  const proximosACaducar = productos.filter((producto) => {
    if (!producto.perishable || !producto.expirationDate) return false;
    const fechaCaducidad = new Date(producto.expirationDate);
    const diffDays = Math.ceil((fechaCaducidad - today) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 3; // Cambié a 3 días para próximos a caducar
  });

  const caducados = productos.filter((producto) => {
    if (!producto.perishable || !producto.expirationDate) return false;
    const fechaCaducidad = new Date(producto.expirationDate);
    return fechaCaducidad < today;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Control de Caducidad</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setView("proximos")}
          className={`px-4 py-2 rounded ${
            view === "proximos" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Próximos a caducar ({proximosACaducar.length})
        </button>
        <button
          onClick={() => setView("caducados")}
          className={`px-4 py-2 rounded ${
            view === "caducados" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Caducados ({caducados.length})
        </button>
      </div>

      {view === "proximos" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proximosACaducar.map((producto) => {
            const fechaCaducidad = new Date(producto.expirationDate);
            const diffDays = Math.ceil((fechaCaducidad - today) / (1000 * 60 * 60 * 24));
            return (
              <div key={producto.id} className="p-4 border rounded shadow">
                <h2 className="text-lg font-bold">{producto.name}</h2>
                <span className="text-sm bg-orange-200 text-orange-800 px-2 py-1 rounded">
                  Próximo a caducar
                </span>
                <p>{producto.units} en stock</p>
                <p className="text-gray-600">{producto.expirationDate}</p>
                <p>Caduca en {diffDays} días</p>
                <ModificarFechaButton
                  producto={producto}
                  onFechaModificada={(nuevaFecha) => {
                    producto.expirationDate = nuevaFecha;
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      {view === "caducados" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {caducados.map((producto) => (
            <div key={producto.id} className="p-4 border rounded shadow">
              <h2 className="text-lg font-bold">{producto.name}</h2>
              <span className="text-sm bg-red-200 text-red-800 px-2 py-1 rounded">
                Caducado
              </span>
              <p>{producto.units} en stock</p>
              <p className="text-gray-600">{producto.expirationDate}</p>
              <ModificarFechaButton
                producto={producto}
                onFechaModificada={(nuevaFecha) => {
                  producto.expirationDate = nuevaFecha;
                }}
              />
              <button
                onClick={() => navigate("/devolucion")}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Añadir a devolución
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Caducados;