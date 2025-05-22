import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import ModificarFechaButton from "../componentes/ModificarFechaButton";
import RegistrarDevolucion from "../componentes/RegistrarDevolucion";
import { updateProduct } from "../api";
import { useNavigate } from "react-router-dom";

const Caducados = ({ productos = [] }) => {
    console.log("Productos recibidos:", productos);
    const [view, setView] = useState("proximos");
    const [showForm, setShowForm] = useState(null);
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

    const toggleForm = (productId) => {
        setShowForm((prev) => (prev === productId ? null : productId));
    };

    return (
        <div className="p-4">
            <h1 className="flex gap-2 mb-6 font-bold text-gray-800 text-3xl"> <FaCalendarAlt /> Control de Caducidad</h1>
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => setView("proximos")}
                    className={`px-4 py-2 rounded ${view === "proximos" ? " bg-blue-500 hover:bg-blue-600 mt-4 mb-2 px-4 py-1.5 rounded-md  text-white transition-colors" : "bg-gray-200 mt-4 mb-2 px-4 py-1.5 rounded-md"
                        }`}
                >
                    Próximos a caducar ({proximosACaducar.length})
                </button>
                <button
                    onClick={() => setView("caducados")}
                    className={`px-4 py-2 rounded ${view === "caducados" ? "bg-blue-500 hover:bg-blue-600 mt-4 mb-2 px-4 py-1.5 rounded-md text-white transition-colors" : "bg-gray-200 mt-4 mb-2 px-4 py-1.5 rounded-md"
                        }`}
                >
                    Caducados ({caducados.length})
                </button>
            </div>

            {view === "proximos" && proximosACaducar.length === 0 && (
                <p className="text-gray-500">No hay productos próximos a caducar.</p>
            )}

            {view === "proximos" && (
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    {proximosACaducar.map((producto) => {
                        const fechaCaducidad = new Date(producto.expirationDate);
                        const diffDays = Math.ceil((fechaCaducidad - today) / (1000 * 60 * 60 * 24));
                        return (
                            <div key={producto.id} className="shadow p-4 border rounded">
                                <h2 className="font-bold text-lg">{producto.name}</h2>
                                <span className="bg-orange-100 px-2 py-1 rounded text-orange-800 text-sm">
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

            {view === "caducados" && caducados.length === 0 && (
                <p className="text-gray-500">No hay productos caducados.</p>
            )}

            {view === "caducados" && (
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    {caducados.map((producto) => (
                        <div key={producto.id} className="shadow p-4 border rounded">
                            <h2 className="font-bold text-lg">{producto.name}</h2>
                            <span className="bg-red-200 px-2 py-1 rounded text-red-800 text-sm">
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
                                onClick={() => toggleForm(producto.id)}
                                className="bg-blue-500 hover:bg-blue-600 mt-4 mb-2 px-4 py-1.5 rounded-md text-white transition-colors"
                            >
                                {showForm === producto.id ? "Cerrar Formulario" : "Añadir a Devolución"}
                            </button>
                            {showForm === producto.id && (
                                <RegistrarDevolucion
                                    producto={producto}
                                    onCancel={() => toggleForm(producto.id)}
                                    onInventoryUpdate={() => {
                                        console.log("Inventory updated from Caducados page.");
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Caducados;