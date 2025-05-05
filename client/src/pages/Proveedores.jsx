import React, { useEffect, useState } from "react";
import { getProviders, addProvider, updateProvider, deleteProvider } from "../api";
import RegistroProveedorForm from "../componentes/RegistroProveedorForm";

const Proveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        address: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        fetchProviders();
    }, []);

    const fetchProviders = () => {
        getProviders()
            .then((response) => setProveedores(response.data))
            .catch((err) => console.error("Error al obtener los proveedores:", err));
    };

    const handleFormSubmit = (data) => {
        if (data.id) {
            // Actualizar proveedor
            updateProvider(data.id, data)
                .then(() => {
                    alert("Proveedor actualizado correctamente");
                    setShowForm(false);
                    fetchProviders();
                })
                .catch((err) => console.error("Error al actualizar el proveedor:", err));
        } else {
            // Agregar proveedor
            addProvider(data)
                .then(() => {
                    alert("Proveedor registrado correctamente");
                    setShowForm(false);
                    fetchProviders();
                })
                .catch((err) => console.error("Error al registrar el proveedor:", err));
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
            deleteProvider(id)
                .then(() => {
                    alert("Proveedor eliminado correctamente");
                    fetchProviders();
                })
                .catch((err) => console.error("Error al eliminar el proveedor:", err));
        }
    };

    const handleEdit = (provider) => {
        setFormData(provider);
        setShowForm(true);
    };

    const handleAdd = () => {
        setFormData({ id: null, name: "", address: "", phone: "", email: "" });
        setShowForm(true);
    };

    return (
        <div className="p-4">
            <h1 className="mb-4 font-bold text-3xl">Gestión de Proveedores</h1>
            <button
                onClick={handleAdd}
                className="bg-blue-500 mb-4 px-4 py-2 rounded text-white"
            >
                Registrar Proveedor
            </button>

            <div className="overflow-x-auto">
                <table className="border border-gray-300 w-full border-collapse table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">Nombre</th>
                            <th className="px-4 py-2 border border-gray-300">Dirección</th>
                            <th className="px-4 py-2 border border-gray-300">Teléfono</th>
                            <th className="px-4 py-2 border border-gray-300">Correo Electrónico</th>
                            <th className="px-4 py-2 border border-gray-300">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map((proveedor) => (
                            <tr key={proveedor.id}>
                                <td className="px-4 py-2 border border-gray-300">{proveedor.name}</td>
                                <td className="px-4 py-2 border border-gray-300">{proveedor.address}</td>
                                <td className="px-4 py-2 border border-gray-300">{proveedor.phone}</td>
                                <td className="px-4 py-2 border border-gray-300">{proveedor.email || "N/A"}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button
                                        onClick={() => handleEdit(proveedor)}
                                        className="bg-yellow-500 mr-2 px-2 py-1 rounded text-white"
                                    >
                                        Modificar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(proveedor.id)}
                                        className="bg-red-500 px-2 py-1 rounded text-white"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <RegistroProveedorForm
                    formData={formData}
                    onClose={() => setShowForm(false)}
                    onSubmit={handleFormSubmit}
                />
            )}
        </div>
    );
};

export default Proveedores;