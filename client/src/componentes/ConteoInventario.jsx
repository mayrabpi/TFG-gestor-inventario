import React, { useEffect, useState } from "react";
import { getProducts, updateProduct } from "../api";

const ConteoInventario = () => {
    const [productos, setProductos] = useState([]);
    const [conteo, setConteo] = useState({});
    const [codigoBarras, setCodigoBarras] = useState("");
    const [unidadesContadas, setUnidadesContadas] = useState("");
    const [mostrarInforme, setMostrarInforme] = useState(false);
    const [diferencias, setDiferencias] = useState([]);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        getProducts()
            .then((res) => setProductos(res.data))
            .catch((err) => console.error("Error al obtener productos:", err));
    }, []);

    const handleAgregarConteo = () => {
        const producto = productos.find((p) => p.id === codigoBarras.trim());
        if (!producto) {
            setMensaje("Producto no encontrado.");
            return;
        }
        if (!unidadesContadas || isNaN(unidadesContadas) || Number(unidadesContadas) < 0) {
            setMensaje("Introduce una cantidad válida.");
            return;
        }
        setConteo((prev) => ({
            ...prev,
            [producto.id]: Number(unidadesContadas)
        }));
        setCodigoBarras("");
        setUnidadesContadas("");
        setMensaje("");
    };

    const compararInventario = () => {
        const difs = productos
            .map((prod) => {
                const cantidadContada = conteo[prod.id];
                if (cantidadContada === undefined) return null;
                const diferencia = cantidadContada - prod.units;
                if (diferencia !== 0) {
                    return {
                        ...prod,
                        cantidadContada,
                        diferencia
                    };
                }
                return null;
            })
            .filter(Boolean);
        setDiferencias(difs);
        setMostrarInforme(true);
    };

    const validarInventario = async () => {
        try {
            for (const prod of diferencias) {
                await updateProduct(prod.id, { ...prod, units: prod.cantidadContada });
            }
            alert("Inventario validado y stock actualizado.");
            limpiarConteo();
        } catch (err) {
            alert("Error al actualizar el stock.");
        }
    };

    const limpiarConteo = () => {
        setConteo({});
        setMostrarInforme(false);
        setDiferencias([]);
        setCodigoBarras("");
        setUnidadesContadas("");
        setMensaje("");
    };

    return (
        <div className="w-full max-w-4xl">
            {!mostrarInforme ? (
                <>
                    <div className="flex sm:flex-row flex-col items-start sm:items-end gap-2 mb-4">
                        <div className="w-full sm:w-auto">
                            <label className="block mb-1">Código de barras</label>
                            <input
                                type="text"
                                value={codigoBarras}
                                onChange={e => setCodigoBarras(e.target.value)}
                                className="p-2 border rounded w-full sm:w-40"
                                placeholder="Escanea o escribe"
                                autoFocus
                            />
                        </div>
                        <div className="w-full sm:w-auto">
                            <label className="block mb-1">Unidades contadas</label>
                            <input
                                type="number"
                                min={0}
                                value={unidadesContadas}
                                onChange={e => setUnidadesContadas(e.target.value)}
                                className="p-2 border rounded w-full sm:w-28"
                                placeholder="Cantidad"
                            />
                        </div>
                        <button
                            onClick={handleAgregarConteo}
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-full sm:w-auto font-bold text-white"
                        >
                            Agregar
                        </button>
                    </div>
                    {mensaje && <div className="mb-2 text-red-600">{mensaje}</div>}
                    <div className="overflow-x-auto">
                        <table className="mb-6 w-full text-sm sm:text-base border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Producto</th>
                                    <th className="p-2 text-right">Stock registrado</th>
                                    <th className="p-2 text-right">Cantidad contada</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(conteo).map((id) => {
                                    const prod = productos.find((p) => p.id === id);
                                    if (!prod) return null;
                                    return (
                                        <tr key={id} className="border-b">
                                            <td className="p-2">{prod.name}</td>
                                            <td className="p-2 text-right">{prod.units}</td>
                                            <td className="p-2 text-right">{conteo[id]}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
                        <button
                            onClick={compararInventario}
                            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded font-bold text-white"
                            disabled={Object.keys(conteo).length === 0}
                        >
                            Comparar inventario
                        </button>
                        <button
                            onClick={limpiarConteo}
                            className="bg-gray-400 hover:bg-gray-500 px-6 py-2 rounded font-bold text-white"
                        >
                            Limpiar conteo
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    <h2 className="mb-4 font-bold text-gray-700 text-2xl">Informe de diferencias</h2>
                    {diferencias.length === 0 ? (
                        <p className="font-semibold text-green-600">No hay diferencias de stock.</p>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="mb-6 w-full text-sm sm:text-base border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 text-left">Producto</th>
                                            <th className="p-2 text-right">Diferencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {diferencias.map((prod) => (
                                            <tr key={prod.id} className="border-b">
                                                <td className="p-2">{prod.name}</td>
                                                <td className={`p-2 text-right font-bold ${prod.diferencia > 0 ? "text-green-600" : "text-red-600"}`}>
                                                    {prod.diferencia > 0 ? "+" : ""}
                                                    {prod.diferencia}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button
                                onClick={validarInventario}
                                className="bg-green-600 hover:bg-green-700 mr-4 px-6 py-2 rounded font-bold text-white"
                            >
                                Validar inventario
                            </button>
                        </>
                    )}
                    <button
                        onClick={limpiarConteo}
                        className="bg-blue-500 hover:bg-blue-600 mt-2 px-6 py-2 rounded font-bold text-white"
                    >
                        Nuevo conteo
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConteoInventario;