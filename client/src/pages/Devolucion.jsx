import React, { useState, useEffect } from "react";
import RegistrarDevolucion from "../componentes/RegistrarDevolucion";
import { getProducts } from "../api";
import { FaPlus, FaUndo } from "react-icons/fa";

const Devolucion = () => {
    const [showForm, setShowForm] = useState(false);
    const [productos, setProductos] = useState([]);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const fetchProductos = () => {
        getProducts()
            .then((response) => setProductos(response.data))
            .catch((err) => console.error("Error al obtener los productos:", err));
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div className="p-4">
            <h1 className="flex gap-2 mb-6 font-bold text-gray-800 text-3xl"> <FaUndo /> Gestión de Devoluciones</h1>
            <button
                onClick={toggleForm}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 mb-4 px-4 py-2 rounded-md text-white transition-colors"
            >
                <FaPlus />
                {showForm ? "Cerrar Formulario" : "Nueva Devolución"}
            </button>
            {showForm && (
                <div className="mb-4">
                    <RegistrarDevolucion onCancel={toggleForm} onInventoryUpdate={fetchProductos} />
                </div>
            )}
        </div>
    );
};

export default Devolucion;