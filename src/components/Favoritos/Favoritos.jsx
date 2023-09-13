import React, { useState, useEffect } from "react";
import styles from './favoritos.module.css'
import { MdFavorite } from "react-icons/md";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const storedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(storedFavoritos);
  }, []);

  const handleRemoveFavorito = (producto) => {
    // Filtra el producto seleccionado y actualiza la lista de favoritos
    const nuevosFavoritos = favoritos.filter((fav) => fav.id !== producto.id);
    setFavoritos(nuevosFavoritos);

    // Actualiza el localStorage
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  return (
    <div>
      <h2 className={styles.tituloLista}>Tus Favoritos</h2>
      <ul className={styles.cardProductos}>
        {favoritos.map((producto) => (
          <li key={producto.id}>
            <img
                className={styles.imgLista}
                src={producto.urlImg}
                alt="imagenProducto"
            />
            <div className={styles.productoNombre}>{producto.name}</div>
            <div className={styles.productoPrecio}>$ {producto.price}</div>
            <button 
                onClick={() => handleRemoveFavorito(producto)}
                className={styles.favoritosButton}
            >
                <MdFavorite color="red" size={25}/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favoritos;