import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './InicioSesion.module.css';

function InicioSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      alert('Debes completar la información');
    } else if (!email.includes('@')) {
      alert('Ingresa una dirección de correo válida');
    } else {
      setIsLoginSuccess(true);
    }
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <div>
          <h2>Iniciar Sesión</h2>

          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> <br />

        {setIsLoginSuccess ? <button onClick={handleSubmit} ><Link to='/'>Iniciar Sesión </Link></button> : <button onClick={handleSubmit} >Iniciar Sesión </button>}
        

          
        </div>
      </div>
    </>
  );
}

export default InicioSesion;
