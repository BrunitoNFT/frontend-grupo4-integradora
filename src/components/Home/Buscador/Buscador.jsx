import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../Buscador/buscador.module.css";

function Buscador() {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [loading, setLoading] = useState(false);

  


  useEffect(() => {
    fetch("http://18.118.140.140/product")
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos de productos cargados correctamente:", data);
        setProductos(data);
      })
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  useEffect(() => {
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
  }, [productoSeleccionado]);

  const handleSearch = () => {
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
              dateFormat="yyyy/MM/dd"
              placeholderText="Selecciona una fecha"
              minDate={new Date()}
              maxDate={fechaFin || undefined}
              excludeDates={fechasOcupadas}
              disabled={loading}
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
              dateFormat="yyyy/MM/dd"
              placeholderText="Selecciona una fecha"
              minDate={fechaInicio}
              maxDate={fechaFin || undefined}
              excludeDates={fechasOcupadas}
              disabled={loading}
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
