import React, { useState, useEffect } from "react";
import AddProductForm from "../componentes/AddProductForm";
import ReponerProductoForm from "../componentes/ReponerProductoForm"; // Importa el componente correcto
import ListaProductos from "../componentes/ListaProductos";
import { FaPlus, FaSync } from "react-icons/fa";
import { getProducts, updateProduct, deleteProduct } from "../api";

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showReponerForm, setShowReponerForm] = useState(false); // Nuevo estado
    const [showEditForm, setShowEditForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        units: 0,
        // quantity: 0,
        price: 0,
        lowStockThreshold: 0,
        perishable: false,
        expirationDate: "",
    });

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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateProduct(formData.id, formData)
            .then(() => {
                alert("Producto actualizado correctamente");
                setShowEditForm(false);
                fetchProducts();
            })
            .catch((err) => console.error("Error al actualizar el producto:", err));
    };

    return (
        <div className="p-4">
            <h1 className="mb-4 font-bold text-3xl">Gestión de Productos</h1>

            {/* Botones para añadir y reponer producto */}
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
                    className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded text-white"
                >
                    <FaSync />
                    {showReponerForm ? "Cerrar Reposición" : "Reponer Productos"}
                </button>
            </div>

            {/* Formulario modal para añadir producto */}
            {showAddForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
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
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
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
            {showEditForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded w-96">
                        <h2 className="mb-4 font-bold text-xl">Modificar Producto</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="p-2 border w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Unidades</label>
                                <input
                                    type="number"
                                    value={formData.units}
                                    onChange={(e) =>
                                        setFormData({ ...formData, units: e.target.value })
                                    }
                                    className="p-2 border w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Cantidad</label>
                                <input
                                    type="number"
                                    value={formData.quantity}
                                    onChange={(e) =>
                                        setFormData({ ...formData, quantity: e.target.value })
                                    }
                                    className="p-2 border w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Precio</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) =>
                                        setFormData({ ...formData, price: e.target.value })
                                    }
                                    className="p-2 border w-full"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowEditForm(false)}
                                    className="bg-gray-500 mr-2 px-4 py-2 rounded text-white"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 px-4 py-2 rounded text-white"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Productos;