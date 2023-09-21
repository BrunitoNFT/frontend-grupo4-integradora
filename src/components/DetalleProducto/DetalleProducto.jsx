import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize'; // Importa esto para inicializar react-dates
import 'react-dates/lib/css/_datepicker.css';
import styles from './detalleProducto.module.css';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import {
  GiMusicalScore,
  GiMusicSpell,
  GiMusicalNotes,
  GiMusicalKeyboard,
} from 'react-icons/gi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import moment from 'moment';

const opcionesDePoliticas = [
  "Condiciones de entrega, horarios: Nuestra empresa ofrece entregas programadas de instrumentos musicales en horarios convenientes para nuestros clientes. Garantizamos la puntualidad y la integridad de los productos durante la entrega, asegurando que estén listos para su uso inmediato.",
  "Condiciones de devolución: Facilitamos el proceso de devolución de los instrumentos al finalizar el período de alquiler. Los clientes deben asegurarse de que los instrumentos estén en las mismas condiciones en las que fueron entregados para evitar cargos adicionales.",
  "Condiciones de uso: Los clientes son responsables de utilizar los instrumentos de manera apropiada y cuidadosa. Cualquier daño causado por un mal uso estará sujeto a cargos adicionales.",
  "Condiciones por producto dañado: En caso de daño accidental a un instrumento durante el período de alquiler, nuestros clientes deben notificarnos de inmediato. Se aplicarán tarifas de reparación o reemplazo según la magnitud del daño.",
  "Condición de producto perdido/robado (seguro): Ofrecemos opciones de seguro para proteger a nuestros clientes en caso de pérdida o robo de los instrumentos. Los detalles sobre las tarifas y coberturas se proporcionan al momento de la reserva.",
  "Condición de privacidad de datos: Respetamos la privacidad de nuestros clientes y sus datos personales. La información recopilada durante el proceso de reserva se utiliza únicamente con fines relacionados con el alquiler de instrumentos y se mantiene segura y confidencial."
];

const opcionesAleatorias = shuffle(opcionesDePoliticas).slice(0, 2);

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex,
    temporaryValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const DetalleProducto = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
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
        date: moment().format('YYYY-MM-DD'),
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
            <div className={styles.calendario}>
              <h4>Selecciona un rango de fechas</h4>
              <DateRangePicker
                startDate={startDate}
                startDateId="start_date"
                endDate={endDate}
                endDateId="end_date"
                onDatesChange={({ startDate, endDate }) => {
                  setStartDate(startDate);
                  setEndDate(endDate);
                }}
                focusedInput={focusedInput}
                onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                isOutsideRange={(day) => day.isBefore(moment())}
              />
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
        <section className={styles.politicasContainer}>
          <h4>Políticas</h4>
          <div className={styles.tarjetasContainer}>
            {opcionesAleatorias.map((opcion, index) => (
              <div className={styles.tarjeta} key={index}>
                {opcion}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetalleProducto;
