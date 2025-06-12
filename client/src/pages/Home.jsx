import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxes, FaShoppingCart, FaEnvelope } from "react-icons/fa";
import logo from "../assets/logo.png";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Contenido principal */}
            <div className="flex flex-col w-full min-h-screen">
                <main className="flex-grow px-4 py-12 w-full">
                    {/* Header con logo */}
                    <div className="mx-auto mb-12 max-w-5xl text-center">
                        <img
                            src={logo}
                            alt="StockAgile Logo"
                            className="mx-auto mb-8 h-32 md:h-44"
                        />
                        <h1 className="mb-4 font-extrabold text-gray-800 text-4xl md:text-5xl">
                            Sistema de Gestión <span className="text-blue-600">StockAgile</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-gray-600 text-lg">
                            Gestione su inventario y ventas de forma eficiente
                        </p>
                    </div>

                    {/* Opciones principales en tarjetas más compactas */}
                    <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-4xl">
                        {/* Tarjeta de Control de Stock */}
                        <div className="bg-white shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition duration-300 transform">
                            <div className="bg-blue-600 h-2"></div>
                            <div className="p-6">
                                <div className="flex justify-center items-center mb-4">
                                    <div className="bg-blue-100 mr-4 p-3 rounded-full">
                                        <FaBoxes className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h2 className="font-bold text-gray-800 text-2xl">Control de Stock</h2>
                                </div>
                                <p className="mb-6 text-gray-600">
                                    Gestione su inventario, añada nuevos productos y controle existencias
                                </p>

                                <button
                                    onClick={() => navigate("/inicio")}
                                    className="bg-blue-600 hover:bg-blue-700 focus:ring-opacity-50 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full font-medium text-white transition duration-300"
                                >
                                    Ir al Control de Stock
                                </button>
                            </div>
                        </div>

                        {/* Tarjeta de Punto de Venta */}
                        <div className="bg-white shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition duration-300 transform">
                            <div className="bg-green-600 h-2"></div>
                            <div className="p-6">
                                <div className="flex justify-center items-center mb-4">
                                    <div className="bg-green-100 mr-4 p-3 rounded-full">
                                        <FaShoppingCart className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h2 className="font-bold text-gray-800 text-2xl">Punto de Venta</h2>
                                </div>
                                <p className="mb-6 text-gray-600">
                                    Registre ventas, genere tickets y atienda a sus clientes
                                </p>
                                <button
                                    onClick={() => navigate("/ventas")}
                                    className="bg-green-600 hover:bg-green-700 focus:ring-opacity-50 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full font-medium text-white transition duration-300"
                                >
                                    Realizar una Venta
                                </button>
                            </div>
                        </div>
                    </div>
                </main >
                {/* Footer SIEMPRE al final, nunca tapa contenido */}
                < footer className="bg-gray-600 py-6 w-full text-white" >
                    <div className="mx-auto px-4 max-w-5xl">
                        <div className="gap-6 grid grid-cols-2 md:grid-cols-4">
                            {/* Sección de navegación */}
                            <div>
                                <h3 className="mb-2 font-semibold">Navegación</h3>
                                <ul className="space-y-1">
                                    <li><button onClick={() => navigate("/")} className="text-gray-400 hover:text-white transition">Inicio</button></li>
                                </ul>
                            </div>
                            {/* Gestión */}
                            <div>
                                <h3 className="mb-2 font-semibold">Gestión</h3>
                                <ul className="space-y-1">
                                    <li><button onClick={() => navigate("/ventas")} className="text-gray-400 hover:text-white transition">Ventas</button></li>
                                </ul>
                            </div>
                            {/* Ayuda */}
                            <div>
                                <h3 className="mb-2 font-semibold">Ayuda</h3>
                                <ul className="space-y-1">
                                    <li><button onClick={() => navigate("/manual")} className="text-gray-400 hover:text-white transition">Manual de Usuario</button></li>
                                </ul>
                            </div>
                            {/* Acerca de */}
                            <div>
                                <h3 className="mb-2 font-semibold">StockAgile</h3>
                                <p className="text-gray-400 text-sm">
                                    Sistema integrado de gestión de inventario y punto de venta
                                </p>
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col justify-between items-center mt-6 pt-4 border-gray-700 border-t text-sm">
                            <p className="text-gray-400">© {new Date().getFullYear()} StockAgile</p>
                            <div className="flex items-center space-x-4 mt-2 md:mt-0">
                                <FaEnvelope className="text-gray-400" />
                                <span className="text-gray-400">soporte@stockagile.com</span>
                            </div>
                        </div>
                    </div>
                </footer >
            </div >
        </>
    );
};

export default Home;