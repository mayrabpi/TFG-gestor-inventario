import React, { useState, useEffect } from "react";
import { getProducts, updateProduct } from "../api";

// Nueva función para registrar la devolución en el backend
const registrarDevolucionAPI = async (payload) => {
    const res = await fetch("http://localhost:5000/devoluciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Error al registrar la devolución");
    return res.json();
};

const RegistrarDevolucion = ({ onCancel, onInventoryUpdate }) => {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [units, setUnits] = useState("");
    const [sugerencias, setSugerencias] = useState([]);
    const [motivo, setMotivo] = useState("caducado"); // Nuevo campo motivo

    useEffect(() => {
        getProducts()
            .then((response) => setProductos(response.data))
            .catch((err) => console.error("Error al obtener los productos:", err));
    }, []);

    const handleSearch = (e) => {
        const valor = e.target.value.trim();
        setBusqueda(valor);

        if (valor === "") {
            setProductoSeleccionado(null);
            setSugerencias([]);
            return;
        }

        const porCodigo = productos.find((p) => p.id === valor);
        if (porCodigo) {
            setProductoSeleccionado(porCodigo);
            setSugerencias([]);
        } else {
            const sugerenciasFiltradas = productos.filter((p) =>
                p.name.toLowerCase().includes(valor.toLowerCase())
            );
            setSugerencias(sugerenciasFiltradas);
            setProductoSeleccionado(null);
        }
    };

    const seleccionarProducto = (producto) => {
        setProductoSeleccionado(producto);
        setBusqueda(producto.name);
        setSugerencias([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productoSeleccionado) {
            alert("Selecciona un producto válido.");
            return;
        }

        const cantidad = parseFloat(units);
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Introduce una cantidad válida mayor que 0.");
            return;
        }

        const updatedProduct = {
            ...productoSeleccionado,
            units: productoSeleccionado.units - cantidad,
        };

        try {
            await updateProduct(productoSeleccionado.id, updatedProduct);

            // Registrar la devolución en la base de datos
            await registrarDevolucionAPI({
                producto_id: productoSeleccionado.id,
                producto_nombre: productoSeleccionado.name,
                unidades: cantidad,
                importe_total: (productoSeleccionado.price || 0) * cantidad, // precio * unidades devueltas
                motivo,
                fecha: new Date().toISOString(),
            });

            alert("Destrucción registrada correctamente");
            setBusqueda("");
            setUnits("");
            setProductoSeleccionado(null);
            setSugerencias([]);
            setMotivo("caducado");
            if (onInventoryUpdate) onInventoryUpdate(updatedProduct);
        } catch (err) {
            console.error("Error al registrar la destrucción:", err);
            alert("Hubo un error al registrar la destrucción.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="shadow-lg p-4 border border-gray-300 rounded">
            <h2 className="mb-4 font-bold text-xl">Registrar Destrucción</h2>

            <div className="relative mb-4">
                <label className="block mb-2">Código de Barras o Nombre</label>
                <input
                    type="text"
                    value={busqueda}
                    onChange={handleSearch}
                    className="p-2 border border-gray-400 rounded w-full"
                    placeholder="Escanea o escribe el código o nombre"
                    required
                />
                {sugerencias.length > 0 && (
                    <ul className="z-10 absolute bg-white mt-1 border border-gray-300 rounded w-full max-h-40 overflow-y-auto">
                        {sugerencias.map((producto) => (
                            <li
                                key={producto.id}
                                onClick={() => seleccionarProducto(producto)}
                                className="hover:bg-gray-100 p-2 cursor-pointer"
                            >
                                {producto.name} (Stock: {producto.units})
                            </li>
                        ))}
                    </ul>
                )}
                {productoSeleccionado && (
                    <p className="mt-1 text-gray-600 text-sm">
                        Producto: <strong>{productoSeleccionado.name}</strong> (Stock actual: {productoSeleccionado.units})
                    </p>
                )}
            </div>

            <div className="mb-4">
                <label className="block mb-2">Unidades a destruir</label>
                <input
                    type="text"
                    inputMode="decimal"
                    pattern="^\d*\.?\d*$"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className="p-2 border border-gray-400 rounded w-full"
                    placeholder="Introduce cantidad a destruir"
                    required
                    disabled={!productoSeleccionado}
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Motivo</label>
                <select
                    value={motivo}
                    onChange={e => setMotivo(e.target.value)}
                    className="p-2 border border-gray-400 rounded w-full"
                >
                    <option value="caducado">Caducado</option>
                    <option value="roto">Roto</option>
                    <option value="otro">Otro</option>
                </select>
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => {
                        setBusqueda("");
                        setUnits("");
                        setProductoSeleccionado(null);
                        setSugerencias([]);
                        setMotivo("caducado");
                        onCancel();
                    }}
                    className="bg-gray-600 hover:bg-gray-500 mt-4 mb-2 px-4 py-2 rounded-md text-white transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-400 mt-4 mb-2 px-4 py-2 rounded-md text-white transition-colors"
                    disabled={!productoSeleccionado}
                >
                    Registrar Destrucción
                </button>
            </div>
        </form>
    );
};

export default RegistrarDevolucion;
