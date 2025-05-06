// filepath: client/src/api.js
import axios from "axios";

const API = axios.create({ baseURL: "http://127.0.0.1:5000" });

export const getProducts = () => API.get("/products");
export const addProduct = (product) => API.post("/products", product);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Rutas para proveedores
export const getProviders = () => API.get("/providers");
export const addProvider = (provider) => API.post("/providers", provider);
export const updateProvider = (id, provider) => API.put(`/providers/${id}`, provider);
export const deleteProvider = (id) => API.delete(`/providers/${id}`);
export const getProductsByProvider = (providerId) => API.get(`/providers/${providerId}/products`);


export default API;