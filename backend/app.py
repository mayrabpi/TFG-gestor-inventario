from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import logging

app = Flask(__name__)
CORS(app)  # Permite que el frontend (React) se comunique con el backend

# Configuración de MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Cambia la URL si usas un servidor remoto
db = client["inventory_db"]  # Nombre de la base de datos
products_collection = db["products"]  # Nombre de la colección

# Ruta para obtener todos los productos
@app.route("/products", methods=["GET"])
def get_products():
    products = list(products_collection.find({}, {"_id": 0, "id": 1, "name": 1, "units": 1, "quantity": 1, "price": 1, "lowStockThreshold": 1, "perishable": 1, "expirationDate": 1}))
    logging.debug("Productos enviados al frontend: %s", products)
    return jsonify(products)

# Ruta para añadir un producto
@app.route("/products", methods=["POST"])
def add_product():
    data = request.json
    products_collection.insert_one(data)
    return jsonify({"message": "Product added successfully"}), 201

# Configurar el registro
logging.basicConfig(level=logging.DEBUG)

# Ruta para actualizar un producto
@app.route("/products/<string:product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.json
    logging.debug(f"Recibido product_id: {product_id}")
    logging.debug(f"Datos recibidos para actualizar: {data}")

    result = products_collection.update_one({"id": product_id}, {"$set": data})

    if result.matched_count == 0:
        logging.error(f"Producto con id {product_id} no encontrado.")
        return jsonify({"error": "Product not found"}), 404

    logging.info(f"Producto con id {product_id} actualizado correctamente.")
    return jsonify({"message": "Product updated successfully"})

# Ruta para eliminar un producto
@app.route("/products/<string:product_id>", methods=["DELETE"])
def delete_product(product_id):
    products_collection.delete_one({"id": product_id})
    return jsonify({"message": "Product deleted successfully"})

@app.route("/fix-products-ids", methods=["POST"])
def fix_products_ids():
    products = products_collection.find()
    updates = []

    for product in products:
        if "id" not in product:
            new_id = str(ObjectId())  # Generar un ID único
            products_collection.update_one({"_id": product["_id"]}, {"$set": {"id": new_id}})
            updates.append({"_id": str(product["_id"]), "new_id": new_id})

    return jsonify({"message": "IDs actualizados para productos sin ID", "updates": updates})

if __name__ == "__main__":
    app.run(debug=True)