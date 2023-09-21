import React, { useState, useEffect, useRef } from 'react';
import styles from './administrarCaracteristicas.module.css';

function AdministrarCaracteristicas() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const inputRef = useRef(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetch("http://18.118.140.140/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos:', error);
      });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedFeatures(product.features.map((feature) => feature.name));
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleFeature = (featureName) => {
    if (selectedProduct) {
      const updatedFeatures = selectedFeatures.includes(featureName)
        ? selectedFeatures.filter((name) => name !== featureName)
        : [...selectedFeatures, featureName];

      setSelectedFeatures(updatedFeatures);

      const updatedProduct = {
        ...selectedProduct,
        features: updatedFeatures.map((featureName) => ({
          name: featureName,
        })),
      };

      updateProductOnServer(updatedProduct);
    }
  };

  const updateProductOnServer = (updatedProduct) => {
    fetch(`http://18.118.140.140/product/${updatedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then(() => {
        const updatedProducts = products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        setProducts(updatedProducts);
        setSelectedProduct(updatedProduct);
      })
      .catch((error) => {
        console.error('Error al actualizar el producto:', error);
      });
  };

  const allFeatures = Array.from(
    new Set(products.flatMap((product) => product.features.map((feature) => feature.name)))
  );

  const handleSort = (field) => {
    // Cambiar el campo de orden y el orden actual
    setOrderBy(field);
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  // Ordenar los productos según el campo de orden y el orden actual
  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
  
    if (order === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  return (
    <div>
      <h2 className={styles.heading}>Lista de Productos</h2>
      <div className={styles.card}>
        <table className={styles.listaProductos}>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>ID</th>
              <th>Imagen</th>
              <th onClick={() => handleSort('name')}>Nombre</th>
              <th>Características</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id} onClick={() => handleProductClick(product)}>
                <td>{product.id}</td>
                <td>
                  <img src={product.imageURL} alt={product.name} className={styles.productImage} />
                </td>
                <td>{product.name}</td>
                <td>
                  {product.features.map((feature, index) => (
                    <span key={index}>{feature.name}, </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <div className={styles.featureCard} ref={inputRef}>
          <h3 className={styles.subheading}>Características de {selectedProduct.name}</h3>
          <form>
            {allFeatures.map((featureName, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(featureName)}
                    onChange={() => handleToggleFeature(featureName)}
                  />
                  {featureName}
                </label>
              </div>
            ))}
          </form>
        </div>
      )}
    </div>
  );
}

export default AdministrarCaracteristicas;
