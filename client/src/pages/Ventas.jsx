import React, { useState, useEffect } from "react";
import { getProducts, updateProduct } from "../api";

const Ventas = () => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [metodoPago, setMetodoPago] = useState("efectivo");

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = () => {
        getProducts()
            .then((response) => setProductos(response.data))
            .catch((err) => console.error("Error al obtener los productos:", err));
    };

    const agregarAlCarrito = (producto) => {
        setCarrito((prevCarrito) => {
            const productoExistente = prevCarrito.find((p) => p.id === producto.id);
            if (productoExistente) {
                return prevCarrito.map((p) =>
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
                );
            }
            return [...prevCarrito, { ...producto, cantidad: 1 }];
        });
    };

    const finalizarVenta = () => {
        carrito.forEach((item) => {
            const nuevasUnidades = item.units - item.cantidad; // Modificar las unidades
            updateProduct(item.id, { ...item, units: nuevasUnidades }) // Actualizar las unidades en el backend
                .then(() => console.log(`Unidades actualizadas para ${item.name}`))
                .catch((err) => console.error("Error al actualizar las unidades:", err));
        });

        const ticket = `
        *** TICKET DE COMPRA ***
        Productos:
        ${carrito.map((item) => `${item.name} x${item.cantidad} - $${item.price * item.cantidad}`).join("\n")}
        Método de pago: ${metodoPago}
        Total: $${carrito.reduce((total, item) => total + item.price * item.cantidad, 0)}
        `;

        alert(ticket);
        setCarrito([]);
    };

    return (
        <div className="p-4">
            <h1 className="mb-4 font-bold text-3xl">Venta de Productos</h1>
            <div className="gap-4 grid grid-cols-2">
                <div>
                    <h2 className="mb-2 font-bold text-xl">Productos</h2>
                    <ul>
                        {productos.map((producto) => (
                            <li key={producto.id} className="flex justify-between items-center mb-2">
                                <span>{producto.name} - ${producto.price}</span>
                                <button
                                    onClick={() => agregarAlCarrito(producto)}
                                    className="bg-blue-500 px-4 py-2 rounded text-white"
                                >
                                    Añadir
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="mb-2 font-bold text-xl">Carrito</h2>
                    <ul>
                        {carrito.map((item) => (
                            <li key={item.id} className="flex justify-between items-center mb-2">
                                <span>
                                    {item.name} x{item.cantidad} - ${item.price * item.cantidad}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <label className="block mb-2">Método de Pago</label>
                        <select
                            value={metodoPago}
                            onChange={(e) => setMetodoPago(e.target.value)}
                            className="p-2 border w-full"
                        >
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjeta">Tarjeta</option>
                        </select>
                    </div>
                    <button
                        onClick={finalizarVenta}
                        className="bg-green-500 mt-4 px-4 py-2 rounded text-white"
                    >
                        Finalizar Venta
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ventas;