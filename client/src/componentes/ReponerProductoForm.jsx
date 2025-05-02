import React, { useState } from "react";

const ReponerProductoForm = ({ productos, onClose }) => {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [fechaCaducidad, setFechaCaducidad] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí se manejaría la lógica para reponer el producto
        console.log("Producto a reponer:", selectedProduct);
        console.log("Cantidad:", cantidad);
        console.log("Fecha de caducidad:", fechaCaducidad);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md p-4 rounded">
            <h2 className="mb-4 font-bold text-xl">Reponer Producto</h2>

            <label className="block mb-2">
                Producto:
                <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="block px-2 py-1 border rounded w-full"
                    required
                >
                    <option value="">Seleccione un producto</option>
                    {productos.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                            {producto.nombre}
                        </option>
                    ))}
                </select>
            </label>

            <label className="block mb-2">
                Cantidad:
                <input
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    className="block px-2 py-1 border rounded w-full"
                    required
                />
            </label>

            <label className="block mb-2">
                Fecha de caducidad (opcional):
                <input
                    type="date"
                    value={fechaCaducidad}
                    onChange={(e) => setFechaCaducidad(e.target.value)}
                    className="block px-2 py-1 border rounded w-full"
                />
            </label>

            <div className="flex justify-end mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-300 mr-2 px-4 py-2 rounded text-black"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 px-4 py-2 rounded text-white"
                >
                    Reponer
                </button>
            </div>
        </form>
    );
};

export default ReponerProductoForm;