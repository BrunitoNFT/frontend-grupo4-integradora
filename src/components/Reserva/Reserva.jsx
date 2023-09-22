import React, { useEffect, useState } from "react";
import styles from "./reserva.module.css";

function Reserva() {
  const [products, setProducts] = useState([]);
  const [history, setHistory] = useState([]);
  const [observations, setObservations] = useState("");

  let token = localStorage.getItem("jwtToken");
  let nombre = localStorage.getItem("name");
  let apellido = localStorage.getItem("lastname");
  let correo = localStorage.getItem("email");

  useEffect(() => {
    /// GET A LA API DE SHOPPING-CART
    async function fetchShoppingCart() {
      const response = await fetch("http://18.118.140.140/shopping-cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      console.log("respuesta del get shoppingCart", jsonData);
      setProducts(...products, jsonData);
    }
    fetchShoppingCart();
  }, []);

  console.log("PRODUCTOS", products);

  /// FUNCION PARA HACER LA RESERVA
  const reserva = () => {
    fetch("http://18.118.140.140/booking", {
      method: "POST",
      mode: 'no-cors',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("LA DATA DE EMIIII", data);
        alert(
          "Reserva exitosa. Se enviará un correo con el código de reserva."
        );
        setHistory([...history, data]);
      });
    };

    /* const handleReserve = () => {
      reserva();
    }; */
  

    /*   /// GET A LA API DE DETAIL-BOOKING
    async function fetchDetailBooking(){
    const response = await fetch("http://18.118.140.140/detail-booking", {
      method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      const jsonData = await response.json();

      setHistory(jsonData))
    
  }, []); */

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
                <button onClick={() => reserva()}>
                  Confirmar Reserva
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.historialContainer}>
          <h2 className={styles.historialContainerH2}>Historial de Reservas</h2>
          <ul>
            {history.map((reservation) => (
              <li key={reservation.id}>
                Nombre: {reservation.productName}
                <br />
                Inicio de reserva: {reservation.startBooking}
                <br />
                Fin de reserva: {reservation.endBooking}
                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}
export default Reserva;
