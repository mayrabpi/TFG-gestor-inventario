import React, { useEffect, useState } from "react";
import { getProducts } from "../api";

interface Product {
    id: string;
    name: string;
    stock: number;
}

const ListaProductos: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProducts()
            .then((response) => setProducts(response.data))
            .catch((err) => {
                console.error("Error al obtener los productos:", err);
                setError("No se pudieron cargar los productos.");
            });
    }, []);

    return (
        <div>
            <h1 className="font-bold text-2xl">Productos</h1>
            {error && <p className="text-red-500">{error}</p>}
            {products.length === 0 && !error && <p>No hay productos disponibles.</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.stock} unidades
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaProductos;