import React, { useState, useEffect } from "react";
import AddProductForm from "../componentes/AddProductForm";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { getProducts, updateProduct, deleteProduct } from "../api";

const Productos = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [productos, setProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10); // Número de productos por página
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        units: 0,
        quantity: 0,
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

    const handleEdit = (product) => {
        setFormData(product); // Cargar los datos del producto seleccionado
        setShowEditForm(true); // Mostrar el formulario modal
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateProduct(formData.id, formData)
            .then(() => {
                alert("Producto actualizado correctamente");
                setShowEditForm(false); // Cerrar el formulario modal
                fetchProducts();
            })
            .catch((err) => console.error("Error al actualizar el producto:", err));
    };

    const handleProductAdded = () => {
        fetchProducts(); // Actualizar la lista de productos después de añadir uno nuevo
        setShowAddForm(false); // Cerrar el formulario de añadir producto
    };

    // Calcular los productos a mostrar en la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productos
        .filter((producto) =>
            producto.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(indexOfFirstProduct, indexOfLastProduct);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            </div>

            {showAddForm && (
                <div className="mb-4">
                    <AddProductForm
                        productos={productos}
                        onClose={toggleAddForm}
                        onProductAdded={handleProductAdded} // Llamar a esta función después de añadir un producto
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

            <div className="overflow-x-auto">
                <table className="border border-gray-300 w-full border-collapse table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">Nombre</th>
                            <th className="px-4 py-2 border border-gray-300">Unidades</th>
                            <th className="px-4 py-2 border border-gray-300">Cantidad</th>
                            <th className="px-4 py-2 border border-gray-300">Precio</th>
                            <th className="px-4 py-2 border border-gray-300">Advertencia</th>
                            <th className="px-4 py-2 border border-gray-300">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((producto) => (
                            <tr key={producto.id}>
                                <td className="px-4 py-2 border border-gray-300">{producto.name}</td>
                                <td className="px-4 py-2 border border-gray-300">{producto.units}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {producto.units < producto.lowStockThreshold ? (
                                        <span className="font-bold text-red-500">
                                            {producto.units} unidades
                                        </span>
                                    ) : (
                                        `${producto.units} unidades`
                                    )}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">€{producto.price}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {producto.units < producto.lowStockThreshold && (
                                        <span className="bg-red-500 px-2 py-1 rounded text-white text-xs">
                                            Stock bajo
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button
                                        onClick={() => handleEdit(producto)}
                                        className="bg-yellow-500 mr-2 px-2 py-1 rounded text-white"
                                    >
                                        <FaEdit /> Modificar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(producto.id)}
                                        className="bg-red-500 px-2 py-1 rounded text-white"
                                    >
                                        <FaTrash /> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-4">
                {Array.from(
                    { length: Math.ceil(productos.length / productsPerPage) },
                    (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300"
                                }`}
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>

            {/* Formulario Modal para Modificar Producto */}
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