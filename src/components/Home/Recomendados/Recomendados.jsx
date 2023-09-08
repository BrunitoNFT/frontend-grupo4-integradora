import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../Context/DataContext";
import styles from "./recomendados.module.css";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsShareFill,
} from "react-icons/bs";

const Recomendados = () => {
  const { data, cart, setCart } = useContext(DataContext);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [randomizedData, setRandomizedData] = useState([]);
  const [comment, setComment] = useState("");

  const openSharePopup = (product) => {
    const popup = document.getElementById(`popup${product.id}`);
    popup.style.display = "block";
  };

  const closePopup = (product) => {
    const popup = document.getElementById(`popup${product.id}`);
    popup.style.display = "none";
  };

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
          <div className={styles.card}>
            <Link
              className={styles.imgContainer}
              key={product.id}
              to={"/detalle/" + product.id}
            >
              <img
                src={product.img}
                alt="img-product-card"
                className={styles.img}
              />
            </Link>
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
              <button
                className={styles.buttonShare}
                onClick={() => openSharePopup(product)}
              >
                <BsShareFill color="#4F709C" size={15}/>
              </button>
              {/* Elementos para la ventana emergente de compartir */}
              <div className={styles.sharePopup} id={`popup${product.id}`}>
                <img
                  className={styles.sharePopupImg}
                  src={product.img}
                  alt="img-product-popup"
                />
                <p>{product.objeto}</p>
                <a href={`/detalle/${product.id}`} className={styles.detailLink}>
                    Ver mas
                </a>
                <input
                  className={styles.sharePopupInput}
                  type="text"
                  placeholder="Escribe tu comentario"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className={styles.socialLinks}>
                  <a
                    className={styles.socialLinksA}
                    href={`https://www.facebook.com/share?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsFacebook color="#214F55"/>
                  </a>
                  <a
                    className={styles.socialLinksA}
                    href={`https://www.instagram.com/share?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsInstagram color="#214F55"/>
                  </a>
                  <a
                    className={styles.socialLinksA}
                    href={`https://twitter.com/share?url=${window.location.href}&text=${product.objeto}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsTwitter color="#214F55"/>
                  </a>
                </div>
                <button
                  className={styles.closeButton}
                  onClick={() => closePopup(product)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
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
        <span
          className={styles.numeracion}
        >{`${currentPage} / ${totalPages}`}</span>
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
