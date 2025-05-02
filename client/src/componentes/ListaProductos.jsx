import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
import EditProductForm from "./EditProductForm";

const ListaProductos = ({ searchTerm }) => {
  const [productos, setProductos] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    getProducts()
      .then((response) => setProductos(response.data))
      .catch((err) => console.error("Error al obtener los productos:", err));
  }, []);

  const filteredProducts = productos.filter((producto) => {
    if (!producto || !producto.name) return false; // Verificar que el producto y su nombre existen
    if (!searchTerm) return true; // Mostrar todos los productos si no hay término de búsqueda
    return producto.name.toLowerCase().startsWith(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1 className="mb-4 font-bold text-2xl">Lista de Productos</h1>
      <div className="overflow-x-auto">
        <table className="border border-gray-300 w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">Nombre</th>
              <th className="px-4 py-2 border border-gray-300">Unidades</th>
              <th className="px-4 py-2 border border-gray-300">Cantidad</th>
              <th className="px-4 py-2 border border-gray-300">Precio</th>
              <th className="px-4 py-2 border border-gray-300">Stock Bajo</th>
              <th className="px-4 py-2 border border-gray-300">Perecedero</th>
              <th className="px-4 py-2 border border-gray-300">Fecha de Caducidad</th>
              <th className="px-4 py-2 border border-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((producto) => (
              <tr
                key={producto.id || producto.name} // Asegurar una clave única
                className={producto.units <= producto.lowStockThreshold ? "bg-red-100" : ""}
              >
                <td className="px-4 py-2 border border-gray-300">{producto.name}</td>
                <td className="px-4 py-2 border border-gray-300">{producto.units}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {producto.quantity || "N/A"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  ${producto.price ? producto.price.toFixed(2) : "0.00"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {producto.lowStockThreshold}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {producto.perishable ? "Sí" : "No"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {producto.perishable ? producto.expirationDate : "N/A"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => setEditingProduct(producto)}
                    className="bg-blue-500 px-2 py-1 rounded text-white"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingProduct && (
        <div className="mt-4">
          <EditProductForm
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ListaProductos;