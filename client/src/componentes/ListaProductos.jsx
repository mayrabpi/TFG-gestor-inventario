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
      <h1 className="text-2xl font-bold">Lista de Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.name} - {producto.stock} unidades
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;