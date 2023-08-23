import React, { useState, useEffect } from "react";
import styles from './registro.module.css'

const Registro = () => {
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length < 0 || apellido.length < 0) {
      setError("Debes ingresar nombre/ apellido");
      setTimeout(() => {
        setError("");
      }, 4000);
      return;
    } else if (!email.includes("@")) {
      setError("El email ingresado no es valido, ingresa tu direccion nuevamente");
      setTimeout(() => {
        setError("");
      }, 4000);
      return;
    } else if (contrasena.trim() === "") {
      setError("Debes ingresar tu contrasena sin espacios");
      setTimeout(() => {
        setError("");
      }, 4000);
      return;
    } else if (contrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setTimeout(() => {
        setError("");
      }, 4000);
      return;
    }

    setSuccessMessage(`Genial ${name}, ya has quedado registrado!`);
    setError("");
  };

  useEffect(() => {
    if (successMessage) {
      const mssg = setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
      return () => clearTimeout(mssg);
    }
  }, [successMessage]);

  return (
    <div className={styles.mainForm}>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <label>
          Nombre: 
          <input
            placeholder="Ej. Diego"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        
        <label>
          Apellido: 
          <input
            placeholder="Ej. De La Vega"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </label>
        
        <label>
          Email: 
          <input
            placeholder="Ej. diego@delavega.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        
        <label>
          Contraseña: 
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Registrar</button>
      </form>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Registro;