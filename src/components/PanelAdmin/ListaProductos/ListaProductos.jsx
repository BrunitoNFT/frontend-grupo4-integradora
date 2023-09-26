import React, { useState, useEffect } from 'react';
import styles from './listaProductos.module.css';
import { FaTrash, FaSave, FaEdit } from 'react-icons/fa';

let token = sessionStorage.getItem("jwtToken");

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

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
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
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

  const handleEdit = (id) => {
    setEditingProduct(id);
  };

  const handleSave = (id, updatedProductData) => {
    fetch(`http://18.118.140.140/product/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProductData),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('No se pudo actualizar el producto');
        }
      })
      .then(data => {
        const updatedProducts = productos.map(producto => {
          if (producto.id === id) {
            return data;
          } else {
            return producto;
          }
        });
        setProductos(updatedProducts);
        setEditingProduct(null);
      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
      });
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
              <td>
                {editingProduct === producto.id ? (
                  <input
                    type="text"
                    value={producto.name}
                    onChange={(e) => {
                      const updatedProduct = { ...producto, name: e.target.value };
                      handleSave(producto.id, updatedProduct);
                    }}
                  />
                ) : (
                  producto.name
                )}
              </td>
              <td>{producto.description}</td>
              <td>{producto.category.name}</td>
              <td>{producto.brand.name}</td>
              <td>{formatPrice(producto.price)}</td>
              <td>
                {editingProduct === producto.id ? (
                  <button onClick={() => handleSave(producto.id, producto)}>
                    <FaSave />
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(producto.id)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(producto.id)}>
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProductos;
