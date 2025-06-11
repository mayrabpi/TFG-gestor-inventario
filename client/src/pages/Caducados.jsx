import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import ModificarFechaButton from "../componentes/ModificarFechaButton";
import RegistrarDevolucion from "../componentes/RegistrarDevolucion";
import { updateProduct, getProducts } from "../api";
import { useNavigate } from "react-router-dom";

const Caducados = ({ productos: productosIniciales = [] }) => {
    // Usaremos nuestro propio estado para manejar los productos
    const [productos, setProductos] = useState(productosIniciales);
    const [view, setView] = useState("proximos");
    const [showForm, setShowForm] = useState(null);
    const navigate = useNavigate();
    const [refreshKey, setRefreshKey] = useState(0); // Mantenemos esta clave para la lógica interna

    const today = new Date();

    // Efecto para cargar productos si no se proporcionan o cuando cambia refreshKey
    useEffect(() => {
        getProducts()
            .then(response => {
                setProductos(response.data);
            })
            .catch(err => console.error("Error al obtener los productos:", err));
    }, [refreshKey]);

    const proximosACaducar = productos.filter((producto) => {
        if (!producto.perishable || !producto.expirationDate) return false;
        const fechaCaducidad = new Date(producto.expirationDate);
        const diffDays = Math.ceil((fechaCaducidad - today) / (1000 * 60 * 60 * 24));
        return diffDays > 0 && diffDays <= 5;
    });

    const caducados = productos.filter((producto) => {
        if (!producto.perishable || !producto.expirationDate) return false;
        const fechaCaducidad = new Date(producto.expirationDate);
        return fechaCaducidad < today;
    });

    const toggleForm = (productId) => {
        setShowForm((prev) => (prev === productId ? null : productId));
    };

    // Función para actualizar un producto específico en el estado local
    const actualizarProducto = (productoActualizado) => {
        // Verificar si productoActualizado es válido
        if (!productoActualizado || !productoActualizado.id) {
            console.error("Error: Producto actualizado inválido", productoActualizado);
            return;
        }

        setProductos(productosActuales =>
            productosActuales.map(prod =>
                prod.id === productoActualizado.id ? productoActualizado : prod
            )
        );
    };

    // Función para manejar la actualización del inventario
    const handleInventoryUpdate = (productoActualizado) => {
        console.log("Inventory updated from Caducados page.", productoActualizado);

        // Si el producto actualizado es válido, actualízalo en el estado
        if (productoActualizado && productoActualizado.id) {
            actualizarProducto(productoActualizado);
        }
        // Si no recibimos un producto actualizado, refrescar los datos
        else {
            setRefreshKey(old => old + 1); // Forzar recarga de datos
        }

        // Cerrar el formulario
        setShowForm(null);
    };

    // Función para manejar la actualización de fecha
    const handleFechaModificada = (producto, nuevaFecha) => {
        const productoActualizado = { ...producto, expirationDate: nuevaFecha };

        updateProduct(producto.id, productoActualizado)
            .then(() => {
                actualizarProducto(productoActualizado);
            })
            .catch(err => console.error("Error al actualizar la fecha:", err));
    };

    return (
        <div className="p-4">
            <h1 className="flex gap-2 mb-6 font-bold text-gray-800 text-3xl">
                <FaCalendarAlt /> Control de Caducidad
            </h1>

            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setView("proximos")}
                        className={`px-4 py-2 rounded ${view === "proximos" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-200"} transition-colors`}
                    >
                        Próximos a caducar ({proximosACaducar.length})
                    </button>
                    <button
                        onClick={() => setView("caducados")}
                        className={`px-4 py-2 rounded ${view === "caducados" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-200"} transition-colors`}
                    >
                        Caducados ({caducados.length})
                    </button>
                </div>

                {/* Botón de actualizar datos eliminado */}
            </div>

            {/* Vista de productos próximos a caducar */}
            {view === "proximos" && (
                <>
                    {proximosACaducar.length === 0 ? (
                        <p className="text-gray-500">No hay productos próximos a caducar.</p>
                    ) : (
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                            {proximosACaducar.map((producto) => {
                                const fechaCaducidad = new Date(producto.expirationDate);
                                const diffDays = Math.ceil((fechaCaducidad - today) / (1000 * 60 * 60 * 24));
                                return (
                                    <div key={producto.id} className="shadow p-4 border rounded">
                                        <h2 className="font-bold text-lg">{producto.name}</h2>
                                        <span className="bg-orange-100 px-2 py-1 rounded text-orange-800 text-sm">
                                            Próximo a caducar
                                        </span>
                                        <p>{producto.units} en stock</p>
                                        <p className="text-gray-600">{producto.expirationDate}</p>
                                        <p>Caduca en {diffDays} días</p>
                                        <ModificarFechaButton
                                            producto={producto}
                                            onFechaModificada={(nuevaFecha) => {
                                                handleFechaModificada(producto, nuevaFecha);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </>
            )}

            {/* Vista de productos caducados */}
            {view === "caducados" && (
                <>
                    {caducados.length === 0 ? (
                        <p className="text-gray-500">No hay productos caducados.</p>
                    ) : (
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                            {caducados.map((producto) => (
                                <div key={producto.id} className="shadow p-4 border rounded">
                                    <h2 className="font-bold text-lg">{producto.name}</h2>
                                    <span className="bg-red-200 px-2 py-1 rounded text-red-800 text-sm">
                                        Caducado
                                    </span>
                                    <p>{producto.units} en stock</p>
                                    <p className="text-gray-600">{producto.expirationDate}</p>
                                    <ModificarFechaButton
                                        producto={producto}
                                        onFechaModificada={(nuevaFecha) => {
                                            handleFechaModificada(producto, nuevaFecha);
                                        }}
                                    />
                                    <button
                                        onClick={() => toggleForm(producto.id)}
                                        className="bg-blue-500 hover:bg-blue-600 mt-4 mb-2 px-4 py-1.5 rounded-md text-white transition-colors"
                                    >
                                        {showForm === producto.id ? "Cerrar Formulario" : "Añadir a Devolución"}
                                    </button>
                                    {showForm === producto.id && (
                                        <RegistrarDevolucion
                                            producto={producto}
                                            onCancel={() => toggleForm(producto.id)}
                                            onInventoryUpdate={(productoActualizado) => {
                                                // Asegúrate que siempre se pase un valor válido
                                                handleInventoryUpdate(productoActualizado || producto);
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Caducados;