import React, { useState } from "react";
import { updateProduct } from "../api"; // Quita addStock

const ReponerProductoForm = ({ productos, onClose, onReponer }) => {
    const [codigoBarras, setCodigoBarras] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cantidad, setCantidad] = useState("");
    const [fechaCaducidad, setFechaCaducidad] = useState("");
    const [error, setError] = useState("");

    const handleSearch = (e) => {
        const codigo = e.target.value.trim();
        setCodigoBarras(codigo);
        const encontrado = productos.find((p) => p.id === codigo);
        setSelectedProduct(encontrado || null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedProduct) {
            alert("Por favor, escanea o introduce un código de barras válido.");
            return;
        }

        const updatedData = {
            units: selectedProduct.units + Number(cantidad),
        };

        if (fechaCaducidad) {
            updatedData.expirationDate = fechaCaducidad;
        }

        updateProduct(selectedProduct.id, updatedData)
            .then(() => {
                alert("Producto repuesto correctamente");
                if (onReponer) onReponer();
            })
            .catch((err) => setError("Error al reponer el producto"));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md p-4 rounded">
            <h2 className="mb-4 font-bold text-xl">Reponer Producto</h2>

            <label className="block mb-2">
                Código de Barras:
                <input
                    type="text"
                    value={codigoBarras}
                    onChange={handleSearch}
                    className="block px-2 py-1 border rounded w-full"
                    placeholder="Escanea o escribe el código"
                    required
                />
            </label>

            {selectedProduct && (
                <div className="mb-4">
                    <p className="text-gray-600 text-sm">
                        Producto seleccionado: <strong>{selectedProduct.name}</strong>
                    </p>
                </div>
            )}

            <label className="block mb-2">
                Cantidad a reponer:
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

            {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

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