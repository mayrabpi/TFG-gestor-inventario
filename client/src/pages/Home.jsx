import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 h-screen">
            <h1 className="mb-8 font-bold text-4xl">¿Qué deseas hacer?</h1>
            <div className="flex gap-4">
                <button
                    onClick={() => navigate("/productos")}
                    className="bg-blue-500 px-6 py-3 rounded-lg text-white text-lg"
                >
                    Ir al Control de Stock
                </button>
                <button
                    onClick={() => navigate("/ventas")}
                    className="bg-green-500 px-6 py-3 rounded-lg text-white text-lg"
                >
                    Realizar una Venta
                </button>
            </div>
        </div>
    );
};

export default Home;