import React, { useState } from "react";
import ListaProductos from "../componentes/ListaProductos";
import AddProductForm from "../componentes/AddProductForm";
import ReponerProductoForm from "../componentes/ReponerProductoForm";
import { FaPlus, FaBoxes } from "react-icons/fa";

const Productos = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showReponerForm, setShowReponerForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
        // Si abrimos el form de añadir, cerramos el de reponer
        if (!showAddForm) {
            setShowReponerForm(false);
        }
    };

    const toggleReponerForm = () => {
        setShowReponerForm(!showReponerForm);
        // Si abrimos el form de reponer, cerramos el de añadir
        if (!showReponerForm) {
            setShowAddForm(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="mb-4 font-bold text-3xl">Gestión de Productos</h1>

            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={toggleAddForm}
                    className="flex items-center gap-2 bg-gray-600 px-4 py-2 rounded text-white"
                >
                    <FaPlus />
                    {showAddForm ? "Cerrar Formulario" : "Añadir Producto"}
                </button>

                <button
                    onClick={toggleReponerForm}
                    className="flex items-center gap-2 bg-gray-600 px-4 py-2 rounded text-white"
                >
                    <FaBoxes />
                    {showReponerForm ? "Cerrar Formulario" : "Reponer Producto"}
                </button>
            </div>

            {showAddForm && (
                <div className="mb-4">
                    <AddProductForm />
                </div>
            )}

            {showReponerForm && (
                <div className="mb-4">
                    <ReponerProductoForm
                        productos={[]} // Aquí pasarías tus productos reales
                        onClose={toggleReponerForm}
                    />
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