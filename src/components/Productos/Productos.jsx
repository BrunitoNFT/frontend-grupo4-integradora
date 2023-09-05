import React, { useState, useEffect } from "react";
import styles from "./productos.module.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroCategorias, setFiltroCategorias] = useState([]);

  async function fetchProductos() {
    const response = await fetch("http://18.118.140.140/product");
    const jsonData = await response.json();
    setProductos(jsonData);
  }

  async function fetchCategorias() {
    const response = await fetch("http://18.118.140.140/categories");
    const jsonData = await response.json();
    setCategorias(jsonData);
  }

  useEffect(() => {
    fetchProductos()
    fetchCategorias()
  }, []);

  console.log("CATEGORIAS", categorias);
  console.log("PRODUCTOS", productos);

  const handleCategoriaChange = (e) => {
    const selectedOptions = e.target.selectedOptions;
    const selectedCategories = Array.from(selectedOptions).map(
      (option) => option.value
    );
    console.log(selectedCategories);
    setFiltroCategorias(selectedCategories);
    console.log('catgoria seleccionada',selectedCategories);
  };

    const productosFiltrados = filtroCategorias.length > 0 && filtroCategorias[0] != '*'
  ? productos.filter((producto) => filtroCategorias.indexOf(producto.category.id.toString()) != -1)
  : productos;

  console.log('productos filtardos', productosFiltrados);

  return (
    <div className={styles.bodyProdutos}>
      <h2 className={styles.tituloLista}>Productos</h2>

      <div className={styles.filtroCategoria}>
        <label htmlFor="categoria">Filtrar por Categoría:</label>
        <select
          id="categoria"
          multiple
          value={filtroCategorias}
          onChange={handleCategoriaChange}
        >
          <option value="*">Todas</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.listaProductosContainer}>
        <ul className={styles.cardProductos}>
          {productosFiltrados.map((producto) => (
            <li key={producto.id}>
              <img
                className={styles.imgLista}
                src={producto.urlImg}
                alt="imagenProducto"
              />
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


