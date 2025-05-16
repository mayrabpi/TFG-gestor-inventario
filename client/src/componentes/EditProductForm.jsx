import React, { useState, useEffect } from "react";
import { updateProduct, getProviders } from "../api";

const EditProductForm = ({ product, onClose }) => {
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        getProviders()
            .then((response) => setProviders(response.data))
            .catch((err) => console.error("Error al obtener los proveedores:", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct(product.id, {
            ...updatedProduct,
            price: parseFloat(updatedProduct.price),
            units: parseFloat(updatedProduct.units),
            lowStockThreshold: parseInt(updatedProduct.lowStockThreshold) || 0,
        })
            .then(() => {
                alert("Producto actualizado correctamente");
                onClose();
            })
            .catch((err) => console.error("Error al actualizar el producto:", err));
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <h2 className="mb-4 font-bold text-xl">Editar Producto</h2>
            <div className="mb-4">
                <label className="block mb-2">Código de barras</label>
                <input
                    type="text"
                    value={updatedProduct.id}
                    disabled
                    className="bg-gray-100 p-2 border w-full text-gray-600"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Nombre del Producto</label>
                <input
                    type="text"
                    value={updatedProduct.name}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                    className="p-2 border w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Unidades</label>
                <input
                    type="number"
                    step="0.01"
                    value={updatedProduct.units}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, units: e.target.value })}
                    className="p-2 border w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Precio</label>
                <input
                    type="number"
                    step="0.01"
                    value={updatedProduct.price}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                    className="p-2 border w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Umbral de Stock Bajo</label>
                <input
                    type="number"
                    value={updatedProduct.lowStockThreshold}
                    onChange={(e) =>
                        setUpdatedProduct({ ...updatedProduct, lowStockThreshold: parseInt(e.target.value) || 0 })
                    }
                    className="p-2 border w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">¿Es Perecedero?</label>
                <input
                    type="checkbox"
                    checked={updatedProduct.perishable}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, perishable: e.target.checked })}
                    className="mr-2"
                />
                <span>Sí</span>
            </div>
            {updatedProduct.perishable && (
                <div className="mb-4">
                    <label className="block mb-2">Fecha de Caducidad</label>
                    <input
                        type="date"
                        value={updatedProduct.expirationDate || ""}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, expirationDate: e.target.value })}
                        className="p-2 border w-full"
                        required
                    />
                </div>
            )}
            <div className="mb-4">
                <label className="block mb-2">Proveedor (opcional)</label>
                <select
                    value={updatedProduct.providerId || ""}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, providerId: e.target.value })}
                    className="p-2 border w-full"
                >
                    <option value="">Seleccionar proveedor</option>
                    {providers.map((provider) => (
                        <option key={provider.id} value={provider.id}>
                            {provider.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-end gap-2">
                <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
                    Guardar Cambios
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 px-4 py-2 rounded text-white"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default EditProductForm;