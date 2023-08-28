import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './detalleProducto.module.css';


import {GiMusicalScore} from "react-icons/gi";
import { GiMusicSpell } from "react-icons/gi";
import {GiMusicalNotes} from "react-icons/gi";
import { GiMusicalKeyboard } from "react-icons/gi";

const DetalleProducto = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.json');
      const productsData = await response.json();
      const foundProduct = productsData.find((product) => product.id.toString() === id);


      setProduct(foundProduct);
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className={styles.detalleProducto}>
      {/* Usar product en lugar de data */}
      <div key={product.id} className={styles.productDetail}>
        <header className={styles.detalleHeader}>
          <div className={styles.tituloIzquierda}>
            <span className={styles.h3}>{product.objeto}</span>
          </div>
          <div className={styles.flechaDerecha}>
            <Link to="/">← Volver</Link>
          </div>
        </header>
        <div className={styles.detalleBody}>
          
        <div className={styles.caracteristicas}> 
          <div> <b>< GiMusicalScore />Categoria:</b> <p>{product.categoria}</p> </div>
          <div> <b>< GiMusicSpell />Marca:</b> <p>{product.marca}</p> </div>
          <div> <b>< GiMusicalNotes />Modelo:</b> <p>{product.modelo}</p> </div>
          <div> <b>< GiMusicalKeyboard />Material:</b> <p>{product.material}</p> </div>
        </div>

          <article className={styles.imgContainer}>

            <section className={styles.productImage}>
            <img
              src={product.img}
              alt="img-product"
              className={styles.productImage}
            />
            </section>
            <section className={styles.product4}>
            <div className={styles.product2}>
            <img
              src={product.img1}
              alt="img-product"
              className={styles.productImg}
            />
            <img
              src={product.img2}
              alt="img-product"
              className={styles.productImg}
            />
            </div>
            <div className={styles.product2}>
            <img
              src={product.img3}
              alt="img-product"
              className={styles.productImg}
            />
            <img
              src={product.img4}
              alt="img-product"
              className={styles.productImg}
            />

            <div className={styles.contButton}>
              <Link to={`/Galeria/${id}`}>
               <button className={styles.VerMas}>Ver Más</button>
              </Link>
            </div>


            </div>

            </section>

          </article>

          <p className={styles.productDescription}>{product.descripcion}</p>

          

        </div>
        
      </div>
    </div>
  );
  
};

export default DetalleProducto;
