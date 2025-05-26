import React, { useEffect, useState } from "react";
import { getProviders, getProductsByProvider, addProvider, updateProvider, deleteProvider } from "../api";
import RegistroProveedorForm from "../componentes/RegistroProveedorForm";
import ListaProductos from "../componentes/ListaProductos";
import { FaEdit, FaTrash, FaEye, FaPlus, FaTruck } from 'react-icons/fa';

const Proveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        address: "",
        phone: "",
        email: "",
    });
    const [selectedProvider, setSelectedProvider] = useState(null); // Proveedor seleccionado
    const [productos, setProductos] = useState([]); // Productos del proveedor seleccionado
    const [showProductsModal, setShowProductsModal] = useState(false); // Controlar el modal
    const [showOrderForm, setShowOrderForm] = useState(false); // Controlar el formulario de pedido
    const [selectedProducts, setSelectedProducts] = useState([]); // Productos seleccionados para el pedido
    const [pedidoGenerado, setPedidoGenerado] = useState(null); // Pedido generado para mostrar en el modal

    useEffect(() => {
        fetchProviders();
    }, []);

    const fetchProviders = () => {
        getProviders()
            .then((response) => setProveedores(response.data))
            .catch((err) => console.error("Error al obtener los proveedores:", err));
    };

    const handleFormSubmit = (data) => {
        if (data.id) {
            updateProvider(data.id, data)
                .then(() => {
                    alert("Proveedor actualizado correctamente");
                    setShowForm(false);
                    fetchProviders();
                })
                .catch((err) => console.error("Error al actualizar el proveedor:", err));
        } else {
            addProvider(data)
                .then(() => {
                    alert("Proveedor registrado correctamente");
                    setShowForm(false);
                    fetchProviders();
                })
                .catch((err) => console.error("Error al registrar el proveedor:", err));
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
            deleteProvider(id)
                .then(() => {
                    alert("Proveedor eliminado correctamente");
                    fetchProviders();
                })
                .catch((err) => console.error("Error al eliminar el proveedor:", err));
        }
    };

    const handleEdit = (provider) => {
        setFormData(provider);
        setShowForm(true);
    };

    const handleAdd = () => {
        setFormData({ id: null, name: "", address: "", phone: "", email: "" });
        setShowForm(true);
    };

    const handleShowProducts = (provider) => {
        setSelectedProvider(provider);
        getProductsByProvider(provider.id)
            .then((response) => {
                setProductos(response.data);
                setShowProductsModal(true);
            })
            .catch((err) => console.error("Error al obtener los productos del proveedor:", err));
    };

    const handleCloseModal = () => {
        setShowProductsModal(false);
        setSelectedProvider(null);
        setProductos([]);
    };

    const handleMakeOrder = () => {
        setSelectedProducts(productos.map((product) => ({ ...product, quantity: 0 }))); // Inicializar cantidades
        setShowOrderForm(true);
    };

    const handleOrderSubmit = () => {
        const orderDetails = {
            providerEmail: selectedProvider.email,
            products: selectedProducts.filter((product) => product.quantity > 0), // Solo productos con cantidad > 0
        };

        // Simular la generación del pedido y mostrarlo en un modal
        setPedidoGenerado(orderDetails);
        setShowOrderForm(false);
    };

    return (
        <div className="p-4">
            <h1 className="flex gap-2 mb-6 font-bold text-gray-800 text-3xl">
                <FaTruck /> Gestión de Proveedores
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md text-white transition-colors"
                >
                    <FaPlus />
                    Registrar Proveedor
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="border border-gray-300 w-full text-sm sm:text-base border-collapse table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-2 sm:px-4 py-2 border border-gray-300">Nombre</th>
                            <th className="px-2 sm:px-4 py-2 border border-gray-300">Dirección</th>
                            <th className="px-2 sm:px-4 py-2 border border-gray-300">Teléfono</th>
                            <th className="px-2 sm:px-4 py-2 border border-gray-300">Correo Electrónico</th>
                            <th className="px-2 sm:px-4 py-2 border border-gray-300">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map((proveedor) => (
                            <tr key={proveedor.id}>
                                <td className="px-2 sm:px-4 py-2 border border-gray-300">{proveedor.name}</td>
                                <td className="px-2 sm:px-4 py-2 border border-gray-300">{proveedor.address}</td>
                                <td className="px-2 sm:px-4 py-2 border border-gray-300">{proveedor.phone}</td>
                                <td className="px-2 sm:px-4 py-2 border border-gray-300">{proveedor.email || "N/A"}</td>
                                <td className="px-2 sm:px-4 py-2 border border-gray-300">
                                    <div className="flex flex-wrap gap-2 sm:gap-4">
                                        {/* Botón Editar */}
                                        <div className="group relative">
                                            <button
                                                onClick={() => handleEdit(proveedor)}
                                                className="bg-yellow-400 px-2 py-1 rounded text-white"
                                            >
                                                <FaEdit />
                                            </button>
                                            <div className="bottom-full left-1/2 z-10 absolute bg-black opacity-0 group-hover:opacity-100 mb-1 px-2 py-1 rounded text-white text-xs whitespace-nowrap transition -translate-x-1/2">
                                                Editar proveedor
                                            </div>
                                        </div>
                                        {/* Botón Eliminar */}
                                        <div className="group relative">
                                            <button
                                                onClick={() => handleDelete(proveedor.id)}
                                                className="bg-red-400 px-2 py-1 rounded text-white"
                                            >
                                                <FaTrash />
                                            </button>
                                            <div className="bottom-full left-1/2 z-10 absolute bg-black opacity-0 group-hover:opacity-100 mb-1 px-2 py-1 rounded text-white text-xs whitespace-nowrap transition -translate-x-1/2">
                                                Eliminar proveedor
                                            </div>
                                        </div>
                                        {/* Botón Ver Productos */}
                                        <div className="group relative">
                                            <button
                                                onClick={() => handleShowProducts(proveedor)}
                                                className="bg-blue-400 px-2 py-1 rounded text-white"
                                            >
                                                <FaEye />
                                            </button>
                                            <div className="bottom-full left-1/2 z-10 absolute bg-black opacity-0 group-hover:opacity-100 mb-1 px-2 py-1 rounded text-white text-xs whitespace-nowrap transition -translate-x-1/2">
                                                Ver productos
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Registro Proveedor */}
            {showForm && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded w-full max-w-md">
                        <RegistroProveedorForm
                            formData={formData}
                            onClose={() => setShowForm(false)}
                            onSubmit={handleFormSubmit}
                        />
                    </div>
                </div>
            )}

            {/* Modal para mostrar productos */}
            {showProductsModal && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded w-full max-w-2xl">
                        <h2 className="mb-4 font-bold text-xl">
                            Productos de {selectedProvider?.name}
                        </h2>
                        {productos.length > 0 ? (
                            <ListaProductos 
                                productos={productos} 
                                searchTerm="" 
                                onEdit={() => {}} 
                                onDelete={() => {}}
                                proveedor={selectedProvider} // Añadir esta línea
                            />
                        ) : (
                            <p>No hay productos asociados a este proveedor.</p>
                        )}
                        <div className="flex flex-wrap justify-between gap-2 sm:gap-4 mt-4">
                            <button
                                onClick={handleMakeOrder}
                                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white transition-colors"
                            >
                                Hacer Pedido
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md text-white transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Formulario para confirmar pedido */}
            {showOrderForm && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded w-full max-w-md">
                        <h2 className="mb-4 font-bold text-xl">Confirmar Pedido</h2>
                        {selectedProducts.map((product, index) => (
                            <div key={product.id} className="mb-4">
                                <label className="block mb-2">{product.name}</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={product.quantity}
                                    onChange={(e) => {
                                        const updatedProducts = [...selectedProducts];
                                        updatedProducts[index].quantity = parseInt(e.target.value, 10) || 0;
                                        setSelectedProducts(updatedProducts);
                                    }}
                                    className="p-2 border w-full"
                                />
                            </div>
                        ))}
                        <div className="flex flex-wrap justify-end gap-2">
                            <button
                                onClick={() => setShowOrderForm(false)}
                                className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md text-white transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleOrderSubmit}
                                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white transition-colors"
                            >
                                Generar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para mostrar el pedido generado */}
            {pedidoGenerado && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded w-full max-w-md">
                        <h2 className="mb-4 font-bold text-xl">Pedido Generado</h2>
                        <p><strong>Proveedor:</strong> {pedidoGenerado.providerEmail}</p>
                        <ul>
                            {pedidoGenerado.products.map((product, index) => (
                                <li key={index}>{product.name}: {product.quantity}</li>
                            ))}
                        </ul>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setPedidoGenerado(null)}
                                className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md text-white transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Proveedores;