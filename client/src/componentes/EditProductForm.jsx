import React, { useState } from "react";
import { updateProduct } from "../api";

const EditProductForm = ({ product, onClose }) => {
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct(product.id, updatedProduct)
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
            <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
                Guardar Cambios
            </button>
            <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 ml-2 px-4 py-2 rounded text-white"
            >
                Cancelar
            </button>
        </form>
    );
};

export default EditProductForm;