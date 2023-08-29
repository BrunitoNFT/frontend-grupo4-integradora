import React, { useState, useEffect } from 'react';
import styles from './listaProductos.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListaProductos = ({  onEditProduct }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://18.118.140.140/product")
      .then((response) => response.json()) 
      .then((data) => {
        setProductos(data); 
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
      fetch(`http://18.118.140.140/product/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            const updatedProductos = productos.filter(producto => producto.id !== id);
            setProductos(updatedProductos);
            console.log('Producto eliminado exitosamente');
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
        const response = await fetch(`http://18.118.140.140/product/${id}`);
        const data = await response.json();
  
        const productoActual = data.find(producto => producto.id === id);
  
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
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>
                <img src={producto.urlImg} alt={`Imagen de ${producto.name}`} />
              </td>
              <td>{producto.name}</td>
              <td>{producto.description}</td>
              <td>{producto.stock}</td>
              <td>
                <button onClick={() => handleEdit(producto.id)}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(producto.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListaProductos;