import React, { useState, useEffect } from 'react';
import styles from './listaProductos.module.css';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState({
    id: null,
    fields: {
      name: null,
      description: null,
      imageUrl: null,
      categoryId: null,
      brand: null, // Nuevo campo "brand"
      price: null, // Nuevo campo "price"
    },
  });

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

  const handleEdit = (producto) => {
    setEditingProduct({ id: producto.id, fields: { ...producto } });
  };

  const handleFieldChange = (fieldName, value) => {
    setEditingProduct((prevProduct) => ({
      ...prevProduct,
      fields: {
        ...prevProduct.fields,
        [fieldName]: value,
      },
    }));
  };

  const handleSave = (id) => {
    const editedProduct = {
      ...productos.find((producto) => producto.id === id),
      ...editingProduct.fields,
    };

    console.log("Producto actualizado:", editedProduct);

    fetch(`http://18.118.140.140/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProduct),
    })
      .then((response) => {
        if (response.ok) {
          const updatedProductos = productos.map((producto) =>
            producto.id === id ? editedProduct : producto
          );
          setProductos(updatedProductos);
          setEditingProduct(null);
          console.log('Producto actualizado exitosamente');
        } else {
          console.error('Error al actualizar el producto');
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
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
            <th>Marca</th> {/* Nuevo campo "brand" */}
            <th>Precio</th> {/* Nuevo campo "price" */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>
                {editingProduct && editingProduct.id === producto.id ? (
                  <input
                    type="text"
                    value={editingProduct.fields.imageUrl || producto.urlImg}
                    onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
                  />
                ) : (
                  <img src={producto.urlImg} alt={`Imagen de ${producto.name}`} />
                )}
              </td>
              <td>
                {editingProduct && editingProduct.id === producto.id ? (
                  <input
                    type="text"
                    value={editingProduct.fields.name || producto.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                  />
                ) : (
                  producto.name
                )}
              </td>
              <td>
                {editingProduct && editingProduct.id === producto.id ? (
                  <textarea
                    value={editingProduct.fields.description || producto.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                  />
                ) : (
                  producto.description
                )}
              </td>
              <td>
                {editingProduct && editingProduct.id === producto.id ? (
                  <select
                    value={editingProduct.fields.categoryId || producto.categoryId}
                    onChange={(e) => handleFieldChange('categoryId', e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  producto.category.name
                )}
              </td>
              <td>
                {editingProduct && editingProduct.id === producto.id ? (
                  <input
                    type="text"
                    value={editingProduct.fields.brand || producto.brand}
                    onChange={(e) => handleFieldChange('brand', e.target.value)}
                  />
                ) : (
                  producto.brand.name
                )}
              </td>
              <td>
                {editingProduct && editingProduct.id === producto.id ? (
                  <input
                    type="text"
                    value={editingProduct.fields.price || producto.price}
                    onChange={(e) => handleFieldChange('price', e.target.value)}
                  />
                ) : (
                  formatPrice(producto.price)
                )}
              </td>
              <td>
                {editingProduct && editingProduct.id === producto.id ? (
                  <>
                    <button onClick={() => handleSave(producto.id)}>
                      <FaSave />
                    </button>
                    <button onClick={() => setEditingProduct(null)}>
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(producto)}>
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
