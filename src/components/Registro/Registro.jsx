import React, { useState, useEffect } from "react";
import styles from "./registro.module.css";

const Registro = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 0 || lastname.length < 0) {
      setError("Debes ingresar nombre/ apellido");
      setTimeout(() => {
        setError("");
      }, 8000);
      return;
    } else if (!email.includes("@")) {
      setError(
        "El email ingresado no es valido, ingresa tu direccion nuevamente"
      );
      setTimeout(() => {
        setError("");
      }, 8000);
      return;
    } else if (password.trim() === "") {
      setError("Debes ingresar tu contrasena sin espacios");
      setTimeout(() => {
        setError("");
      }, 8000);
      return;
    } else if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setTimeout(() => {
        setError("");
      }, 8000);
      return;
    }
    try{
        const response = await (
         await fetch('http://18.118.140.140/signup', {
             method: 'POST',
             body: JSON.stringify({
               name,
               lastname,
               email,
               password,
         }),
             headers: {
                 'Content-type': 'application/json; charset=UTF-8',
             },
             })
         ).json()
         console.log(response);

     

       if(response.ok){
        setSuccessMessage(
          `Registro exitoso ${name}. Chequea tu correo para validar el registro`
        ); 
        setError("");
      }else{
        setError('Hubo un error durante el registro. Por favor, intentalo de nuevo');
      }
    }catch(error){
      setError('Ocurrio un error al registrar el usuario. Por favor, verifica tu conexion a internet');
    }
  };

  useEffect(() => {
    if (successMessage) {
      const mssg = setTimeout(() => {
        setSuccessMessage("");
      }, 10000);
      return () => clearTimeout(mssg);
    }
  }, [successMessage]);

  return (
    <div className={styles.mainForm}>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <div className={styles.labelContainer}>
          <label>Nombre:</label>
          <input
            className={styles.inputs}
            placeholder="Ej. Diego"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.labelContainer}>
          <label>Apellido:</label>
          <input
            className={styles.inputs}
            placeholder="Ej. De La Vega"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>

        <div className={styles.labelContainer}>
          <label>Email:</label>
          <input
            className={styles.inputs}
            placeholder="Ej. diego@delavega.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.labelContainer}>
          <label>Contraseña:</label>
          <input
            className={styles.inputs}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>

      <div className={styles.messages}>
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default Registro;