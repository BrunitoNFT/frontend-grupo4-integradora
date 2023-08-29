import React, { useState, useEffect } from 'react';
import styles from './listaProductos.module.css';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const ListaProductos = ({ onEditProduct }) => {
  const [productos, setProductos] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
  });

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

  const handleEdit = (id) => {
    const productToEdit = productos.find(producto => producto.id === id);
    if (productToEdit) {
      setEditingProductId(id);
      setEditedProduct(productToEdit);
    }
  };

  const handleSaveEdit = () => {
    const updatedFields = {
      id: editedProduct.id,
      name: editedProduct.name,
      description: editedProduct.description,
      price: editedProduct.price,
      stock: editedProduct.stock,
    };
  
    fetch(`http://18.118.140.140/product/${editedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    })
      .then(response => response.json())
      .then(updatedProduct => {
        const updatedProductos = productos.map(producto =>
          producto.id === updatedProduct.id ? updatedProduct : producto
        );
        setProductos(updatedProductos);
        setEditingProductId(null);
        setEditedProduct({
          id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
        });
        console.log('Producto actualizado exitosamente');
      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
      });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditedProduct({
      id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
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
            {/* ... other headers */}
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
              <td>
                {editingProductId === producto.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  producto.name
                )}
              </td>
              <td>
                {editingProductId === producto.id ? (
                  <input
                    type="text"
                    name="description"
                    value={editedProduct.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  producto.description
                )}
              </td>
              {/* ... other fields */}
              <td>
                {editingProductId === producto.id ? (
                  <div>
                    <button onClick={handleSaveEdit}>
                      <FaSave />
                    </button>
                    <button onClick={handleCancelEdit}>
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEdit(producto.id)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(producto.id)}>
                      <FaTrash />
                    </button>
                  </div>
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