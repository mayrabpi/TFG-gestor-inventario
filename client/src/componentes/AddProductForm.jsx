import React, { useState, useEffect } from "react";
import { addProduct, getProviders } from "../api"; // Asegúrate de tener una función para obtener proveedores
import { v4 as uuidv4 } from "uuid";

const AddProductForm = ({ productos = [], onClose, onProductAdded }) => {
  const [product, setProduct] = useState({
    name: "",
    units: 0,
    quantity: 0,
    price: 0,
    lowStockThreshold: 0,
    perishable: false,
    expirationDate: "",
    providerId: "", // Nuevo campo para el proveedor
  });
  const [error, setError] = useState("");
  const [providers, setProviders] = useState([]); // Estado para almacenar los proveedores

  useEffect(() => {
    // Cargar la lista de proveedores al montar el componente
    getProviders()
      .then((response) => setProviders(response.data))
      .catch((err) => console.error("Error al obtener los proveedores:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar si el producto ya existe
    if (productos.some((producto) => producto.name.toLowerCase() === product.name.toLowerCase())) {
      setError("El producto ya existe en el inventario.");
      return;
    }

    const updatedProduct = {
      ...product,
      id: uuidv4(),
      price: parseFloat(product.price),
      units: parseFloat(product.units),
    };

    addProduct(updatedProduct)
      .then(() => {
        alert("Producto añadido correctamente");
        setProduct({
          name: "",
          units: 0,
          quantity: 0,
          price: 0,
          lowStockThreshold: 0,
          perishable: false,
          expirationDate: "",
          providerId: "",
        });
        setError("");
        onClose();
        if (onProductAdded) onProductAdded();
      })
      .catch((err) => console.error("Error al añadir el producto:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="mb-4 font-bold text-xl">Añadir Producto</h2>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      <div className="mb-4">
        <label className="block mb-2">Nombre del Producto</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="p-2 border w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Unidades</label>
        <input
          type="number"
          step="0.01"
          value={product.units}
          onChange={(e) => setProduct({ ...product, units: e.target.value })}
          className="p-2 border w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Cantidad (en kilos)</label>
        <input
          type="number"
          step="0.01"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: parseFloat(e.target.value) || 0 })}
          className="p-2 border w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Precio</label>
        <input
          type="number"
          step="0.01"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="p-2 border w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Umbral de Stock Bajo</label>
        <input
          type="number"
          value={product.lowStockThreshold}
          onChange={(e) => setProduct({ ...product, lowStockThreshold: parseInt(e.target.value) || 0 })}
          className="p-2 border w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">¿Es Perecedero?</label>
        <input
          type="checkbox"
          checked={product.perishable}
          onChange={(e) => setProduct({ ...product, perishable: e.target.checked })}
          className="mr-2"
        />
        <span>Sí</span>
      </div>
      {product.perishable && (
        <div className="mb-4">
          <label className="block mb-2">Fecha de Caducidad</label>
          <input
            type="date"
            value={product.expirationDate}
            onChange={(e) => setProduct({ ...product, expirationDate: e.target.value })}
            className="p-2 border w-full"
            required
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-2">Proveedor (opcional)</label>
        <select
          value={product.providerId}
          onChange={(e) => setProduct({ ...product, providerId: e.target.value })}
          className="p-2 border w-full"
        >
          <option value="">Seleccionar proveedor</option>
          {providers.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 px-4 py-2 rounded text-white"
        >
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
          Añadir Producto
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;