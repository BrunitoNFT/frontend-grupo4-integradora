import React, { useEffect, useState } from 'react';
import { Link, useParams} from 'react-router-dom';
import styles from './detalleProducto.module.css';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import {GiMusicalScore, GiMusicSpell, GiMusicalNotes, GiMusicalKeyboard } from "react-icons/gi";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

const DetalleProducto = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [dateRange1, setDateRange1] = useState([null, null]);
  const [dateRange2, setDateRange2] = useState([null, null]);

  const handleCalendarChange1 = (value) => {
    setDateRange1(value);
  };

  const handleCalendarChange2 = (value) => {
    setDateRange2(value);
  };

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
      <div key={product.id}>


        <section className={styles.detalleHeader}>
          <div className={styles.caracteristicas}> 
            <div className={styles.caracteristicasIndiv}> <b>< GiMusicalScore />Categoria:</b> <p>{product.categoria}</p> </div>
            <div className={styles.caracteristicasIndiv}> <b>< GiMusicSpell />Marca:</b> <p>{product.marca}</p> </div>
            <div className={styles.caracteristicasIndiv}> <b>< GiMusicalNotes />Modelo:</b> <p>{product.modelo}</p> </div>
            <div className={styles.caracteristicasIndiv}> <b>< GiMusicalKeyboard />Material:</b> <p>{product.material}</p> </div>
          </div>
          <Link to="/"><BsFillArrowLeftCircleFill color='#214F55' size={40}/></Link>
        </section>



        <section className={styles.detalleBody}>


          <article className={styles.ladoIzquierdo}>
            <h3 className={styles.h3}>{product.objeto}</h3>
            <p className={styles.productDescription}>{product.descripcion}</p>
            <div className={styles.precioBoton}>
              <p className={styles.precio}>$ {product.price}</p>
              <button className={styles.botonReserva}>Reservar</button>
            </div>
            <div className={styles.calendarContainer}>
              {/* Double Calendar */}
              <div className={styles.doubleCalendar}>
                <Calendar
                  className={styles.calendar}
                  selectRange
                  value={dateRange1}
                  onChange={handleCalendarChange1}
                />
                {/* Separator */}
                <div className={styles.calendarSeparator}></div>
                <Calendar
                  className={styles.calendar}
                  selectRange
                  value={dateRange2}
                  onChange={handleCalendarChange2}
                />
              </div>
            </div>
          </article>

          <article className={styles.ladoDerecho}>
            <div className={styles.imgContainer}>
              <div className={styles.productImageBox}>
                <img
                  src={product.img}
                  alt="img-product"
                  className={styles.productImage}
                />
              </div>
              <div className={styles.product4}>
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
                </div>
              </div>
            </div>
            <button className={styles.VerMasBox} >
              <Link className={styles.a} to={`/Galeria/${id}`}>
                Ver Más
              </Link>
            </button>
          </article>
        </section>
        </div>
      </div>
  );
  
};

export default DetalleProducto;
