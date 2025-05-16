import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxes, FaShoppingCart } from "react-icons/fa";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-white to-gray-100 px-4 min-h-screen">
            <div className="bg-white shadow-lg p-8 sm:p-12 rounded-2xl w-full max-w-4xl">
                <h1 className="mb-8 font-bold text-gray-800 text-4xl sm:text-5xl text-center">
                    Sistema de Gestión
                </h1>

                <p className="mb-10 text-gray-600 text-lg text-center">
                    Seleccione una opción para comenzar a gestionar su negocio
                </p>

                <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
                    <div className="bg-blue-50 shadow-sm hover:shadow-md p-6 rounded-xl transition duration-300">
                        <div className="mb-4 text-blue-600 text-center">
                            <FaBoxes className="mx-auto w-12 h-12" />
                        </div>
                        <h2 className="mb-3 font-bold text-gray-800 text-xl text-center">Control de Stock</h2>
                        <p className="mb-6 text-gray-600 text-center">
                            Gestione su inventario, añada nuevos productos y controle existencias
                        </p>
                        <button
                            onClick={() => navigate("/productos")}
                            className="bg-blue-600 hover:bg-blue-700 focus:ring-opacity-50 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full font-medium text-white transition duration-300"
                        >
                            Ir al Control de Stock
                        </button>
                    </div>

                    <div className="bg-green-50 shadow-sm hover:shadow-md p-6 rounded-xl transition duration-300">
                        <div className="mb-4 text-green-600 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className="mb-3 font-bold text-gray-800 text-xl text-center">Punto de Venta</h2>
                        <p className="mb-6 text-gray-600 text-center">
                            Registre ventas, genere tickets y atienda a sus clientes
                        </p>
                        <button
                            onClick={() => navigate("/ventas")}
                            className="bg-green-600 hover:bg-green-700 focus:ring-opacity-50 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full font-medium text-white transition duration-300"
                        >
                            Realizar una Venta
                        </button>
                    </div>
                </div>

                <div className="mt-10 text-gray-500 text-center">
                    <p>© {new Date().getFullYear()} Mi Tienda - Todos los derechos reservados</p>
                </div>
            </div>
        </div>
    );
};

export default Home;