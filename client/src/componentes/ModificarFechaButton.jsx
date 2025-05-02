import React, { useState } from "react";
import { updateProduct } from "../api";

const ModificarFechaButton = ({ producto, onFechaModificada }) => {
    const [nuevaFecha, setNuevaFecha] = useState("");

    const handleModificarFecha = () => {
        if (!nuevaFecha) {
            alert("Por favor, selecciona una nueva fecha.");
            return;
        }

        updateProduct(producto.id, { expirationDate: nuevaFecha })
            .then(() => {
                alert("Fecha de caducidad actualizada correctamente.");
                onFechaModificada(nuevaFecha);
            })
            .catch((err) => {
                console.error("Error al actualizar la fecha de caducidad:", err);
                alert("Error al actualizar la fecha de caducidad. Por favor, inténtalo de nuevo.");
            });
    };

    return (
        <div className="flex items-center space-x-2">
            <input
                type="date"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
                className="px-2 py-1 border rounded"
            />
            <button
                onClick={handleModificarFecha}
                className="bg-blue-500 px-4 py-2 rounded text-white"
            >
                Modificar fecha
            </button>
        </div>
    );
};

export default ModificarFechaButton;