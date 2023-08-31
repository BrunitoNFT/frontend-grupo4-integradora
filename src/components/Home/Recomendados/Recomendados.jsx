import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../Context/DataContext";
import styles from "./recomendados.module.css";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Recomendados = () => {
  const { data, cart, setCart } = useContext(DataContext);
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [randomizedData, setRandomizedData] = useState([]);

  useEffect(() => {
    // Mezcla el orden de los productos aleatoriamente
    const shuffledData = [...data].sort(() => Math.random() - 0.5);
    setRandomizedData(shuffledData);
  }, [data]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = randomizedData.slice(indexOfFirstItem, indexOfLastItem);

  console.log("data products: ", data);

  const buyProducts = (e, product) => {
    // Agrega 'product' como parámetro

    e.preventDefault();

    console.log("Comprando: ", product);
    toast.success(`${product.objeto} añadido al carrito!`);
    setCart([...cart, product]);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (!data) {
    return <p>Loading...</p>;
  }


    
  return (

    <div className={styles.contenedorPadre}>
      <span className={styles.title}>Lo que te recomendamos</span>

      <div className={styles.cardConteiner}>
      {currentItems.map((product) => (
          <Link
            className={styles.card}
            key={product.id}
            to={"/detalle/" + product.id}
          >
            <div className={styles.imgContainer}>
              <img
                src={product.img}
                alt="img-product-card"
                className={styles.img}
              />
            </div>
            <div className={styles.dataContainer}>
              <div className={styles.dataContainerChildren}>
                <span className={styles.h3}>{product.objeto}</span>
                <br />
                <span className={styles.h4}>{product.precio}</span>
              </div>
              <br />
              <button
                className={styles.button}
                onClick={(e) => buyProducts(e, product)}
              >
                Reservar
              </button>{" "}
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
        className={styles.buttonPagination}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
        className={styles.buttonPagination}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span className={styles.numeracion}>{`${currentPage} / ${totalPages}`}</span>
        <button
        className={styles.buttonPagination}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
        className={styles.buttonPagination}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Recomendados;
