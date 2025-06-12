from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import logging
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)  # Permite que el frontend (React) se comunique con el backend

# Configuración de MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Cambia la URL si usas un servidor remoto
db = client["inventory_db"]  # Nombre de la base de datos
products_collection = db["products"]  # Colección de productos
providers_collection = db["providers"]  # Colección de proveedores
ventas_collection = db["ventas"]  # Colección de ventas
devoluciones_collection = db["devoluciones"]  # Añade esta línea después de ventas_collection

# Configurar el registro
logging.basicConfig(level=logging.DEBUG)

# -------------------- Rutas para productos --------------------

# Ruta para obtener todos los productos
@app.route("/products", methods=["GET"])
def get_products():
    products = list(products_collection.find({}, {"_id": 0, "id": 1, "name": 1, "units": 1, "quantity": 1, "price": 1, "lowStockThreshold": 1, "perishable": 1, "expirationDate": 1, "providerId": 1}))
    logging.debug("Productos enviados al frontend: %s", products)
    return jsonify(products)

# Ruta para añadir un producto
@app.route("/products", methods=["POST"])
def add_product():
    data = request.json
    products_collection.insert_one(data)
    return jsonify({"message": "Producto agregado exitosamente"}), 201

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

# -------------------- Rutas para proveedores --------------------

# Ruta para obtener todos los proveedores
@app.route("/providers", methods=["GET"])
def get_providers():
    providers = list(providers_collection.find({}, {"_id": 0, "id": 1, "name": 1, "address": 1, "phone": 1, "email": 1}))
    logging.debug("Proveedores enviados al frontend: %s", providers)
    return jsonify(providers)

# Ruta para añadir un proveedor
@app.route("/providers", methods=["POST"])
def add_provider():
    data = request.json
    data["id"] = str(ObjectId())  # Generar un ID único para el proveedor
    providers_collection.insert_one(data)
    logging.info(f"Proveedor agregado: {data}")
    return jsonify({"message": "Proveedor agregado exitosamente"}), 201

# Ruta para actualizar un proveedor
@app.route("/providers/<string:provider_id>", methods=["PUT"])
def update_provider(provider_id):
    data = request.json
    logging.debug(f"Recibido provider_id: {provider_id}")
    logging.debug(f"Datos recibidos para actualizar: {data}")

    result = providers_collection.update_one({"id": provider_id}, {"$set": data})

    if result.matched_count == 0:
        logging.error(f"Proveedor con id {provider_id} no encontrado.")
        return jsonify({"error": "Provider not found"}), 404

    logging.info(f"Proveedor con id {provider_id} actualizado correctamente.")
    return jsonify({"message": "Provider updated successfully"})

# Ruta para eliminar un proveedor
@app.route("/providers/<string:provider_id>", methods=["DELETE"])
def delete_provider(provider_id):
    result = providers_collection.delete_one({"id": provider_id})

    if result.deleted_count == 0:
        logging.error(f"Proveedor con id {provider_id} no encontrado.")
        return jsonify({"error": "Provider not found"}), 404

    logging.info(f"Proveedor con id {provider_id} eliminado correctamente.")
    return jsonify({"message": "Provider deleted successfully"})

# Ruta para obtener productos por proveedor
@app.route("/providers/<string:provider_id>/products", methods=["GET"])
def get_products_by_provider(provider_id):
    products = list(products_collection.find({"providerId": provider_id}, {"_id": 0, "id": 1, "name": 1, "units": 1, "quantity": 1, "price": 1, "lowStockThreshold": 1, "perishable": 1, "expirationDate": 1}))
    logging.debug(f"Productos enviados para el proveedor {provider_id}: {products}")
    return jsonify(products)


@app.route("/api/send-order", methods=["POST"])
def send_order():
    try:
        data = request.json
        provider_email = data.get("providerEmail")
        products = data.get("products")

        # Validar datos
        if not provider_email or not products:
            logging.error("Datos incompletos: providerEmail o products faltan")
            return jsonify({"error": "Faltan datos para procesar el pedido"}), 400

        # Crear el contenido del pedido
        product_list = [{"name": p["name"], "quantity": p["quantity"]} for p in products]
        pedido = {
            "providerEmail": provider_email,
            "products": product_list,
        }

        logging.info("Pedido generado correctamente")
        return jsonify({"message": "Pedido generado correctamente", "pedido": pedido}), 200

    except Exception as e:
        logging.error(f"Error inesperado: {e}")
        return jsonify({"error": "Error inesperado en el servidor"}), 500

# -------------------- Ruta para corregir IDs de productos --------------------

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

# -------------------- Ruta para registrar una venta --------------------
@app.route("/ventas", methods=["POST"])
def guardar_venta():
    data = request.json
    data["fecha"]= data.get("fecha") or None
    ventas_collection.insert_one(data)
    return jsonify({"message": "Venta registrada exitosamente"}), 201

# Ruta para registrar una devolución
@app.route("/devoluciones", methods=["POST"])
def registrar_devolucion():
    data = request.json
    # Espera: id, nombre, unidades, importe, motivo, fecha
    devolucion = {
        "producto_id": data.get("producto_id"),
        "producto_nombre": data.get("producto_nombre"),
        "unidades": data.get("unidades"),
        "importe_total": data.get("importe_total"),
        "motivo": data.get("motivo", "desconocido"),
        "fecha": data.get("fecha")
    }
    devoluciones_collection.insert_one(devolucion)
    return jsonify({"message": "Devolución registrada exitosamente"}), 201

if __name__ == "__main__":
    app.run(debug=True)