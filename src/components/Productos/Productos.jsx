import React, { useState, useEffect } from 'react';
import styles from './productos.module.css';

const categorias = ['Electrónica', 'Ropa', 'Hogar', 'Deportes'];

const Productos = ({ setProductosFiltrados }) => {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [productos, setProductos] = useState([])
  
  async function fetchProductos() {
    const response = await fetch('http://18.118.140.140/product')
    const jsonData = await response.json()
    setProductos(jsonData)
  }

  useEffect(() => {
    fetchProductos()
  }, [])

  /*const manejarCambioCategoria = (categoria) => {
    if (categoriasSeleccionadas.includes(categoria)) {
      setCategoriasSeleccionadas(categoriasSeleccionadas.filter(cat => cat !== categoria));
    } else {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
    }
  };
  const filtrarProductos = () => {
    if (categoriasSeleccionadas.length === 0) {
      setProductosFiltrados(productos);
    } else {
      const filtrados = productos.filter(producto => categoriasSeleccionadas.includes(producto.categoria));
      setProductosFiltrados(filtrados);
    }
  };*/
  
  console.log("PRODUCTOS", productos);

  return (
      
    <div className={styles.bodyProdutos}>
    <h2 className={styles.tituloLista}>Productos</h2>
      <div className={styles.listaProductosContainer}>
          <ul className={styles.cardProductos}>
            {productos.map((producto) => (
              <li key={producto.id}>
                <img className={styles.imgLista} src={producto.urlImg} alt="imagenProducto" />
                <div className={styles.productoNombre}>{producto.name}</div>
                <div className={styles.productoPrecio}>$ {producto.price}</div>
              </li>
            ))}
          </ul>
      </div>
    </div>
      
    
  );
};

export default Productos;

/*<div className={styles.filtroProductos}>

       <h2>Filtrar por Categoría</h2>
      <div className={styles.listaCategorias}>
        {categorias.map(categoria => (
          <label key={categoria} className={styles.etiquetaCategoria}>
            <input
              type="checkbox"
              checked={categoriasSeleccionadas.includes(categoria)}
              onChange={() => manejarCambioCategoria(categoria)}
            />
            {categoria}
          </label>
        ))}
      </div>
      <button className={styles.buttonFiltro} onClick={filtrarProductos}>Aplicar Filtros</button>
      <button className={styles.buttonFiltro} onClick={() => setCategoriasSeleccionadas([])}>Limpiar Filtros</button>*/
