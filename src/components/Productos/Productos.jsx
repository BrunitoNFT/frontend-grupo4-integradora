import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./productos.module.css";
import { MdFavoriteBorder, MdFavorite, MdKeyboardArrowDown } from "react-icons/md";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsShareFill,
} from "react-icons/bs";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroCategorias, setFiltroCategorias] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [isFavorito, setIsFavorito] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    console.log("handleCategoriaChange se está ejecutando");
    const checkbox = e.target;
    console.log('checkboxxxx', checkbox.checked);
    
    if (checkbox.checked) {
      setFiltroCategorias([...filtroCategorias, checkbox.value]);
    } else {
      const nuevosFiltros = filtroCategorias.filter((categoria) => categoria !== checkbox.value);
      setFiltroCategorias(nuevosFiltros);
    }
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

  const productosFiltrados =
    filtroCategorias.length > 0 && filtroCategorias[0] != "*"
      ? productos.filter(
          (producto) =>
            filtroCategorias.indexOf(producto.category.id.toString()) != -1
        )
      : productos;

  console.log("productos filtardos", productosFiltrados);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    console.log("drooooopppppp", dropdownOpen);
  };

  return (
    <div className={styles.bodyProdutos}>
      <h2 className={styles.tituloLista}>Productos</h2>

      <div className={styles.filtroCategoria}>
        <div className={styles.selectWrapper}>
          <div className={styles.selectedItems} onClick={toggleDropdown}>
            <span>Categorias <MdKeyboardArrowDown color="whitesmoke"/></span>
            <i className={`fas fa-caret-${dropdownOpen ? "up" : "down"}`}></i>
          </div>
          {dropdownOpen && (
            <div className={styles.dropdown}>
              {categorias.map((categoria) => (
                <label key={categoria.id} className={styles.dropdownItem}>
                  <input
                    type="checkbox"
                    value={categoria.id}
                    checked={filtroCategorias.includes(categoria.id.toString())}
                    onChange={handleCategoriaChange}
                  />
                  {categoria.name}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.listaProductosContainer}>
        <ul className={styles.cardProductos}>
          {productosFiltrados.map((producto) => (
            <li key={producto.id}>
              <Link
                className={styles.card}
                key={producto.id}
                to={"/detalle/" + producto.id}
              >
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
                {isFavorito[producto.id] ? (
                  <MdFavorite color="#4F709C" size={25} />
                ) : (
                  <MdFavoriteBorder color="#4F709C" size={25} />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Productos;