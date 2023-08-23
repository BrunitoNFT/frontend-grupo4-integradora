import React, { useState, useEffect } from 'react';
import styles from './listaProductos.module.css';

const ListaProductos = ({  onEditProduct }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Realizar una llamada a la API o base de datos para obtener la lista de productos
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setProductos(data); // Establecer los datos en el estado
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
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
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Caracteristicas</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.objeto}</td>
              <td>{producto.categoria}</td>
              <td>{producto.marca}</td>
              <td>{producto.precio}</td>
              <td>
                <button onClick={() => handleEdit(producto.id)}>Editar</button>
                <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProductos;
