// filepath: client/src/App.tsx
import React from "react";
import ListaProductos from "./componentes/ListaProductos";
import AddProductForm from "./componentes/AddProductForm";

const App: React.FC = () => {
  return (
    <div className="p-4">
      <AddProductForm />
      <ListaProductos />
    </div>
  );
};

export default App;