import React, { useState, useEffect } from "react";
import ListaProductos from "../componentes/ListaProductos";
import AddProductForm from "../componentes/AddProductForm";

const Productos = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="p-4">
            <h1 className="mb-4 font-bold text-3xl">Gestión de Productos</h1>
            <button
                onClick={toggleForm}
                className="bg-blue-500 mb-4 px-4 py-2 rounded text-white"
            >
                {showForm ? "Cerrar Formulario" : "Añadir Producto"}
            </button>
            {showForm && (
                <div className="mb-4">
                    <AddProductForm />
                </div>
            )}
            <ListaProductos />
        </div>
    );
};

export default Productos;