from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Permite que el frontend (React) se comunique con el backend

# Configuración de MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Cambia la URL si usas un servidor remoto
db = client["inventory_db"]  # Nombre de la base de datos
products_collection = db["products"]  # Nombre de la colección

# Ruta para obtener todos los productos
@app.route("/products", methods=["GET"])
def get_products():
    products = list(products_collection.find({}, {"_id": 0}))  # Excluye el campo _id
    return jsonify(products)

# Ruta para añadir un producto
@app.route("/products", methods=["POST"])
def add_product():
    data = request.json
    products_collection.insert_one(data)
    return jsonify({"message": "Product added successfully"}), 201

# Ruta para actualizar un producto
@app.route("/products/<string:product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.json
    products_collection.update_one({"id": product_id}, {"$set": data})
    return jsonify({"message": "Product updated successfully"})

# Ruta para eliminar un producto
@app.route("/products/<string:product_id>", methods=["DELETE"])
def delete_product(product_id):
    products_collection.delete_one({"id": product_id})
    return jsonify({"message": "Product deleted successfully"})

if __name__ == "__main__":
    app.run(debug=True)