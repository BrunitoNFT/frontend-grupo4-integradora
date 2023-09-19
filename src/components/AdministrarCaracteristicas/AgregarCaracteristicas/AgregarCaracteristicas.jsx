import React, { useState, useEffect } from 'react';
import { FaStar, FaHeart, FaSmile } from 'react-icons/fa'; // Importa los íconos que deseas ofrecer

const AgregarCaracteristicas = () => {
  const [features, setFeatures] = useState([]);
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState('');
  const [iconoCaracteristica, setIconoCaracteristica] = useState(null);

  useEffect(() => {
    // Simulamos una solicitud de fetch para obtener las características y sus iconos.
    // Reemplaza esto con tu lógica de solicitud real.
    fetch('http://18.118.140.140/features')
      .then((response) => response.json())
      .then((data) => setFeatures(data))
      .catch((error) => console.error('Error fetching features:', error));
  }, []);

  const handleAgregarCaracteristica = () => {
    // Aquí puedes enviar la nueva característica y su icono al servidor.
    // Reemplaza esto con tu lógica de envío real.
    const nuevaCaracteristicaObj = {
      nombre: nuevaCaracteristica,
      icono: iconoCaracteristica,
    };

    // Simulamos una solicitud de POST para agregar la nueva característica.
    fetch('/api/features', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaCaracteristicaObj),
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizamos la lista de características después de agregar una nueva.
        setFeatures([...features, data]);
        // Limpiamos los campos de entrada y el ícono seleccionado.
        setNuevaCaracteristica('');
        setIconoCaracteristica(null);
      })
      .catch((error) => console.error('Error adding feature:', error));
  };

  return (
    <div>
      <h3>Agregar Nueva Característica</h3>
      <input
        type="text"
        placeholder="Nombre de la Característica"
        value={nuevaCaracteristica}
        onChange={(e) => setNuevaCaracteristica(e.target.value)}
      />
      <div>
        {/* Mostrar opciones de íconos */}
        <div
          onClick={() => setIconoCaracteristica(<FaStar />)}
          className={iconoCaracteristica === <FaStar /> ? 'selected-icon' : ''}
        >
          <FaStar />
        </div>
        <div
          onClick={() => setIconoCaracteristica(<FaHeart />)}
          className={iconoCaracteristica === <FaHeart /> ? 'selected-icon' : ''}
        >
          <FaHeart />
        </div>
        <div
          onClick={() => setIconoCaracteristica(<FaSmile />)}
          className={iconoCaracteristica === <FaSmile /> ? 'selected-icon' : ''}
        >
          <FaSmile />
        </div>
        {/* Puedes agregar más opciones de íconos aquí según tus necesidades */}
      </div>
      <button onClick={handleAgregarCaracteristica}>Agregar Característica</button>

      <h3>Lista de Características</h3>
      <ul>
        {features.map((feature) => (
          <li key={feature.id}>
            {feature.icono} {feature.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgregarCaracteristicas;
