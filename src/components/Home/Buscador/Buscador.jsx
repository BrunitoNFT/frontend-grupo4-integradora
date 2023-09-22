import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import styles from "../Buscador/buscador.module.css";
import { BsBookmarkCheck } from "react-icons/bs";
import moment from "moment";

function Buscador() {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [agregarProducto, setAgregarProducto] = useState(false);
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  let token = localStorage.getItem("jwtToken");
  let amount = 1;

  /// FORMATEA LAS FECHAS DEL CALENDARIO PARA OBTENER UN FORMATO YYYY-MM-DD
  const startDateAsMoment = dateRange.startDate;
  const startDateFormatted = startDateAsMoment
    ? startDateAsMoment.format("YYYY-MM-DD")
    : null;

  const endDateAsMoment = dateRange.endDate;
  const endDateFormatted = endDateAsMoment
    ? endDateAsMoment.format("YYYY-MM-DD")
    : null;

  /// BUSCADOR -- pendiente agregar condicional de que input debe tener al menos 3 letras para generar resultados
  const handleBuscar = () => {
    if (searchKeyword.length >= 3) {
      fetch(`http://18.118.140.140/product/search?keyword=${searchKeyword}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
          setSearchKeyword("");
        })
        .catch((error) =>
          console.error("Error al realizar la solicitud:", error)
        );
    } else {
      setSearchResults([]);
    }
    console.log("resultado", searchResults);
    console.log("fechaInicioooooo", startDateFormatted);
    console.log("fechaFiiiiiiin", endDateFormatted);
  };


  /// LO UTILIZA EL CALENDARIO PARA RESTRINGIR FECHAS PASADAS
  const isOutsideRange = (day) => {
    const today = moment();
    return day.isBefore(today, "day");
  };


  /// FUNCION PARA HACER LA RESERVA HACIENDO POST AL SHOPPING-CART
  useEffect(() => {
    const addProducto = async () => {
      const bookProduct = {
        product:{
          "id": selectedProduct.id
        },
        amount: amount,
        startBooking: startDateFormatted,
        endBooking: endDateFormatted,
      };
      try {
        if (selectedProduct && startDateFormatted && endDateFormatted) {
          const response = await fetch("http://18.118.140.140/shopping-cart", {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookProduct)
          });
  
          if (response.ok) {
            setProductos(... productos, bookProduct);
            alert(`Se ha agregado '${selectedProduct.name}' a Reservas!`);
            setAgregarProducto(false);
          }
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('')
      }
    };
  
    if (agregarProducto) {
      addProducto();
    }
  }, [agregarProducto])


  return (
    <div className={styles.buscadorContainer1}>
      <h3 className={styles.buscadorH3}>
        ¿Necesitas ese producto en específico? Búscalo aquí
      </h3>

      <div className={styles.inputContainer}>
        <input
          className={styles.inputBuscador}
          type="text"
          placeholder="Ingrese un producto"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      <div className={styles.datePicker}>
        <DateRangePicker
          startDate={dateRange.startDate}
          startDateId="start_date_id"
          endDate={dateRange.endDate}
          endDateId="end_date_id"
          onDatesChange={({ startDate, endDate }) => {
            setDateRange({ startDate, endDate });
          }}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
          isOutsideRange={isOutsideRange}
        />
      </div>

      <button className={styles.buscadorButton} onClick={handleBuscar}>
        Realizar Búsqueda
      </button>

      <ul className={styles.inputUl}>
        {searchResults.map((product) => (
          <li className={styles.inputLi} key={product.id}>
            {/* Renderizar los productos encontrados en tarjetas */}
            
              <div key={product.id} className={styles.productoCard}>
                <h4 className={styles.productoCardH4}>{product.name}</h4>
                <p className={styles.productoCardP}>
                  Fecha de inicio: {startDateFormatted}
                </p>
                <p className={styles.productoCardP}>
                  Fecha de fin: {endDateFormatted}
                </p>
                <button
                  className={styles.productoCardButton}
                  onClick={() => {
                    setSelectedProduct(product); // Almacena el producto seleccionado
                    setAgregarProducto(true); // Activa la acción de agregar producto
                  }}
                >
                  <BsBookmarkCheck size={18} color="whitesmoke" />
                </button>
                
              </div>
          
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Buscador;
