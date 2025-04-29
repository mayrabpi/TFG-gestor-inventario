// filepath: client/src/components/AddProductForm.jsx
import React, { useState } from "react";
import { addProduct } from "../api";

const AddProductForm = () => {
    const [product, setProduct] = useState({ id: "", name: "", stock: 0 });

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(product).then(() => {
            alert("Producto añadido");
            setProduct({ id: "", name: "", stock: 0 });
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="ID del producto"
                value={product.id}
                onChange={(e) => setProduct({ ...product, id: e.target.value })}
                className="p-2 border"
            />
            <input
                type="text"
                placeholder="Nombre del producto"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                className="p-2 border"
            />
            <input
                type="number"
                placeholder="Stock"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) || 0 })}
                className="p-2 border"
            />
            <button type="submit" className="bg-blue-500 p-2 text-white">
                Añadir Producto
            </button>
        </form>
    );
};

export default AddProductForm;