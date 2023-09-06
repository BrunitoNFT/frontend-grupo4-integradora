import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../Buscador/buscador.module.css";

function Buscador() {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  /* const [disponibilidadProductos, setDisponibilidadProductos] = useState({}); */

  useEffect(() => {
    fetch("http://18.118.140.140/product")
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos de productos cargados correctamente:", data);
        setProductos(data);

        /* const disponibilidad = {};
        data.forEach((product) => {
          disponibilidad[product.id] = product.disponibilidad; // Pendiente agregar la 'disponibilidad' como atributo del producto
        });
        setDisponibilidadProductos(disponibilidad); */
      })
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  console.log("Producto seleccionado:", productoSeleccionado);
  const handleSearch = () => {
    // Colocar la redireccion a la pantalla de la busqueda (mockup Franco)
    console.log("Producto seleccionado:", productoSeleccionado);
    console.log("Fecha de inicio:", fechaInicio);
    console.log("Fecha de fin:", fechaFin);
  };

  return (
    <div className={styles.buscadorContainer1}>
      <div className={styles.buscadorContainer}>
      <h3 className={styles.buscadorH3}>
        ¿Necesitas ese producto en específico? Busquémoslo
      </h3>

      <div className={styles.selectContainer}>
        <select
          className={styles.buscadorSelect}
          value={productoSeleccionado}
          onChange={(e) => setProductoSeleccionado(e.target.value)}
        >
          <option value="" disabled hidden>
            ¿Qué instrumento buscas?
          </option>
          {productos.map((product) => {
            console.log("Nombre del producto:", product.name);
            return (
              <option
                className={styles.producto}
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles.datePickerContainer}>
        <div className={styles.datePicker}>
          <label className={styles.buscadorLabels}>Desde:</label> <br />
          <DatePicker
            className={styles.datePicker1}
            selected={fechaInicio}
            onChange={(date) => setFechaInicio(date)}
            selectsStart
            startDate={fechaInicio}
            endDate={fechaFin}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecciona una fecha"
            minDate={new Date()}
            /* maxDate={fechaFin || new Date()}
            disabled={
              productoSeleccionado
                ? !disponibilidadProductos[productoSeleccionado]
                : false
            } */
          />
        </div>
        <div className={styles.datePicker}>
          <label className={styles.buscadorLabels}>Hasta:</label> <br />
          <DatePicker
            className={styles.datePicker1}
            selected={fechaFin}
            onChange={(date) => setFechaFin(date)}
            selectsEnd
            startDate={fechaInicio}
            endDate={fechaFin}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecciona una fecha"
            minDate={fechaInicio}
            /* disabled={
                productoSeleccionado
                  ? !disponibilidadProductos[productoSeleccionado]
                  : false
              } */
          />
        </div>
      </div>

      <button className={styles.buscadorButton} onClick={handleSearch}>
        Realizar Búsqueda
      </button>
    </div>
    </div>
  );
}

export default Buscador;
