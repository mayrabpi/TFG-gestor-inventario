import React, { useState } from "react";
import { FaBook, FaAngleDown, FaAngleUp } from "react-icons/fa";

const ManualUsuario = () => {
    const [seccionActiva, setSeccionActiva] = useState("");

    const toggleSeccion = (seccion) => {
        setSeccionActiva(seccionActiva === seccion ? "" : seccion);
    };

    // Componente para una sección colapsable del manual
    const SeccionManual = ({ titulo, id, children }) => {
        const esActiva = seccionActiva === id;

        return (
            <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                <button
                    onClick={() => toggleSeccion(id)}
                    className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 focus:outline-none w-full font-medium text-left"
                >
                    <span>{titulo}</span>
                    {esActiva ? <FaAngleUp /> : <FaAngleDown />}
                </button>

                {esActiva && (
                    <div className="bg-white p-4">
                        {children}
                    </div>
                )}
            </div>
        );
    };

    // Componente para una imagen con leyenda
    const ImagenManual = ({ src, alt, caption }) => (
        <figure className="my-4">
            <img
                src={src}
                alt={alt}
                className="shadow-sm border border-gray-300 rounded-lg max-w-full h-auto"
            />
            {caption && <figcaption className="mt-2 text-gray-600 text-sm text-center">{caption}</figcaption>}
        </figure>
    );

    return (
        <div className="mx-auto p-4 max-w-4xl">
            <h1 className="flex gap-2 mb-6 font-bold text-gray-800 text-3xl">
                <FaBook className="mt-1" /> Manual de Usuario
            </h1>

            <p className="mb-6 text-gray-600">
                Bienvenido al manual de usuario de nuestro Sistema de Gestión de Inventario.
                En este manual encontrarás información detallada sobre cómo usar cada sección
                y funcionalidad del sistema.
            </p>

            {/* Sección de Inicio */}
            <SeccionManual titulo="Introducción al Sistema" id="introduccion">
                <p className="mb-4">
                    El Sistema de Gestión de Inventario es una herramienta diseñada para ayudarte a controlar
                    y administrar eficientemente tu inventario de productos. Te permite:
                </p>
                <ul className="space-y-1 mb-4 ml-6 list-disc">
                    <li>Gestionar productos y proveedores</li>
                    <li>Monitorear el stock de productos</li>
                    <li>Recibir alertas de bajo stock</li>
                    <li>Controlar productos caducados o próximos a caducar</li>
                    <li>Registrar ventas y generar informes</li>
                </ul>
            </SeccionManual>

            {/* Sección de Gestión de Productos */}
            <SeccionManual titulo="Gestión de Productos" id="productos">
                <h3 className="mb-2 font-bold text-lg">¿Cómo añadir un producto?</h3>
                <ol className="space-y-1 mb-4 ml-6 list-decimal">
                    <li>Ve a la sección "Gestión de Productos"</li>
                    <li>Haz clic en el botón "Añadir Producto"</li>
                    <li>Rellena el formulario con los datos del producto</li>
                    <li>Haz clic en "Guardar"</li>
                </ol>

                <h3 className="mt-4 mb-2 font-bold text-lg">¿Cómo editar un producto?</h3>
                <ol className="space-y-1 mb-4 ml-6 list-decimal">
                    <li>En la lista de productos, busca el producto que deseas editar</li>
                    <li>Haz clic en el icono de edición (lápiz amarillo)</li>
                    <li>Modifica los datos necesarios</li>
                    <li>Haz clic en "Guardar Cambios"</li>
                </ol>

                <h3 className="mt-4 mb-2 font-bold text-lg">Búsqueda de productos</h3>
                <p className="mb-4">
                    Para buscar un producto, utiliza el campo de búsqueda ubicado en la parte superior de la lista.
                    Puedes buscar por:
                </p>
                <ul className="space-y-1 mb-4 ml-6 list-disc">
                    <li>Nombre del producto (búsqueda parcial)</li>
                    <li>Código de barras exacto (búsqueda exacta)</li>
                </ul>
            </SeccionManual>

            {/* Sección de Proveedores */}
            <SeccionManual titulo="Gestión de Proveedores" id="proveedores">
                <h3 className="mb-2 font-bold text-lg">¿Cómo registrar un nuevo proveedor?</h3>
                <ol className="space-y-1 mb-4 ml-6 list-decimal">
                    <li>Ve a la sección "Gestión de Proveedores"</li>
                    <li>Haz clic en el botón "Registrar Proveedor"</li>
                    <li>Completa el formulario con la información del proveedor</li>
                    <li>Haz clic en "Guardar"</li>
                </ol>

                <h3 className="mt-4 mb-2 font-bold text-lg">Ver productos de un proveedor</h3>
                <p className="mb-2">
                    Para ver todos los productos asociados a un proveedor específico:
                </p>
                <ol className="space-y-1 mb-4 ml-6 list-decimal">
                    <li>En la tabla de proveedores, encuentra el proveedor deseado</li>
                    <li>Haz clic en el icono de ojo (ver productos)</li>
                    <li>Se abrirá un modal mostrando todos los productos de ese proveedor</li>
                </ol>
            </SeccionManual>

            {/* Sección de Control de Caducidad */}
            <SeccionManual titulo="Control de Caducidad" id="caducidad">
                <p className="mb-4">
                    La sección de Control de Caducidad te permite ver y gestionar productos perecederos
                    que están próximos a caducar o ya han caducado.
                </p>

                <h3 className="mb-2 font-bold text-lg">¿Cómo ver productos próximos a caducar?</h3>
                <ol className="space-y-1 mb-4 ml-6 list-decimal">
                    <li>Ve a la sección "Control de Caducidad"</li>
                    <li>Selecciona la pestaña "Próximos a caducar"</li>
                    <li>Verás una lista de productos que caducarán en los próximos días</li>
                </ol>

                <h3 className="mt-4 mb-2 font-bold text-lg">Gestión de productos caducados</h3>
                <p className="mb-2">Para gestionar productos que ya han caducado:</p>
                <ol className="space-y-1 mb-4 ml-6 list-decimal">
                    <li>Selecciona la pestaña "Caducados"</li>
                    <li>Para cada producto caducado, puedes:
                        <ul className="mt-1 ml-6 list-disc">
                            <li>Modificar la fecha de caducidad</li>
                            <li>Añadir a devoluciones para eliminar del inventario</li>
                        </ul>
                    </li>
                </ol>
            </SeccionManual>

            {/* Sección de Alertas */}
            <SeccionManual titulo="Sistema de Alertas" id="alertas">
                <p className="mb-4">
                    El sistema de alertas te informa sobre productos que están por debajo
                    del umbral de stock definido.
                </p>

                <h3 className="mb-2 font-bold text-lg">¿Cómo funcionan las alertas?</h3>
                <p className="mb-2">
                    Cada producto puede tener definido un "Umbral de stock bajo". Cuando la cantidad
                    disponible es menor o igual a este umbral, el sistema:
                </p>
                <ul className="space-y-1 mb-4 ml-6 list-disc">
                    <li>Muestra el producto en la sección de "Alertas de Stock"</li>
                    <li>Añade un indicador visual de bajo stock en las listas de productos</li>
                </ul>

                <h3 className="mt-4 mb-2 font-bold text-lg">¿Cómo ver todas las alertas?</h3>
                <ol className="space-y-1 mb-4 ml-6 list-decimal">
                    <li>Haz clic en "Alertas" en el menú principal</li>
                    <li>Verás una lista de todos los productos con bajo stock</li>
                    <li>Puedes ver detalles de cada producto haciendo clic en "Ver detalles"</li>
                </ol>
            </SeccionManual>

            {/* Sección de Devoluciones */}
            <SeccionManual titulo="Registro de Devoluciones y Destrucciones" id="devoluciones">
                <p className="mb-4">
                    Esta funcionalidad te permite registrar cuando debes destruir o devolver productos
                    (por caducidad, daños, etc.).
                </p>

                <h3 className="mb-2 font-bold text-lg">¿Cómo registrar una destrucción?</h3>
                <ol className="space-y-1 mb-4 ml-6 list-decimal">
                    <li>Ve a la sección de productos caducados</li>
                    <li>Selecciona un producto y haz clic en "Añadir a Devolución"</li>
                    <li>Ingresa la cantidad a destruir</li>
                    <li>Confirma la operación</li>
                </ol>
            </SeccionManual>

            {/* Sección de Contacto y Ayuda */}
            <SeccionManual titulo="Contacto y Ayuda" id="ayuda">
                <p className="mb-4">
                    Si necesitas ayuda adicional con el sistema, puedes contactar al
                    equipo de soporte técnico:
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="mb-2"><strong>Email de soporte:</strong> soporte@inventario.com</p>
                    <p><strong>Teléfono:</strong> +34 912 345 678</p>
                </div>
            </SeccionManual>
        </div>
    );
};

export default ManualUsuario;