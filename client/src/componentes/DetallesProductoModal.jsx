import React from "react";
import { FaExclamationTriangle } from 'react-icons/fa';

const DetallesProductoModal = ({ producto, onClose, proveedorNombre }) => {
    // Función para verificar si un producto tiene bajo stock
    const esBajoStock = (producto) => {
        if (!producto.lowStockThreshold) return false;
        return producto.units <= producto.lowStockThreshold;
    };

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
            <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
                <button
                    className="top-2 right-2 absolute text-gray-500 hover:text-gray-700 text-xl"
                    onClick={onClose}
                >
                    ×
                </button>
                <h2 className="mb-4 font-bold text-xl">Detalles del producto</h2>
                <div className="mb-2"><strong>Código de barras:</strong> {producto.id}</div>
                <div className="mb-2"><strong>Nombre:</strong> {producto.name}</div>
                <div className="mb-2">
                    <strong>Cantidad:</strong>
                    <span className={esBajoStock(producto) ? 'text-red-600 font-bold ml-1' : 'ml-1'}>
                        {producto.units}
                        {esBajoStock(producto) && (
                            <span className="ml-2 text-red-600">¡Bajo stock!</span>
                        )}
                    </span>
                </div>
                <div className="mb-2"><strong>Precio:</strong> €{typeof producto.price === "number" ? producto.price.toFixed(2) : "0.00"}</div>
                <div className="mb-2"><strong>Perecedero:</strong> {producto.perishable ? "Sí" : "No"}</div>
                {proveedorNombre && <div className="mb-2"><strong>Proveedor:</strong> {proveedorNombre}</div>}
                {producto.expirationDate && <div className="mb-2"><strong>Fecha de caducidad:</strong> {producto.expirationDate}</div>}
                {producto.lowStockThreshold && (
                    <div className="mb-2"><strong>Umbral de stock bajo:</strong> {producto.lowStockThreshold}</div>
                )}
            </div>
        </div>
    );
};

export default DetallesProductoModal;