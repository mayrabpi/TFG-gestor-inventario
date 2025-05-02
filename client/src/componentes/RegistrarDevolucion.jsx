import React, { useState, useEffect } from "react";
import { getProducts, updateProduct } from "../api";


const RegistrarDevolucion = ({ onCancel, onInventoryUpdate }) => {
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [units, setUnits] = useState(0);

    useEffect(() => {
        getProducts()
            .then((response) => {
                setProductos(response.data);
                setFilteredProductos(response.data);
            })
            .catch((err) => console.error("Error al obtener los productos:", err));
    }, []);

    useEffect(() => {
        console.log("Productos cargados:", productos);
    }, [productos]);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSelectedProduct(searchTerm);
        setFilteredProductos(
            productos.filter((producto) =>
                producto.name.toLowerCase().includes(searchTerm)
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = productos.find(
            (p) => p.name.trim().toLowerCase() === selectedProduct.trim().toLowerCase()
        );
        if (!product) {
            alert("Producto no encontrado. Por favor, selecciona un producto válido.");
            console.error("Producto seleccionado:", selectedProduct);
            console.error("Productos disponibles:", productos);
            return;
        }
        console.log("Producto encontrado:", product);
        console.log("Producto seleccionado para devolución:", product);
        const updatedProduct = {
            ...product,
            units: product.units - units,
        };
        console.log("Producto seleccionado:", selectedProduct);
        console.log("Productos disponibles:", productos);
        console.log("Selected Product:", product);
        console.log("Updated Product:", updatedProduct);
        updateProduct(product.id || product._id, updatedProduct) // Usar _id si id no está disponible
            .then(() => {
                alert("Devolución registrada correctamente");
                setSelectedProduct("");
                setUnits(0);
                onInventoryUpdate(); // Notificar al padre que el inventario ha cambiado
            })
            .catch((err) => {
                console.error("Error al registrar la devolución:", err);
                alert("Hubo un error al registrar la devolución. Por favor, inténtalo de nuevo.");
            });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <h2 className="mb-4 font-bold text-xl">Registrar Devolución</h2>
            <div className="mb-4">
                <label className="block mb-2">Producto</label>
                <input
                    type="text"
                    value={selectedProduct}
                    onChange={handleSearch}
                    placeholder="Buscar producto..."
                    className="p-2 border w-full"
                    list="productos-list"
                    required
                />
                <datalist id="productos-list">
                    {filteredProductos.map((producto) => (
                        <option key={producto.id || producto.name} value={producto.name} />
                    ))}
                </datalist>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Unidades</label>
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