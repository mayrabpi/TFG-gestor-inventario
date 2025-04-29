// filepath: client/src/components/AddProductForm.jsx
import React, { useState } from "react";
import { addProduct } from "../api";

const AddProductForm = () => {
    const [product, setProduct] = useState({
        name: "",
        units: 0,
        quantity: 0,
        price: 0,
        lowStockThreshold: 0,
        perishable: false,
        expirationDate: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(product).then(() => {
            alert("Producto añadido");
            setProduct({
                name: "",
                units: 0,
                quantity: 0,
                price: 0,
                lowStockThreshold: 0,
                perishable: false,
                expirationDate: "",
            });
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <h2 className="mb-4 font-bold text-xl">Añadir Producto</h2>
            <div className="mb-4">
                <label className="block mb-2">Nombre del Producto</label>
                <input
                    type="text"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    className="p-2 border w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Unidades</label>
                <input
                    type="number"
                    value={product.units}
                    onChange={(e) => setProduct({ ...product, units: parseInt(e.target.value) || 0 })}
                    className="p-2 border w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Cantidad (en kilos)</label>
                <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => setProduct({ ...product, quantity: parseFloat(e.target.value) || 0 })}
                    className="p-2 border w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Precio</label>
                <input
                    type="number"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })}
                    className="p-2 border w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Umbral de Stock Bajo</label>
                <input
                    type="number"
                    value={product.lowStockThreshold}
                    onChange={(e) => setProduct({ ...product, lowStockThreshold: parseInt(e.target.value) || 0 })}
                    className="p-2 border w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">¿Es Perecedero?</label>
                <input
                    type="checkbox"
                    checked={product.perishable}
                    onChange={(e) => setProduct({ ...product, perishable: e.target.checked })}
                    className="mr-2"
                />
                <span>Sí</span>
            </div>
            {product.perishable && (
                <div className="mb-4">
                    <label className="block mb-2">Fecha de Caducidad</label>
                    <input
                        type="date"
                        value={product.expirationDate}
                        onChange={(e) => setProduct({ ...product, expirationDate: e.target.value })}
                        className="p-2 border w-full"
                        required
                    />
                </div>
            )}
            <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
                Añadir Producto
            </button>
        </form>
    );
};

export default AddProductForm;