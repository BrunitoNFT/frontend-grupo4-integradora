import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './detalleProducto.module.css';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import {
  GiMusicalScore,
  GiMusicSpell,
  GiMusicalNotes,
  GiMusicalKeyboard,
} from 'react-icons/gi';
import { FaStar, FaRegStar } from 'react-icons/fa';

const DetalleProducto = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rating, setRating] = useState(0); // Estado para la puntuación
  const [reviews, setReviews] = useState([]); // Estado para las reseñas
  const [currentReview, setCurrentReview] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.json');
      const productsData = await response.json();
      const foundProduct = productsData.find(
        (product) => product.id.toString() === id
      );

      setProduct(foundProduct);
    };

    fetchData();
  }, [id]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const averageRating = calculateAverageRating();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setCurrentReview(event.target.value);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert('Por favor, seleccione una valoración antes de enviar la reseña.');
      return;
    }

    if (currentReview !== '') {
      const newReview = {
        rating,
        text: currentReview,
      };
      setReviews([...reviews, newReview]);
      setCurrentReview('');
      setRating(0);
    }
  };

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className={styles.detalleProducto}>
      <div key={product.id}>
        <section className={styles.detalleHeader}>
          <div className={styles.caracteristicas}>
            <div className={styles.caracteristicasIndiv}>
              <b>
                <GiMusicalScore />Categoria:
              </b>
              <p>{product.categoria}</p>
            </div>
            <div className={styles.caracteristicasIndiv}>
              <b>
                <GiMusicSpell />Marca:
              </b>
              <p>{product.marca}</p>
            </div>
            <div className={styles.caracteristicasIndiv}>
              <b>
                <GiMusicalNotes />Modelo:
              </b>
              <p>{product.modelo}</p>
            </div>
            <div className={styles.caracteristicasIndiv}>
              <b>
                <GiMusicalKeyboard />Material:
              </b>
              <p>{product.material}</p>
            </div>
          </div>
          <Link to="/">
            <BsFillArrowLeftCircleFill color="#214F55" size={40} />
          </Link>
        </section>

        <section className={styles.detalleBody}>
          <article className={styles.ladoIzquierdo}>
            <h3 className={styles.h3}>{product.objeto}</h3>
            <p className={styles.productDescription}>{product.descripcion}</p>
            <div className={styles.precioBoton}>
              <p className={styles.precio}>$ {product.price}</p>
              <button className={styles.botonReserva}>Reservar</button>
            </div>
            <div className={styles.calendarios}>
              <div className={styles.calendario}>
                <h4>Fecha de inicio</h4>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                />
              </div>
              <div className={styles.calendario}>
                <h4>Fecha de fin</h4>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || new Date()}
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
            <button className={styles.VerMasBox}>
              <Link className={styles.a} to={`/Galeria/${id}`}>
                Ver Más
              </Link>
            </button>
          </article>
        </section>

        <section className={styles.reviewContainer}>
          <div className={styles.reviewIzquierda}>
            <div className={styles.averageRating}>
              <div className={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${star <= averageRating ? styles.starActive : styles.starInactive
                      }`}
                  >
                    <FaStar />
                  </span>
                ))}
              </div>
              <span className={styles.averageRatingNumber}>{averageRating.toFixed(1)}</span>
              <p className={styles.reviewCount}>
                ({reviews.length} valoraciones)
              </p>
            </div>
          </div>
          <div className={styles.reviewDerecha}>

            <div className={styles.reviewSection}>
              <h4>Puntuación</h4>
              <div className={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${star <= rating ? styles.starActive : styles.starInactive
                      }`}
                    onClick={() => handleRatingChange(star)}
                  >
                    {star <= rating ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
              </div>
              <textarea
                className={styles.reviewTextArea}
                placeholder="Escribe tu reseña aquí"
                value={currentReview}
                onChange={handleReviewChange}
              ></textarea>
              <button
                className={styles.submitReviewButton}
                onClick={handleSubmitReview}
              >
                Enviar Reseña
              </button>
            </div>



            <div className={styles.reviewsUsers}>
              <h4 className={styles.reviewsTitle}>Reseñas</h4>
              <ul className={styles.reviewsList}>
                {reviews.map((review, index) => (
                  <li className={styles.reviewItem} key={index}>
                    <div className={styles.reviewHeader}>
                      <p className={styles.reviewDate}>{review.date}</p>
                      <div className={styles.reviewRating}>
                        <span className={styles.starActive}>
                          {Array.from({ length: review.rating }, (_, index) => (
                            <FaStar key={index} />
                          ))}
                          {Array.from({ length: 5 - review.rating }, (_, index) => (
                            <FaRegStar key={index} />
                          ))}
                        </span>
                      </div>
                    </div>
                    <p className={styles.reviewText}>{review.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetalleProducto;
