import React, { useState, useEffect, useContext} from "react";
import { DataContext } from "../../Context/DataContext";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import styles from "../Buscador/buscador.module.css";
import { BsCartCheck } from "react-icons/bs";
import moment from "moment";

function Buscador() {
  const { cart, setCart } = useContext(DataContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [productos, setProductos] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

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
    setMostrarLista(textoFiltro.trim() !== "");
  };

  const handleNameClick = (nombre) => {
    setFiltro(nombre);
    setMostrarLista(false);
  };

  const results = productos.filter((producto) =>
    producto.name.toLowerCase().includes(filtro)
  );

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const isOutsideRange = (day) => {
    const today = moment();
    return day.isBefore(today, "day");
  };

  const handleAddToCart = (e, producto) => {
    e.preventDefault();
    setCart([...cart, producto]);

  };

  const handleSearch = () => {
    console.log("Producto seleccionado:", filtro);
    console.log("Fecha de inicio:", startDate);
    console.log("Fecha de fin:", endDate);

    
    const productoSeleccionado = {
      name: filtro,
      startDate,
      endDate,
    };
    setProductosSeleccionados([...productosSeleccionados, productoSeleccionado]);
    setFiltro("");
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
          value={filtro}
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

      {/* Mostrar productos seleccionados */}
      {productosSeleccionados.length > 0 && (
        <div className={styles.productosSeleccionadosContainer}>
          <h3 className={styles.tarjetaH3}>Productos Seleccionados:</h3>
          <div className={styles.tarjetasCarrito}>
          {productosSeleccionados.map((producto, index) => (
            <div key={index} className={styles.productoCard}>
              <img className={styles.productoCardImg} src={producto.urlImg} alt={producto.name} />
              <h4 className={styles.productoCardH4}>{producto.name}</h4>
              <p className={styles.productoCardP}>Fecha de inicio: {moment(producto.startDate).format("YYYY-MM-DD")}</p>
              <p className={styles.productoCardP}>Fecha de fin: {moment(producto.endDate).format("YYYY-MM-DD")}</p>
              <button className={styles.productoCardButton} onClick={(e) => handleAddToCart(e, producto)}><BsCartCheck/></button>
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Buscador;
