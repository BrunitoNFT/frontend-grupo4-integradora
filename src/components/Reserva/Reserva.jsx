import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./reserva.module.css";

function Reserva() {
  const [products, setProducts] = useState([]);
  const [observations, setObservations] = useState("");
  const [booking, setBooking] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [history, setHistory] = useState([]);

  let token = sessionStorage.getItem("jwtToken");
  let nombre = sessionStorage.getItem("name");
  let apellido = sessionStorage.getItem("lastname");
  let correo = sessionStorage.getItem("email");

  const navigate = useNavigate();


  useEffect(() => {
    async function fetchData() {
      await fetchDetailBooking();
    }

    fetchData();
  }, []);


  useEffect(() => {
    /// VALIDA QUE EL USUARIO ESTE LOGEADO PARA ACCEDER A LA PAGINA
    if (!token) {
      alert("Debes iniciar sesión para acceder a Reservas");
      navigate("/login");
      return;
    }
    /// GET A LA API DE SHOPPING-CART
    async function fetchShoppingCart() {
      try {
        const response = await fetch("http://18.118.140.140/shopping-cart", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const jsonData = await response.json();
          console.log("respuesta del get shoppingCart", jsonData);
          setProducts(jsonData);
        } else {
          console.error("Error al obtener el carrito de compras");
        }
      } catch (error) {
        console.error("Error al obtener el carrito de compras:", error);
      }
    }

    fetchShoppingCart();
  }, [token, navigate]);

  /// FUNCION PARA HACER LA RESERVA
  useEffect(() => {
    async function bookingProduct() {
      try {
        const response = await fetch("http://18.118.140.140/booking", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const reserva = await response.json();
          const bookingCode = reserva.bookingCode;
          const dateBooking = reserva.dateBooking;
          const totalCost = reserva.totalCost;
          setBookingInfo({
            bookingCode,
            dateBooking,
            totalCost,
          });
          setBooking(false);
        } else {
          console.error("Error al realizar la reserva");
        }
      } catch (error) {
        console.error("Error al realizar la reserva:", error);
        alert(
          "ERROR AL INTENTAR REALIZAR LA RESERVA. Por favor, inténtalo de nuevo más tarde o comunícate con el soporte técnico."
        );
      }
    }

    if (booking) {
      bookingProduct();
    }
  }, [booking, token]);

  /// GET A LA API DE DETAIL-BOOKING
  async function fetchDetailBooking() {
    try {
      const response = await fetch("http://18.118.140.140/detail-booking", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const jsonData = await response.json();
        setHistory(jsonData);
      } else {
        console.log("Error al intentar obtener historial de reservas");
      }
    } catch (error) {
      console.log("Error al obtener historial de reserva", error);
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.formContainerH2}>Formulario de Reserva</h2>
        <p>Nombre: {nombre}</p>
        <p>Apellido: {apellido}</p>
        <p>Email: {correo}</p>
        <textarea
          placeholder="Observaciones"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
        />

        {bookingInfo ? (
          <div>
            <h3>Mensaje de Reserva:</h3>
            <p>Booking Code: {bookingInfo.bookingCode}</p>
            <p>Fecha de Reserva: {bookingInfo.dateBooking}</p>
            <ul>
              {products && Array.isArray(products)
                ? products.map((product) => (
                    <li key={product.product.id}>
                      Producto: {product.product.name}
                    </li>
                  ))
                : null}
            </ul>
            <p>Costo Total: ${bookingInfo.totalCost}</p>
          </div>
        ) : (
          <>
            <h3 className={styles.formContainerH2}>Productos para Reservar:</h3>
            <ul>
              {products.map((product) => (
                <li key={product.product.id}>
                  Nombre: {product.product.name}
                  <br />
                  Inicio de reserva: {product.startBooking}
                  <br />
                  Fin de reserva: {product.endBooking}
                  <br />
                </li>
              ))}
            </ul>
            {products.length > 0 && (
              <button
                onClick={() => {
                  setBooking(true);
                }}
              >
                Confirmar Reserva
              </button>
            )}
          </>
        )}
      </div>

      <div className={styles.historialContainer}>
        <h2 className={styles.historialContainerH2}>Historial de Reservas</h2>
        <ul>
              {history.map((reservation) => (
              <li key={reservation.id}>
                Nombre: {reservation.productName}
                <br />
                Fecha de reserva: {reservation.dateBooking}
              
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
}
export default Reserva;

