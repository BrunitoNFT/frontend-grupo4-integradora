import React, { useEffect, useState } from 'react';
import styles from './editarCaracteristicas.module.css';

function EditarCaracteristicas() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Realizar una solicitud Fetch a tu API o servidor
    fetch('http://18.118.140.140/product')
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado con los productos recibidos
        setProductos(data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos:', error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Editar Características de Productos</h1>
      <div id="productos-lista">
        {productos.map((producto) => (
          <div className={styles.producto} key={producto.id}>
            <p>ID: {producto.id}</p>
            <p>Nombre: {producto.name}</p>
            <p>Características: {producto.features.id(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditarCaracteristicas;
