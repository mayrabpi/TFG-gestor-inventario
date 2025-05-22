import React, { useState, useEffect } from "react";
import AddProductForm from "../componentes/AddProductForm";
import ReponerProductoForm from "../componentes/ReponerProductoForm";
import EditProductForm from "../componentes/EditProductForm";
import ListaProductos from "../componentes/ListaProductos";
import { FaPlus, FaSync } from "react-icons/fa";
import { getProducts, updateProduct, deleteProduct } from "../api";

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showReponerForm, setShowReponerForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        getProducts()
            .then((response) => {
                const sortedProducts = response.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                setProductos(sortedProducts);
            })
            .catch((err) => console.error("Error al obtener los productos:", err));
    };

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    const toggleReponerForm = () => {
        setShowReponerForm(!showReponerForm);
    };

    const handleEdit = (product) => {
        setFormData(product);
        setShowEditForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            deleteProduct(id)
                .then(() => {
                    alert("Producto eliminado correctamente");
                    fetchProducts();
                })
                .catch((err) => console.error("Error al eliminar el producto:", err));
        }
    };

    const handleProductAdded = () => {
        fetchProducts();
        setShowAddForm(false);
    };

    const handleReponer = () => {
        fetchProducts();
        setShowReponerForm(false);
    };

    const handleEditClose = () => {
        setShowEditForm(false);
        fetchProducts();
    };

    return (
        <div className="p-4">
            <h1 className="flex gap-2 mb-6 font-bold text-gray-800 text-xl sm:text-2xl"> Gestión de Productos</h1>

            {/* Botones para añadir y reponer producto */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={toggleAddForm}
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 mb-4 px-4 py-2 rounded-md text-white transition-colors"
                >
                    <FaPlus />
                    {showAddForm ? "Cerrar Formulario" : "Añadir Producto"}
                </button>
                <button
                    onClick={toggleReponerForm}
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 mb-4 px-4 py-2 rounded-md text-white transition-colors"
                >
                    <FaSync />
                    {showReponerForm ? "Cerrar Reposición" : "Reponer Productos"}
                </button>
            </div>

            {/* Formulario modal para añadir producto */}
            {showAddForm && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded w-96">
                        <AddProductForm
                            productos={productos}
                            onClose={toggleAddForm}
                            onProductAdded={handleProductAdded}
                        />
                    </div>
                </div>
            )}

            {/* Formulario modal para reponer productos */}
            {showReponerForm && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded w-96">
                        <ReponerProductoForm
                            productos={productos}
                            onClose={toggleReponerForm}
                            onReponer={handleReponer}
                        />
                    </div>
                </div>
            )}

            {/* Campo de búsqueda */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg w-80"
                />
            </div>

            {/* Lista de productos */}
            <ListaProductos
                productos={productos}
                searchTerm={searchTerm}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Formulario modal para editar producto */}
            {showEditForm && formData && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded w-96">
                        <EditProductForm
                            product={formData}
                            onClose={handleEditClose}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Productos;