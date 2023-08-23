import React, { useState } from 'react';
import styles from './administrarCaracteristicas.module.css';

const AdministrarCaracteristicas = () => {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState('');
  const [caracteristicaEditando, setCaracteristicaEditando] = useState(null);

  const agregarCaracteristica = () => {
    if (nuevaCaracteristica) {
      setCaracteristicas([...caracteristicas, { nombre: nuevaCaracteristica, icono: '' }]);
      setNuevaCaracteristica('');
    }
  };

  const handleEdit = (indice, nombre) => {
    setCaracteristicaEditando({ indice, nombre });
  };

  const cancelEdit = () => {
    setCaracteristicaEditando(null);
  };

  const saveEdit = (indice, nuevoNombre) => {
    const nuevasCaracteristicas = [...caracteristicas];
    nuevasCaracteristicas[indice].nombre = nuevoNombre;
    setCaracteristicas(nuevasCaracteristicas);
    setCaracteristicaEditando(null);
  };

  const handleDelete = (indice) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
    const nuevasCaracteristicas = caracteristicas.filter((_, i) => i !== indice);
    setCaracteristicas(nuevasCaracteristicas);
  }
};

  return (
    <div className={styles.administrarCaracteristicas}>
      <h2>Administrar Características</h2>
      <div className={styles.agregarCaracteristica}>
        <input
          type="text"
          placeholder="Nombre de la Característica"
          value={nuevaCaracteristica}
          onChange={(e) => setNuevaCaracteristica(e.target.value)}
        />
        <button onClick={agregarCaracteristica}>Añadir Nueva</button>
      </div>
      <ul className={styles.listaCaracteristicas}>
        {caracteristicas.map((caracteristica, indice) => (
          <li key={indice}>
            {caracteristicaEditando?.indice === indice ? (
              <>
                <input
                  type="text"
                  value={caracteristicaEditando.nombre}
                  onChange={(e) =>
                    setCaracteristicaEditando({
                      ...caracteristicaEditando,
                      nombre: e.target.value,
                    })
                  }
                />
                <button onClick={() => saveEdit(indice, caracteristicaEditando.nombre)}>
                  Guardar
                </button>
                <button onClick={cancelEdit}>Cancelar</button>
              </>
            ) : (
              caracteristica.nombre
            )}
            {caracteristicaEditando?.indice !== indice && (
              <>
                <button onClick={() => handleEdit(indice, caracteristica.nombre)}>Editar</button>
                <button onClick={() => handleDelete(indice)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdministrarCaracteristicas;
