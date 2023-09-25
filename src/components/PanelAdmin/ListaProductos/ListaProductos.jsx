import React, { useState, useEffect } from 'react';
import styles from './listaProductos.module.css';
import { FaTrash, FaSave, FaTimes } from 'react-icons/fa';

let token = localStorage.getItem("jwtToken");

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://18.118.140.140/product")
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch("http://18.118.140.140/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.log("Error fetching categories:", error));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
      fetch(`http://18.118.140.140/product/${id}`, {
        method: 'DELETE',
        headers: {Authorization: `Bearer ${token}`},
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

  const formatPrice = (price) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
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
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>
                <img src={`http://18.118.140.140/s3/product-images/${producto.id}/0`} alt={`Imagen de ${producto.name}`} />
              </td>
              <td>{producto.name}</td>
              <td>{producto.description}</td>
              <td>{producto.category.name}</td>
              <td>{producto.brand.name}</td>
              <td>{formatPrice(producto.price)}</td>
              <td>
                <button onClick={() => handleDelete(producto.id)}>
                  <FaTrash />
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
