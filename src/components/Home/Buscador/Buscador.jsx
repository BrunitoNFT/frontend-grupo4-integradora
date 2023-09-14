import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import styles from "../Buscador/buscador.module.css";
import moment from "moment";

function Buscador() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  /* const [fechasOcupadas, setFechasOcupadas] = useState([]); */
  const [filtro, setFiltro] = useState("");
  const [productos, setProductos] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");

  const URL = "http://18.118.140.140/product";
  const showData = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("La solicitud a la API no fue exitosa");
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener la lista de productos:", error);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  const handleInputChange = (e) => {
    const textoFiltro = e.target.value.toLowerCase();
    setFiltro(textoFiltro);
    // Se va a mostrar la lista solo si el input no está vacío
    setMostrarLista(textoFiltro.trim() !== "");
  };

  const handleNameClick = (nombre) => {
    setProductoSeleccionado(nombre);
    setMostrarLista(false);

    // aqui agregaria la logica de busqueda con la api /occupied-dates

    console.log("Nombre seleccionado:", nombre);
  };

  const results = productos.filter((producto) =>
    producto.name.toLowerCase().includes(filtro)
  );

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  const isOutsideRange = (day) => {
    // Obtén la fecha de hoy
    const today = moment();
    // Compara si el día seleccionado es anterior a hoy
    return day.isBefore(today, "day");
  };

  /* useEffect(() => {
    if (productoSeleccionado) {
      setLoading(true);
      fetch(`http://18.118.140.140/booking/${productoSeleccionado}/occupied-dates`)
        .then((response) => response.json())
        .then((data) => {
          setFechasOcupadas(data.map((dateString) => new Date(dateString)));
          setLoading(false);
          console.log("Fechas ocupadas cargadas correctamente:", data);
          console.log('aaaaaaaaaa', fechasOcupadas);
          console.log('');
        })
        .catch((error) => {
          console.error("Error al obtener fechas ocupadas:", error);
          setLoading(false);
        });
    }
  }, [productoSeleccionado]); */

  const handleSearch = () => {
    console.log("Producto seleccionado:", productoSeleccionado);
    console.log("Fecha de inicio:", startDate);
    console.log("Fecha de fin:", endDate);
  };

  return (
    <div className={styles.buscadorContainer1}>
      <h3 className={styles.buscadorH3}>
        ¿Necesitas ese producto en específico? Busquémoslo
      </h3>

      <div className={styles.inputContainer}>
        <input
          className={styles.inputBuscador}
          type="text"
          placeholder="Ingrese un producto"
          value={productoSeleccionado || filtro}
          onChange={handleInputChange}
        />
        {mostrarLista && (
          <ul className={styles.inputUl}>
            {results.map((producto) => (
              <li
                className={styles.inputLi}
                key={producto.id}
                onClick={() => handleNameClick(producto.name)}
              >
                {producto.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.datePicker}>
        <DateRangePicker
          startDate={startDate}
          startDateId="start_date"
          endDate={endDate}
          endDateId="end_date"
          onDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
          isOutsideRange={isOutsideRange}
        />
      </div>

      <button className={styles.buscadorButton} onClick={handleSearch}>
        Realizar Búsqueda
      </button>
    </div>
  );
}

export default Buscador;
