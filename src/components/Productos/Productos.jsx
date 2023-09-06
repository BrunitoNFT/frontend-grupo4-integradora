import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./productos.module.css";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroCategorias, setFiltroCategorias] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [isFavorito, setIsFavorito] = useState({});

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
    const storedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(storedFavoritos);
    const favoritosMap = {};
    storedFavoritos.forEach((favorito) => {
      favoritosMap[favorito.id] = true;
    });
    setIsFavorito(favoritosMap);
  }, []);

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

  const addToFavoritos = (producto) => {
    if (!favoritos.find((fav) => fav.id === producto.id)) {
      const nuevosFavoritos = [...favoritos, producto];
      setFavoritos(nuevosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
      setIsFavorito({ ...isFavorito, [producto.id]: true });
    } else {
      const nuevosFavoritos = favoritos.filter((fav) => fav.id !== producto.id);
      setFavoritos(nuevosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
      setIsFavorito({ ...isFavorito, [producto.id]: false });
    }
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
              <Link
            className={styles.card}
            key={producto.id}
            to={"/detalle/" + producto.id}>
              <img
                className={styles.imgLista}
                src={producto.urlImg}
                alt="imagenProducto"
              />
              </Link>
              <div className={styles.productoNombre}>{producto.name}</div>
              <div className={styles.productoPrecio}>$ {producto.price}</div>
              <button
                onClick={() => addToFavoritos(producto)}
                className={styles.favoritosButton}
              >
                {isFavorito[producto.id] ? <MdFavorite color="red" size={25}/> : <MdFavoriteBorder color="red" size={25}/>}
              </button>
            </li>
  
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Productos;