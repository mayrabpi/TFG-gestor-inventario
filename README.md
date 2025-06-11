# StockAgile - Sistema de Gestión de Inventario y Punto de Venta

StockAgile es una aplicación web para la gestión de inventario y ventas, diseñada para pequeñas y medianas empresas. Permite controlar productos, proveedores, ventas, alertas de stock, caducidad y mucho más, todo desde una interfaz moderna y fácil de usar.

---

## Características principales

- **Gestión de productos:** Añade, edita, elimina y repone productos. Controla el stock y los umbrales de alerta.
- **Control de caducidad:** Visualiza productos próximos a caducar o caducados y gestiona su destrucción o devolución.
- **Gestión de proveedores:** Registra proveedores, edítalos y visualiza los productos asociados.
- **Punto de venta:** Realiza ventas rápidas, genera tickets y gestiona devoluciones.
- **Alertas de stock:** Recibe alertas automáticas cuando un producto está por debajo del umbral definido.
- **Inventario físico:** Realiza conteos físicos y compara con el stock registrado.
- **Manual de usuario integrado:** Accede a una guía de uso desde la propia aplicación.

---

## Tecnologías utilizadas

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Flask (Python), MongoDB
- **Otros:** Axios, React Router, React Icons

---

## Instalación

### Requisitos previos

- Node.js y npm
- Python 3.x
- MongoDB

### Backend

1. Ve a la carpeta `backend`:
   ```sh
   cd backend
   ```
2. Crea un entorno virtual y actívalo:
   ```sh
   python -m venv venv
   source venv/bin/activate
   ```
3. Instala las dependencias:
   ```sh
   pip install -r requirements.txt
   ```
4. Configura la base de datos en `config.py`.
5. Inicia el servidor:
   ```sh
   flask run
   ```

### Frontend

1. Ve a la carpeta `frontend`:
   ```sh
   cd frontend
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia la aplicación:
   ```sh
   npm run dev
   ```

---

## Uso

Accede a la aplicación desde tu navegador en `http://localhost:3000`. Crea una cuenta de usuario y sigue el manual de usuario integrado para familiarizarte con todas las funcionalidades.

---

## Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadida nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Crea un Pull Request.

---

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
<!-- O bien, si quieres reservar derechos:
Este proyecto es propiedad de [tu nombre] y todos los derechos están reservados. Contacta para usos comerciales.
-->

---

## Contacto

Para más información, sugerencias o reportar problemas, por favor contacta al desarrollador:

- **Desarrollador:** [jeilmivi@gmail.com](mailto:jeilmivi@gmail.com)

---

¡Gracias por usar StockAgile! Tu solución integral para la gestión de inventario y ventas.