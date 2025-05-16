import React, { useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';



const ListaProductos = ({ productos, searchTerm, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Número de productos por página

  // Filtrar productos según el término de búsqueda
  const filteredProducts = productos.filter((producto) => {
    if (!producto || !producto.name) return false;
    if (!searchTerm) return true;
    return producto.name.toLowerCase().startsWith(searchTerm.toLowerCase());
  });

  // Calcular los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className="mb-4 font-bold text-2xl">Lista de Productos</h1>
      {/* Aplicar barra de desplazamiento horizontal solo en pantallas pequeñas */}
      <div className="flex sm:overflow-x-auto">
        <table className="border border-gray-300 w-full text-sm sm:text-base border-collapse table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 sm:px-4 py-2 border border-gray-300">Nombre</th>
              <th className="px-2 sm:px-4 py-2 border border-gray-300">Unidades</th>
              <th className="px-2 sm:px-4 py-2 border border-gray-300">Precio</th>
              <th className="px-2 sm:px-4 py-2 border border-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((producto) => (
              <tr key={producto.id || producto.name}>
                <td className="px-2 sm:px-4 py-2 border border-gray-300">{producto.name}</td>
                <td className="px-2 sm:px-4 py-2 border border-gray-300">{producto.units}</td>
                <td className="px-2 sm:px-4 py-2 border border-gray-300">
                  €{typeof producto.price === "number" ? producto.price.toFixed(2) : "0.00"}
                </td>
                <td className="px-2 sm:px-4 py-2 border border-gray-300">
                  <div className="flex space-x-2">

                    {/* Botón Editar con tooltip */}
                    <div className="group relative">
                      <button
                        onClick={() => onEdit(producto)}
                        className="flex items-center bg-yellow-400 px-2 py-1 rounded text-white text-xs sm:text-sm"
                      >
                        <FaEdit className="text-lg" />
                      </button>
                      <div className="bottom-full left-1/2 z-10 absolute bg-black opacity-0 group-hover:opacity-100 mb-1 px-2 py-1 rounded text-white text-xs whitespace-nowrap transition -translate-x-1/2">
                        Editar producto
                      </div>
                    </div>

                    {/* Botón Eliminar con tooltip */}
                    <div className="group relative">
                      <button
                        onClick={() => onDelete(producto.id)}
                        className="flex items-center bg-red-400 px-2 py-1 rounded text-white text-xs sm:text-sm"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                      <div className="bottom-full left-1/2 z-10 absolute bg-black opacity-0 group-hover:opacity-100 mb-1 px-2 py-1 rounded text-white text-xs whitespace-nowrap transition -translate-x-1/2">
                        Eliminar producto
                      </div>
                    </div>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? "bg-gray-400 text-white" : "bg-gray-300"
                }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ListaProductos;