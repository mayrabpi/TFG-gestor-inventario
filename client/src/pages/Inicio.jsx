import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
import { useNavigate } from "react-router-dom";
import { FaBox, FaUndo, FaBell, FaCalendarAlt, FaTachometerAlt } from "react-icons/fa"; // Importar íconos necesarios

const Inicio = () => {
    const [productos, setProductos] = useState([]);
    const [totalProductos, setTotalProductos] = useState(0);
    const [alertasStock, setAlertasStock] = useState(0);
    const [productosCaducados, setProductosCaducados] = useState(0);
    const [productosProximosCaducar, setProductosProximosCaducar] = useState(0);
    const [valorInventario, setValorInventario] = useState(0);

    const navigate = useNavigate();

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
                setProductosProximosCaducar(
                    productos.filter((p) => {
                        if (!p.perishable || !p.expirationDate) return false;
                        const fechaCaducidad = new Date(p.expirationDate);
                        const diffDays = Math.ceil((fechaCaducidad - new Date()) / (1000 * 60 * 60 * 24));
                        return diffDays > 0 && diffDays <= 7;
                    }).length
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
            <h1 className="flex gap-2 mb-6 font-bold text-gray-800 text-3xl"> <FaTachometerAlt /> Panel de Control</h1>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-blue-100 shadow-lg p-4 rounded">
                    <h2 className="font-bold sm:text-xs lg:text-xl">Total de Productos</h2>
                    <p className="text-2xl">{totalProductos}</p>
                </div>
                <div className="bg-red-100 shadow-lg p-4 rounded">
                    <h2 className="font-bold sm:text-xs lg:text-xl">Alertas de Stock Bajo</h2>
                    <p className="text-2xl">{alertasStock}</p>
                </div>
                <div className="bg-yellow-100 shadow-lg p-4 rounded">
                    <h2 className="font-bold sm:text-xs lg:text-xl">Productos Caducados</h2>
                    <p className="text-2xl">{productosCaducados}</p>
                </div>
                <div className="bg-green-100 shadow-lg p-4 rounded">
                    <h2 className="font-bold sm:text-xs lg:text-xl">Próximos a Caducar</h2>
                    <p className="text-2xl">{productosProximosCaducar}</p>
                </div>
            </div>

            {/* Segunda fila */}
            <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 mt-8">
                {/* Div más grande para el valor del inventario */}
                <div className="lg:col-span-2 bg-gray-50 shadow-lg p-6 rounded">
                    <h2 className="mb-2 font-bold text-xl">Valor del Inventario</h2>
                    <p className="font-bold text-4xl">€{valorInventario}</p>
                    <p className="mt-2 text-gray-500">Valor total aproximado de todos los productos</p>
                </div>

                {/* Div con acciones rápidas */}
                <div className="bg-gray-50 shadow-lg p-6 rounded">
                    <h2 className="mb-4 font-bold text-xl">Acciones rápidas</h2>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => navigate("/productos")}
                            className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 border border-gray-300 rounded text-gray-700"
                        >
                            <FaBox /> Gestionar productos
                        </button>
                        <button
                            onClick={() => navigate("/devolucion")}
                            className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 border border-gray-300 rounded text-gray-700"
                        >
                            <FaUndo /> Registrar una devolución
                        </button>
                        <button
                            onClick={() => navigate("/alertas")}
                            className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 border border-gray-300 rounded text-gray-700"
                        >
                            <FaBell /> Ver alertas
                        </button>
                        <button
                            onClick={() => navigate("/caducados")}
                            className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 border border-gray-300 rounded text-gray-700"
                        >
                            <FaCalendarAlt /> Ver productos a caducar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;