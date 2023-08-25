import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InicioSesion.module.css";
import { DataContext } from "../Context/DataContext";

function InicioSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.length < 0 || password.length < 0) {
      alert("Debes completar la información");
    } else if (!email.includes("@")) {
      alert("Ingresa una dirección de correo válida");
    } else if (password.trim() === "") {
      alert("Clave invalida");
    } else if (password.length < 6) {
      alert("Clave invalida");
    } else {
      setUser({ name: "Andrea", email: "andrea@mail.com" });
      navigate("/");
    }
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <h2>Completá los campos</h2>

        <div className={styles.labelContainer}>
          <label> Correo electronico *</label>
          <input
            type="email"
            placeholder="Ej. dondiego@delavega.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.labelContainer}>
          <label>Contraseña *</label>
          <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />{" "}
        </div>
        <br />

        <button onClick={handleSubmit}>Iniciar Sesión</button>
      </div>
    </>
  );
}

export default InicioSesion;
