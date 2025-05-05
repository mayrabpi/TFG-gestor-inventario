import React, { useState, useEffect } from "react";

const RegistroProveedorForm = ({ formData, onClose, onSubmit }) => {
    const [localFormData, setLocalFormData] = useState(formData);

    useEffect(() => {
        setLocalFormData(formData); // Actualizar los datos locales cuando cambie el formData
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFormData({ ...localFormData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(localFormData); // Notificar al componente padre
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white shadow-md p-6 rounded w-96">
                <h2 className="mb-4 font-bold text-xl">
                    {localFormData.id ? "Modificar Proveedor" : "Registrar Proveedor"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={localFormData.name}
                            onChange={handleChange}
                            className="p-2 border w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Dirección</label>
                        <input
                            type="text"
                            name="address"
                            value={localFormData.address}
                            onChange={handleChange}
                            className="p-2 border w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            value={localFormData.phone}
                            onChange={handleChange}
                            className="p-2 border w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={localFormData.email}
                            onChange={handleChange}
                            className="p-2 border w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 mr-2 px-4 py-2 rounded text-white"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 px-4 py-2 rounded text-white"
                        >
                            {localFormData.id ? "Guardar Cambios" : "Registrar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistroProveedorForm;