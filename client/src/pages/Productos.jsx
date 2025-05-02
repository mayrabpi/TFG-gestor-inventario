import React, { useState } from "react";
import ListaProductos from "../componentes/ListaProductos";
import AddProductForm from "../componentes/AddProductForm";
import { FaPlus } from "react-icons/fa";
const Productos = () => {
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="p-4">
            <h1 className="mb-4 font-bold text-3xl">Gestión de Productos</h1>
            <button
                onClick={toggleForm}
                className="flex items-center gap-2 bg-gray-600 mb-4 px-4 py-2 rounded text-white"
            >
                <FaPlus />
                {showForm ? "Cerrar Formulario" : "Añadir Producto"}
            </button>
            {showForm && (
                <div className="mb-4">
                    <AddProductForm />
                </div>
            )}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg w-80"
                />
            </div>
            <ListaProductos searchTerm={searchTerm} />
        </div>
    );
};

export default Productos;