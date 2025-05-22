import React, { useState, useEffect } from "react";
import { addProduct, getProviders } from "../api";

const AddProductForm = ({ productos = [], onClose, onProductAdded }) => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    units: "",
    price: "",
    lowStockThreshold: "",
    perishable: false,
    expirationDate: "",
    providerId: "",
  });

  const [error, setError] = useState("");
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    getProviders()
      .then((response) => setProviders(response.data))
      .catch((err) => console.error("Error al obtener los proveedores:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productos.some((producto) => producto.id === product.id)) {
      setError("El código de barras ya está registrado para otro producto.");
      return;
    }

    const updatedProduct = {
      ...product,
      price: parseFloat(product.price) || 0,
      units: parseFloat(product.units) || 0,
      lowStockThreshold: parseInt(product.lowStockThreshold) || 0,
    };

    addProduct(updatedProduct)
      .then(() => {
        alert("Producto añadido correctamente");
        setProduct({
          id: "",
          name: "",
          units: "",
          price: "",
          lowStockThreshold: "",
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
        <label className="block mb-2">Código de barras</label>
        <input
          type="text"
          value={product.id}
          onChange={(e) => setProduct({ ...product, id: e.target.value })}
          className="p-2 border w-full"
          placeholder="Escanea o introduce el código de barras"
          required
        />

        <label className="block mt-4 mb-2">Nombre del Producto</label>
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
          type="text"
          inputMode="decimal"
          pattern="^\d*\.?\d*$"
          value={product.units}
          onChange={(e) => setProduct({ ...product, units: e.target.value })}
          className="p-2 border w-full"
          placeholder="Ej. 5.5"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Precio</label>
        <input
          type="text"
          inputMode="decimal"
          pattern="^\d*\.?\d*$"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="p-2 border w-full"
          placeholder="Ej. 2.30"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Umbral de Stock Bajo</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="^\d+$"
          value={product.lowStockThreshold}
          onChange={(e) =>
            setProduct({ ...product, lowStockThreshold: e.target.value })
          }
          className="p-2 border w-full"
          placeholder="Ej. 10"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">¿Es Perecedero?</label>
        <input
          type="checkbox"
          checked={product.perishable}
          onChange={(e) =>
            setProduct({ ...product, perishable: e.target.checked })
          }
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
            onChange={(e) =>
              setProduct({ ...product, expirationDate: e.target.value })
            }
            className="p-2 border w-full"
            required
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-2">Proveedor (opcional)</label>
        <select
          value={product.providerId}
          onChange={(e) =>
            setProduct({ ...product, providerId: e.target.value })
          }
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
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Añadir Producto
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
