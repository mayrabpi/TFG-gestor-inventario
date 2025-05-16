import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
import { FaSearchPlus, FaExclamationTriangle } from "react-icons/fa";

const Alertas = () => {
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        getProducts()
            .then((response) => {
                setProductos(response.data);
            })
            .catch((err) => console.error("Error al obtener los productos:", err));
    };

    const productosBajoStock = productos.filter(
        (producto) => producto.units < producto.lowStockThreshold
    );

    return (
        <div className="flex flex-col p-6 min-h-screen">
            <h1 className="flex gap-2 mb-4 font-bold sm:text-2xl md:text-3xl lg:text-4xl"><FaExclamationTriangle className="mr-2" />
                Alertas de Stock</h1>
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

            {productoSeleccionado && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded w-96">
                        <h2 className="mb-4 font-bold text-xl">{productoSeleccionado.name}</h2>
                        <p>Unidades: {productoSeleccionado.units}</p>
                        <p>Precio: €{productoSeleccionado.price}</p>
                        <p>Umbral de stock bajo: {productoSeleccionado.lowStockThreshold}</p>
                        <p>
                            {productoSeleccionado.perishable
                                ? `Fecha de caducidad: ${productoSeleccionado.expirationDate}`
                                : "No perecedero"}
                        </p>
                        <button
                            className="bg-gray-500 mt-4 px-4 py-2 rounded text-white"
                            onClick={() => setProductoSeleccionado(null)} // Cerrar modal
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Alertas;