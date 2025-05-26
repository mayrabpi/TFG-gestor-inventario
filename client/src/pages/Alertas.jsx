import React, { useEffect, useState } from "react";
import { getProducts, getProviders } from "../api";
import { FaSearchPlus, FaExclamationTriangle } from "react-icons/fa";
import DetallesProductoModal from "../componentes/DetallesProductoModal";

const Alertas = () => {
    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchProviders();
    }, []);

    const fetchProducts = () => {
        getProducts()
            .then((response) => {
                setProductos(response.data);
            })
            .catch((err) => console.error("Error al obtener los productos:", err));
    };

    const fetchProviders = () => {
        getProviders()
            .then((response) => {
                setProveedores(response.data);
            })
            .catch((err) => console.error("Error al obtener los proveedores:", err));
    };

    // Función para obtener el nombre del proveedor
    const getProveedorNombre = (providerId) => {
        if (!providerId || !proveedores.length) return "Sin proveedor";
        const proveedor = proveedores.find(p => String(p.id) === String(providerId));
        return proveedor ? proveedor.name : "Sin proveedor";
    };

    const productosBajoStock = productos.filter(
        (producto) => producto.lowStockThreshold && producto.units <= producto.lowStockThreshold
    );

    return (
        <div className="flex flex-col p-6 min-h-screen">
            <h1 className="flex gap-2 mb-6 font-bold text-gray-800 text-3xl"><FaExclamationTriangle className="mr-2" />
                Alertas de Stock</h1>

            {productosBajoStock.length === 0 ? (
                <p className="text-gray-500">No hay productos con bajo stock.</p>
            ) : (
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {productosBajoStock.map((producto) => (
                        <div
                            key={producto.id}
                            className="shadow-md p-4 border border-yellow-500 rounded"
                        >
                            <h2 className="font-bold text-gray-700 text-xl">{producto.name}</h2>
                            <p className="text-gray-600">
                                Umbral: {producto.lowStockThreshold} unidades
                            </p>
                            <p className="font-bold text-red-500 text-lg">
                                {producto.units} unidades
                            </p>
                            <p className="text-red-400">
                                {producto.units === 0
                                    ? "¡Sin stock!"
                                    : `${producto.lowStockThreshold - producto.units} por debajo del umbral`}
                            </p>
                            <button
                                className="flex justify-center items-center bg-blue-500 hover:bg-blue-400 mt-4 mb-2 px-4 py-1.5 rounded-md w-full text-white transition-colors"
                                onClick={() => setProductoSeleccionado(producto)}
                            >
                                <FaSearchPlus className="mr-2" />
                                Ver detalles
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {productoSeleccionado && (
                <DetallesProductoModal
                    producto={productoSeleccionado}
                    onClose={() => setProductoSeleccionado(null)}
                    proveedorNombre={getProveedorNombre(productoSeleccionado.providerId)}
                />
            )}
        </div>
    );
};

export default Alertas;