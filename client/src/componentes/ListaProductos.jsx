import React, { useEffect, useState } from "react";
import { getProducts } from "../api";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => setProductos(response.data))
      .catch((err) => console.error("Error al obtener los productos:", err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Unidades</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2">Precio</th>
            <th className="border border-gray-300 px-4 py-2">Stock Bajo</th>
            <th className="border border-gray-300 px-4 py-2">Perecedero</th>
            <th className="border border-gray-300 px-4 py-2">Fecha de Caducidad</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className={producto.units <= producto.lowStockThreshold ? "bg-red-100" : ""}>
              <td className="border border-gray-300 px-4 py-2">{producto.name}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.units}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.quantity || "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2">${producto.price.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.lowStockThreshold}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.perishable ? "Sí" : "No"}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.perishable ? producto.expirationDate : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProductos;