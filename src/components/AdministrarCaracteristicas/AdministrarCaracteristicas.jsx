import React, { useState } from 'react';
import AgregarCaracteristicas from './AgregarCaracteristicas/AgregarCaracteristicas';
import EditarCaracteristicas from './EditarCaracteristicas/EditarCaracteristicas';
import styles from './administrarCaracteristicas.module.css';

const AdministrarCaracteristicas = () => {
  const [mostrarAgregarCaracteristicas, setMostrarAgregarCaracteristicas] = useState(true);
  const [mostrarEditarCaracteristicas, setMostrarEditarCaracteristicas] = useState(false);

  const handleMostrarAgregarCaracteristicas = () => {
    setMostrarAgregarCaracteristicas(true);
    setMostrarEditarCaracteristicas(false);
  };

  const handleMostrarEditarCaracteristicas = () => {
    setMostrarAgregarCaracteristicas(false);
    setMostrarEditarCaracteristicas(true);
  };

  return (
    <div className={styles.administrarCaracteristicas}>
      <h2>Administrar Características en Productos</h2>
      <div className={styles.botones}>
        <button onClick={handleMostrarAgregarCaracteristicas}>Agregar Características</button>
        <button onClick={handleMostrarEditarCaracteristicas}>Editar Características</button>
      </div>
      {mostrarAgregarCaracteristicas && <AgregarCaracteristicas />}
      {mostrarEditarCaracteristicas && <EditarCaracteristicas />}
    </div>
  );
};

export default AdministrarCaracteristicas;
