import React, { useEffect, useState } from "react";
import styles from "./reserva.module.css";

function Reserva() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    direccion: "",
  });

  const [producto, setProducto] = useState({});
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetch("/carritoProducto")
      .then((response) => response.json())
      .then((data) => setProducto(data));

    fetch("/historialReservas")
      .then((response) => response.json())
      .then((data) => setReservas(data));
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Realiza una acción para confirmar la reserva y enviar el correo
    // Aquí puedes implementar la lógica de reserva y enviar el correo
    alert(
      "La reserva se realizó con éxito. El código de reserva se enviará por correo."
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.formContainerH2}>Formulario de Reserva</h2>
        <form className={styles.formContainerForm} onSubmit={handleSubmit}>
          <div>
            <label className={styles.formContainerLabel}>Nombre:</label>
            <input
              className={styles.formContainerInput}
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label className={styles.formContainerLabel}>Apellido:</label>
            <input
              className={styles.formContainerInput}
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label className={styles.formContainerLabel}>Correo:</label>
            <input
              className={styles.formContainerInput}
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label className={styles.formContainerLabel}>Dirección:</label>
            <input
              className={styles.formContainerInput}
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleFormChange}
            />
          </div>
          {producto && (
            <div className={styles.productoContainer}>
              <h3 className={styles.productoContainerH3}>Producto a Reservar</h3>
              <img className={styles.productoContainerImg} src={producto.img} alt={producto.name} />
              <p className={styles.productoContainerP}> Nombre: {producto.name}</p>
              <p className={styles.productoContainerP}> Descripción: {producto.description}</p>
              <p className={styles.productoContainerFechas}> Rango de Fechas de Reserva: {producto.rangoFechasDeReserva}</p>
            </div>
          )}
          <button className={styles.formContainerButton} type="submit">Confirmar Reserva</button>
        </form>
      </div>
      <div className={styles.historialContainer}>
        <h2 className={styles.historialContainerH2}>Historial de Reservas</h2>
        <div className={styles.historial}>
          {reservas.map((reserva, index) => (
            <article className={styles.historialArticle} key={index}>
              <p className={styles.historialP}>Nombre del Artículo: {reserva.nombreArticulo}</p>
              <p className={styles.historialP}>
                Rango de Fechas de la Reserva: {reserva.rangoFechasDeReserva}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reserva;
