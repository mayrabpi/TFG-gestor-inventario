import React, { useEffect, useState } from "react";
import { getProviders, getProductsByProvider, addProvider, updateProvider, deleteProvider } from "../api";
import RegistroProveedorForm from "../componentes/RegistroProveedorForm";
import ListaProductos from "../componentes/ListaProductos";

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
            <h1 className="mb-4 font-bold text-3xl">Gestión de Proveedores</h1>
            <button
                onClick={handleAdd}
                className="bg-blue-500 mb-4 px-4 py-2 rounded text-white"
            >
                Registrar Proveedor
            </button>

            <div className="overflow-x-auto">
                <table className="border border-gray-300 w-full border-collapse table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">Nombre</th>
                            <th className="px-4 py-2 border border-gray-300">Dirección</th>
                            <th className="px-4 py-2 border border-gray-300">Teléfono</th>
                            <th className="px-4 py-2 border border-gray-300">Correo Electrónico</th>
                            <th className="px-4 py-2 border border-gray-300">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map((proveedor) => (
                            <tr key={proveedor.id}>
                                <td className="px-4 py-2 border border-gray-300">{proveedor.name}</td>
                                <td className="px-4 py-2 border border-gray-300">{proveedor.address}</td>
                                <td className="px-4 py-2 border border-gray-300">{proveedor.phone}</td>
                                <td className="px-4 py-2 border border-gray-300">{proveedor.email || "N/A"}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button
                                        onClick={() => handleEdit(proveedor)}
                                        className="bg-yellow-500 mr-2 px-2 py-1 rounded text-white"
                                    >
                                        Modificar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(proveedor.id)}
                                        className="bg-red-500 mr-2 px-2 py-1 rounded text-white"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => handleShowProducts(proveedor)}
                                        className="bg-blue-500 px-2 py-1 rounded text-white"
                                    >
                                        Ver Productos
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <RegistroProveedorForm
                    formData={formData}
                    onClose={() => setShowForm(false)}
                    onSubmit={handleFormSubmit}
                />
            )}

            {/* Modal para mostrar productos */}
            {showProductsModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded w-96">
                        <h2 className="mb-4 font-bold text-xl">
                            Productos de {selectedProvider?.name}
                        </h2>
                        {productos.length > 0 ? (
                            <ListaProductos productos={productos} searchTerm="" onEdit={() => { }} onDelete={() => { }} />
                        ) : (
                            <p>No hay productos asociados a este proveedor.</p>
                        )}
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleMakeOrder}
                                className="bg-green-500 px-4 py-2 rounded text-white"
                            >
                                Hacer Pedido
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-500 px-4 py-2 rounded text-white"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Formulario para confirmar pedido */}
            {showOrderForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded w-96">
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
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowOrderForm(false)}
                                className="bg-gray-500 px-4 py-2 rounded text-white"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleOrderSubmit}
                                className="bg-blue-500 px-4 py-2 rounded text-white"
                            >
                                Generar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para mostrar el pedido generado */}
            {pedidoGenerado && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded w-96">
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
                                className="bg-gray-500 px-4 py-2 rounded text-white"
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