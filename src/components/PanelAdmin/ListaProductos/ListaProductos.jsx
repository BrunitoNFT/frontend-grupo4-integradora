import React, { useState, useEffect } from 'react';
import styles from './listaProductos.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListaProductos = ({  onEditProduct }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json'); // Cambia la ruta según la ubicación de data.json en tu proyecto
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener los datos de productos:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
      // Realizar llamada a la API o base de datos para eliminar el producto
      fetch('https://jsonplaceholder.typicode.com/posts/{id}', {
        method: 'DELETE', // Utilizar el método HTTP DELETE
      })
        .then(response => {
          if (response.ok) {
            // Actualizar el estado local para reflejar el producto eliminado
            const updatedProductos = productos.filter(producto => producto.id !== id);
            setProductos(updatedProductos);
          } else {
            console.error('Error al eliminar el producto');
          }
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
    }
  };
  

  const handleEdit = async (id) => {
    try {
      // Realizar la acción para obtener los datos actuales del producto
      const response = await fetch('/data.json');
      const data = await response.json();
  
      // Encontrar el producto actual en los datos basado en su ID
      const productoActual = data.find(producto => producto.id === id);
  
      // Ejecutar la función onEditProduct para pasar los datos del producto actual a la página de edición
      onEditProduct(productoActual);
    } catch (error) {
      console.error('Error al obtener los datos del producto:', error);
    }
  };
  

  return (
    <div className={styles.listaProductos}>
      <h2>Lista de Productos</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoria</th>
            <th className={styles.botones}></th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>
                <img src={producto.img} alt={`Imagen de ${producto.objeto}`} />
              </td>
              <td>{producto.objeto}</td>
              <td>{producto.precio}</td>
              <td>{producto.categoria}</td>
              <td>
                <button className={styles.button} onClick={() => handleEdit(producto.id)}>
                  <FaEdit/>
                </button>
                <button className={styles.button} onClick={() => handleDelete(producto.id)}>
                  <FaTrash/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProductos;
