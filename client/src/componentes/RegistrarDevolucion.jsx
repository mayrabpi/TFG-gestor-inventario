import React, { useState, useEffect } from "react";
import { getProducts, updateProduct } from "../api";

const RegistrarDevolucion = ({ onCancel, onInventoryUpdate }) => {
    const [productos, setProductos] = useState([]);
    const [codigoBarras, setCodigoBarras] = useState("");
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [units, setUnits] = useState(0);

    useEffect(() => {
        getProducts()
            .then((response) => setProductos(response.data))
            .catch((err) => console.error("Error al obtener los productos:", err));
    }, []);

    const handleSearch = (e) => {
        const codigo = e.target.value.trim();
        setCodigoBarras(codigo);
        const encontrado = productos.find((p) => p.id === codigo);
        setProductoSeleccionado(encontrado || null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!productoSeleccionado) {
            alert("Producto no encontrado. Verifica el código de barras.");
            return;
        }

        const updatedProduct = {
            ...productoSeleccionado,
            units: productoSeleccionado.units - units,
        };

        updateProduct(productoSeleccionado.id, updatedProduct)
            .then(() => {
                alert("Devolución registrada correctamente");
                setCodigoBarras("");
                setUnits(0);
                setProductoSeleccionado(null);
                onInventoryUpdate();
            })
            .catch((err) => {
                console.error("Error al registrar la devolución:", err);
                alert("Hubo un error al registrar la devolución.");
            });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <h2 className="mb-4 font-bold text-xl">Registrar Devolución</h2>

            <div className="mb-4">
                <label className="block mb-2">Código de Barras</label>
                <input
                    type="text"
                    value={codigoBarras}
                    onChange={handleSearch}
                    className="p-2 border w-full"
                    placeholder="Escanea o escribe el código"
                    required
                />
                {productoSeleccionado && (
                    <p className="mt-1 text-gray-600 text-sm">
                        Producto: <strong>{productoSeleccionado.name}</strong>
                    </p>
                )}
            </div>

            <div className="mb-4">
                <label className="block mb-2">Unidades a devolver</label>
                <input
                    type="number"
                    value={units}
                    onChange={(e) => setUnits(parseInt(e.target.value) || 0)}
                    className="p-2 border w-full"
                    required
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 px-4 py-2 rounded text-white"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 px-4 py-2 rounded text-white"
                >
                    Registrar Devolución
                </button>
            </div>
        </form>
    );
};

export default RegistrarDevolucion;