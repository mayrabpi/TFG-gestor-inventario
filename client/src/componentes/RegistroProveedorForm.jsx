import React, { useState } from "react";
import { addProvider } from "../api"; // Asegúrate de tener esta función en tu API

const RegistroProveedorForm = ({ onProviderAdded }) => {
    const [provider, setProvider] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (!provider.name || !provider.address || !provider.phone) {
            setError("Por favor, completa todos los campos obligatorios.");
            return;
        }

        addProvider(provider)
            .then(() => {
                alert("Proveedor registrado correctamente");
                setProvider({ name: "", address: "", phone: "", email: "" });
                setError("");
                if (onProviderAdded) onProviderAdded(); // Notificar al padre que se añadió un proveedor
            })
            .catch((err) => console.error("Error al registrar el proveedor:", err));
    };

    return (
        <form onSubmit={handleSubmit} className="shadow-md p-4 border rounded">
            <h2 className="mb-4 font-bold text-xl">Registrar Proveedor</h2>

            {error && <p className="mb-4 text-red-500">{error}</p>}

            <div className="mb-4">
                <label className="block mb-2">Nombre del Proveedor</label>
                <input
                    type="text"
                    value={provider.name}
                    onChange={(e) => setProvider({ ...provider, name: e.target.value })}
                    className="p-2 border w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Dirección</label>
                <input
                    type="text"
                    value={provider.address}
                    onChange={(e) => setProvider({ ...provider, address: e.target.value })}
                    className="p-2 border w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Teléfono</label>
                <input
                    type="text"
                    value={provider.phone}
                    onChange={(e) => setProvider({ ...provider, phone: e.target.value })}
                    className="p-2 border w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Correo Electrónico (opcional)</label>
                <input
                    type="email"
                    value={provider.email}
                    onChange={(e) => setProvider({ ...provider, email: e.target.value })}
                    className="p-2 border w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
                Registrar Proveedor
            </button>
        </form>
    );
};

export default RegistroProveedorForm;