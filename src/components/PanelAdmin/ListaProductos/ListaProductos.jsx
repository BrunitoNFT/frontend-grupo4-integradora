import React, { useState, useEffect } from 'react';
import styles from './listaProductos.module.css';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedFields, setEditedFields] = useState({});

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
    setEditingProductId(id);
    setEditedFields({});
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  const handleSave = (id) => {
    const updatedProduct = {
      ...productos.find((producto) => producto.id === id),
      ...editedFields,
    };

    fetch(`http://18.118.140.140/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (response.ok) {
          const updatedProductos = productos.map((producto) =>
            producto.id === id ? updatedProduct : producto
          );
          setProductos(updatedProductos);
          setEditingProductId(null);
          console.log('Producto actualizado exitosamente');
        } else {
          console.error('Error al actualizar el producto');
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>
  {editingProductId === producto.id ? (
    <input
      type="text"
      value={editedFields.imageUrl || producto.urlImg}
      onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
    />
  ) : (
    <img src={producto.urlImg} alt={`Imagen de ${producto.name}`} />
  )}
</td>
              <td>
                {editingProductId === producto.id ? (
                  <input
                    type="text"
                    value={editedFields.name || producto.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                  />
                ) : (
                  producto.name
                )}
              </td>
              <td>
                {editingProductId === producto.id ? (
                  <textarea
                    value={editedFields.description || producto.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                  />
                ) : (
                  producto.description
                )}
              </td>
              <td>
                {editingProductId === producto.id ? (
                  <>
                    <button onClick={() => handleSave(producto.id)}>
                      <FaSave />
                    </button>
                    <button onClick={() => setEditingProductId(null)}>
                      <FaTimes />
                    </button>
                  </>
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