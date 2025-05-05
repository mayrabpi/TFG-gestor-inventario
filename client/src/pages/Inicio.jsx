import React, { useEffect, useState } from "react";
import { getProducts } from "../api";

const Inicio = () => {
    const [productos, setProductos] = useState([]);
    const [totalProductos, setTotalProductos] = useState(0);
    const [alertasStock, setAlertasStock] = useState(0);
    const [productosCaducados, setProductosCaducados] = useState(0);
    const [valorInventario, setValorInventario] = useState(0);

    useEffect(() => {
        getProducts()
            .then((response) => {
                const productos = response.data;
                setProductos(productos);
                setTotalProductos(productos.length);
                setAlertasStock(productos.filter((p) => p.units <= p.lowStockThreshold).length);
                setProductosCaducados(
                    productos.filter((p) => p.perishable && new Date(p.expirationDate) <= new Date()).length
                );
                setValorInventario(
                    productos.reduce((total, p) => {
                        const price = parseFloat(p.price) || 0;
                        const units = parseFloat(p.units) || 0;
                        return total + price * units;
                    }, 0).toFixed(2)
                );
            })
            .catch((err) => console.error("Error al obtener los productos:", err));
    }, []);

    return (
        <div className="p-4">
            <h1 className="mb-4 font-bold text-3xl">Panel de Control</h1>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-blue-100 shadow p-4 rounded">
                    <h2 className="font-bold sm:text-xs lg:text-xl">Total de Productos</h2>
                    <p className="text-2xl">{totalProductos}</p>
                </div>
                <div className="bg-red-100 shadow p-4 rounded">
                    <h2 className="font-bold sm:text-xs lg:text-xl">Alertas de Stock Bajo</h2>
                    <p className="text-2xl">{alertasStock}</p>
                </div>
                <div className="bg-yellow-100 shadow p-4 rounded">
                    <h2 className="font-bold sm:text-xs lg:text-xl">Productos Caducados</h2>
                    <p className="text-2xl">{productosCaducados}</p>
                </div>
                <div className="bg-green-100 shadow p-4 rounded">
                    <h2 className="font-bold sm:text-xs lg:text-xl">Valor del Inventario (€)</h2>
                    <p className="text-2xl">€{valorInventario}</p>
                </div>
            </div>
        </div>
    );
};

export default Inicio;