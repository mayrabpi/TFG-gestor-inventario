// filepath: client/src/api.ts
import axios from "axios";

const API = axios.create({ baseURL: "http://127.0.0.1:5000" });

export const getProducts = () => API.get("/products");
export const addProduct = (product: { id: string; name: string; stock: number }) =>
    API.post("/products", product);
export const updateProduct = (id: string, product: { name: string; stock: number }) =>
    API.put(`/products/${id}`, product);
export const deleteProduct = (id: string) => API.delete(`/products/${id}`);