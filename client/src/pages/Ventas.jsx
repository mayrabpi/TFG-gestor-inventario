import React, { useState, useEffect, useRef } from "react";
import { getProducts, updateProduct, guardarVenta } from "../api";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import logo from "../assets/logo.png";

const Ventas = () => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [metodoPago, setMetodoPago] = useState("efectivo");
    const [barcode, setBarcode] = useState("");
    const [mostrarTicket, setMostrarTicket] = useState(false);
    const [total, setTotal] = useState(0);
    const [showDevolucion, setShowDevolucion] = useState(false);
    const [productoDevolver, setProductoDevolver] = useState("");
    const [cantidadDevolver, setCantidadDevolver] = useState(1);
    const barcodeInputRef = useRef(null);

    useEffect(() => {
        fetchProductos();
        if (barcodeInputRef.current) barcodeInputRef.current.focus();
    }, []);

    useEffect(() => {
        const nuevoTotal = carrito.reduce((sum, item) => sum + item.price * item.cantidad, 0);
        setTotal(nuevoTotal);
    }, [carrito]);

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

    const eliminarDelCarrito = (id) => {
        setCarrito((prevCarrito) => {
            const itemIndex = prevCarrito.findIndex(item => item.id === id);
            if (itemIndex === -1) return prevCarrito;

            const item = prevCarrito[itemIndex];
            if (item.cantidad > 1) {
                return prevCarrito.map(p =>
                    p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
                );
            } else {
                return prevCarrito.filter(p => p.id !== id);
            }
        });
    };

    const handleBarcodeInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            buscarYAgregarProducto();
        }
    };

    const buscarYAgregarProducto = () => {
        const producto = productos.find((p) => p.id === barcode.trim());
        if (producto) {
            agregarAlCarrito(producto);
            setBarcode("");
        } else {
            alert("Producto no encontrado");
            setBarcode("");
        }
    };

    const finalizarVenta = () => {
        const venta = {
            carrito,
            total,
            metodoPago,
            fecha: new Date().toISOString(),
        };

        guardarVenta(venta)
            .then(() => {
                carrito.forEach((item) => {
                    const nuevasUnidades = item.units - item.cantidad;
                    updateProduct(item.id, { ...item, units: nuevasUnidades })
                        .then(() => console.log(`Unidades actualizadas para ${item.name}`))
                        .catch((err) => console.error("Error al actualizar las unidades:", err));
                });
                setMostrarTicket(true);
            })
            .catch((err) => {
                alert("Error al guardar la venta");
                console.error(err);
            });
    };

    const cerrarTicket = () => {
        setMostrarTicket(false);
        setCarrito([]);
    };

    const formatearPrecio = (precio) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(precio);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white shadow-md mb-6">
                <div className="flex justify-between items-center mx-auto px-4 py-3 max-w-6xl">
                    <div className="flex items-center space-x-5">
                        <img src={logo} alt="StockAgile Logo" className="h-16 md:h-20" />
                        <h1 className="font-bold text-gray-800 text-2xl md:text-3xl">Punto de Venta</h1>
                    </div>
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition"
                    >
                        <FaHome className="text-lg" /> Inicio
                    </Link>
                </div>
            </div>

            <div className="mx-auto px-4 pb-8 max-w-6xl">
                <p className="mb-6 text-gray-600">Gestione las ventas de productos de forma rápida y eficiente</p>

                <div className="flex md:flex-row flex-col gap-6">
                    {/* Panel izquierdo - Solo input de código de barras */}
                    <div className="bg-white shadow p-6 rounded-lg w-full md:w-2/3 flex flex-col items-center justify-center">
                        <div className="mb-6 w-full max-w-md">
                            <label className="block mb-2 font-semibold text-gray-700">Escanea o introduce el código de barras</label>
                            <div className="flex">
                                <input
                                    ref={barcodeInputRef}
                                    type="text"
                                    value={barcode}
                                    onChange={(e) => setBarcode(e.target.value)}
                                    onKeyDown={handleBarcodeInput}
                                    className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Escanea o introduce el código de barras"
                                    autoFocus
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 px-4 rounded-r-lg text-white transition"
                                    onClick={buscarYAgregarProducto}
                                >
                                    Buscar
                                </button>
                            </div>
                        </div>
                        <div className="text-gray-400 text-sm mt-4">
                            Añade productos al carrito escaneando o introduciendo el código de barras.
                        </div>
                    </div>

                    {/* Panel derecho - Carrito */}
                    <div className="bg-white shadow p-6 rounded-lg w-full md:w-1/3">
                        <h2 className="mb-4 font-bold text-gray-800 text-xl">Carrito de compras</h2>
                        {carrito.length === 0 ? (
                            <div className="py-10 text-gray-500 text-center">
                                El carrito está vacío
                            </div>
                        ) : (
                            <>
                                <div className="mb-4 max-h-64 overflow-y-auto">
                                    {carrito.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center py-2 border-gray-200 border-b">
                                            <div>
                                                <p className="font-medium text-gray-800">{item.name}</p>
                                                <p className="text-gray-500 text-sm">
                                                    {formatearPrecio(item.price)} x {item.cantidad}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="mr-4 font-medium">
                                                    {formatearPrecio(item.price * item.cantidad)}
                                                </span>
                                                <button
                                                    onClick={() => eliminarDelCarrito(item.id)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-6 pt-4 border-gray-200 border-t">
                                    <div className="flex justify-between items-center font-bold text-lg">
                                        <span>Total</span>
                                        <span>{formatearPrecio(total)}</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 font-semibold text-gray-700">Método de Pago</label>
                                    <select
                                        value={metodoPago}
                                        onChange={(e) => setMetodoPago(e.target.value)}
                                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    >
                                        <option value="efectivo">Efectivo</option>
                                        <option value="tarjeta">Tarjeta</option>
                                        <option value="transferencia">Transferencia</option>
                                    </select>
                                </div>

                                <button
                                    onClick={finalizarVenta}
                                    className="bg-green-500 hover:bg-green-600 py-3 rounded-lg w-full font-bold text-white transition"
                                >
                                    Finalizar Venta
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Botón de devolución siempre visible */}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => setShowDevolucion(true)}
                        className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-lg font-bold text-white transition"
                    >
                        Devolver producto
                    </button>
                </div>
            </div>

            {/* Modal de Ticket */}
            {mostrarTicket && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-lg mx-4 p-6 rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-xl">Ticket de Compra</h3>
                            <button
                                onClick={cerrarTicket}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                        <div className="mb-4 py-4 border-gray-200 border-t border-b">
                            <div className="mb-4 text-center">
                                <p className="font-bold text-lg">StockAgile</p>
                                <p className="text-gray-500 text-sm">
                                    {new Date().toLocaleDateString('es-ES')} - {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <table className="mb-4 w-full">
                                <thead>
                                    <tr className="border-gray-200 border-b">
                                        <th className="py-2 text-left">Producto</th>
                                        <th className="py-2 text-center">Cant.</th>
                                        <th className="py-2 text-right">Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrito.map((item) => (
                                        <tr key={item.id} className="border-gray-100 border-b">
                                            <td className="py-2">{item.name}</td>
                                            <td className="py-2 text-center">{item.cantidad}</td>
                                            <td className="py-2 text-right">{formatearPrecio(item.price * item.cantidad)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between mb-2 font-bold">
                                <span>Total</span>
                                <span>{formatearPrecio(total)}</span>
                            </div>
                            <div className="text-gray-600">
                                <p>Método de pago: {metodoPago === "efectivo" ? "Efectivo" : metodoPago === "tarjeta" ? "Tarjeta" : "Transferencia"}</p>
                            </div>
                        </div>
                        <div className="text-gray-500 text-sm text-center">
                            <p>¡Gracias por su compra!</p>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={cerrarTicket}
                                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white transition"
                            >
                                Imprimir
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Devolución */}
            {showDevolucion && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded w-full max-w-sm">
                        <h2 className="mb-4 font-bold text-lg">Devolver producto</h2>
                        <div className="mb-4">
                            <label className="block mb-2">Código de barras</label>
                            <input
                                type="text"
                                value={productoDevolver}
                                onChange={e => setProductoDevolver(e.target.value)}
                                className="p-2 border w-full"
                                placeholder="Introduce o escanea el código de barras"
                                autoFocus
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Cantidad</label>
                            <input
                                type="number"
                                min={1}
                                value={cantidadDevolver}
                                onChange={e => setCantidadDevolver(e.target.value)}
                                className="p-2 border w-full"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowDevolucion(false)}
                                className="bg-gray-400 px-4 py-2 rounded text-white"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    const prod = productos.find(p => p.id === productoDevolver.trim());
                                    if (!prod) {
                                        alert("Producto no encontrado");
                                        return;
                                    }
                                    if (Number(cantidadDevolver) < 1) {
                                        alert("Cantidad inválida");
                                        return;
                                    }
                                    updateProduct(prod.id, { ...prod, units: Number(prod.units) + Number(cantidadDevolver) })
                                        .then(() => {
                                            alert("Devolución realizada");
                                            fetchProductos();
                                            setShowDevolucion(false);
                                            setProductoDevolver("");
                                            setCantidadDevolver(1);
                                        })
                                        .catch(() => alert("Error al devolver el producto"));
                                }}
                                className="bg-yellow-500 px-4 py-2 rounded text-white"
                            >
                                Confirmar devolución
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ventas;