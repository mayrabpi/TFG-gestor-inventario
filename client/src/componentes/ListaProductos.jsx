import React, { useState } from "react";

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
      <div className="sm:overflow-x-auto">
        <table className="border border-gray-300 w-full text-sm sm:text-base border-collapse table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 sm:px-4 py-2 border border-gray-300">Nombre</th>
              <th className="px-2 sm:px-4 py-2 border border-gray-300">Unidades</th>
              <th className="px-2 sm:px-4 py-2 border border-gray-300">Cantidad</th>
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
                  {producto.quantity || "N/A"}
                </td>
                <td className="px-2 sm:px-4 py-2 border border-gray-300">
                  €{typeof producto.price === "number" ? producto.price.toFixed(2) : "0.00"}
                </td>
                <td className="px-2 sm:px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => onEdit(producto)}
                    className="bg-yellow-500 mr-2 px-2 py-1 rounded text-white text-xs sm:text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(producto.id)}
                    className="bg-red-500 px-2 py-1 rounded text-white text-xs sm:text-sm"
                  >
                    Eliminar
                  </button>
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
              className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
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