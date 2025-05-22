import React from "react";
import ConteoInventario from "../componentes/ConteoInventario";
import { FaClipboardList } from "react-icons/fa";
const Inventario = () => (
    <div className="px-4 py-8 w-full max-w-4xl">

        <h1 className="flex gap-2 mb-6 font-bold text-gray-800 text-3xl"> <FaClipboardList /> Inventario Físico</h1>
        <p className="mb-6 text-gray-600">
            Realiza el conteo físico de productos y compara con el stock registrado.
        </p>
        <ConteoInventario />
    </div>
);

export default Inventario;