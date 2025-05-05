import React, { useState } from "react";
import { updateProduct } from "../api";

const ReponerProductoForm = ({ productos, onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cantidad, setCantidad] = useState("");
    const [fechaCaducidad, setFechaCaducidad] = useState("");

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = productos.filter((producto) =>
            producto.name.toLowerCase().includes(term)
        );
        setFilteredProducts(filtered);
    };

    const handleSelectProduct = (producto) => {
        setSelectedProduct(producto);
        setSearchTerm(producto.name);
        setFilteredProducts([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedProduct) {
            alert("Por favor, selecciona un producto válido.");
            return;
        }

        const updatedData = {
            units: selectedProduct.units + Number(cantidad), // Convertir cantidad a número
        };

        if (fechaCaducidad) {
            updatedData.expirationDate = fechaCaducidad;
        }

        updateProduct(selectedProduct.id, updatedData)
            .then(() => {
                alert("Producto repuesto correctamente");
                onClose();
            })
            .catch((err) => console.error("Error al reponer el producto:", err));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md p-4 rounded">
            <h2 className="mb-4 font-bold text-xl">Reponer Producto</h2>

            <label className="block mb-2">
                Producto:
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="block px-2 py-1 border rounded w-full"
                    placeholder="Escribe para buscar un producto"
                    required
                />
                {filteredProducts.length > 0 && (
                    <ul className="bg-white mt-2 border rounded max-h-40 overflow-y-auto">
                        {filteredProducts.map((producto) => (
                            <li
                                key={producto.id}
                                onClick={() => handleSelectProduct(producto)}
                                className="hover:bg-gray-200 px-2 py-1 cursor-pointer"
                            >
                                {producto.name}
                            </li>
                        ))}
                    </ul>
                )}
            </label>

            {selectedProduct && (
                <div className="mb-4">
                    <p className="text-gray-600 text-sm">
                        Producto seleccionado: <strong>{selectedProduct.name}</strong>
                    </p>
                </div>
            )}

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