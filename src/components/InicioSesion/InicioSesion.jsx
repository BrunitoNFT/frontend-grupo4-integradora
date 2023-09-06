import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InicioSesion.module.css";
import { DataContext } from "../Context/DataContext";

function InicioSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setError("Debes completar la información");
    } else if (!isValidEmail(email)) {
      setError("Ingresa una dirección de correo válida");
    } else if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
    } else {
      try {
        const response = await fetch("http://18.118.140.140/login", {
          method: "POST",
          credentials: "include", // Incluir cookies en la solicitud
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        if (response.ok) {
          // La autenticación fue exitosa
          const data = await response.json();
          const jwtToken = data.jwtToken;

          // Almacenar el token en el almacenamiento local (localStorage o sessionStorage)
          localStorage.setItem("jwtToken", jwtToken);

          // Actualizar el estado del usuario o redirigir a la página de inicio
          setUser({ email }); // Actualiza el contexto con la información del usuario
          navigate("/"); // Redirige a la página de inicio o a donde sea necesario
        } else {
          setError("Credenciales incorrectas");
        }
      } catch (error) {
        setError("Ocurrió un error");
      }
    }
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <h2>Completa los campos</h2>

        <div className={styles.labelContainer}>
          <label>Correo electrónico *</label>
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
          />
        </div>
        <br />

        <button className={styles.buttonInicio} onClick={handleSubmit}>
          Iniciar Sesión
        </button>
        {error && <p className={styles.errorIS}>{error}</p>}
      </div>
    </>
  );
}

export default InicioSesion;

