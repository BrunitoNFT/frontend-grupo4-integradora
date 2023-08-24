import React, { useState } from 'react';
import styles from './agregarProducto.module.css';

const AgregarProducto = ({ agregarProducto }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [caracteristicaSeleccionada, setCaracteristicaSeleccionada] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [mensajeError, setMensajeError] = useState('');

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleImagenesChange = (event) => {
    const files = Array.from(event.target.files);
    setImagenes(files);
  };

  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleCaracteristicaSeleccionada = (e, caracteristicaId) => {
    const isChecked = e.target.checked;

    if (isChecked) {
        // Agregar la categoría seleccionada al conjunto
      setCaracteristicaSeleccionada([...caracteristicaSeleccionada, caracteristicaId]);
    } else {
        // Remover la categoría deseleccionada del conjunto
      setCaracteristicaSeleccionada(caracteristicaSeleccionada.filter(id => id !== caracteristicaId));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre || !descripcion || caracteristicaSeleccionada.length === 0 || imagenes.length === 0) {
      setMensajeError('Por favor, completa todos los campos.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('categoriaSeleccionada', categoriaSeleccionada);
    caracteristicaSeleccionada.forEach(id => {
      formData.append('caracteristicaSeleccionada', id);
    });
    imagenes.forEach(imagen => {
      formData.append('imagenes', imagen);
    });

    try {
      const response = await fetch('URL_DEL_SERVIDOR', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setNombre('');
        setDescripcion('');
        setCaracteristicaSeleccionada([]);
        setCategoriaSeleccionada(''); 
        setImagenes([]);
        setMensajeError('');
      } else {
        setMensajeError('Hubo un error al agregar el producto.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setMensajeError('Hubo un error al comunicarse con el servidor.');
    }
  };

/// Traer el listado de Caracteristicas para armar la checklist

  const [caracteristicas] = useState([
    { id: 1, nombre: 'Yamaha' },
    { id: 2, nombre: 'Babilon' },
    { id: 3, nombre: 'Behringer'},
    { id: 4, nombre: 'Guitarras'},
    { id: 5, nombre: 'Plastico'},
    { id: 6, nombre: 'Metal'},
    { id: 7, nombre: 'Madera'},

  ]);

/// Traer el listado de Categorias

  const [categorias] = useState([
    { id: 1, nombre: 'Percusion' },
    { id: 2, nombre: 'Viento' },
    { id: 3, nombre: 'Cuerda'},
  ]);

  return (
    <div className={styles.agregarProducto}>
      <h2>Agregar Producto</h2>
      {mensajeError && <p className={styles.mensajeError}>{mensajeError}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={handleNombreChange} />

        <label>Precio:</label>
        <input type="text" value={precio} onChange={handlePrecioChange} inputmode="numeric" pattern="[0-9]*" />

        <label>Descripción:</label>
        <textarea value={descripcion} onChange={handleDescripcionChange}></textarea>

        <label>Imágenes:</label>
        <input type="file" multiple onChange={handleImagenesChange} />  

        <label>Categoría:</label>
        <select
          value={categoriaSeleccionada}
          onChange={handleCategoriaChange}
          className={categoriaSeleccionada ? styles.selectSeleccionado : ''}
        >
          <option value="">Selecciona una categoría</option>
           {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
           ))}
        </select>
        
        <label>Características:</label>
        <div className={styles.caracteristicasContainer}>
          {caracteristicas.map(caracteristica => (
            <label key={caracteristica.id}>
              <input
                type="checkbox"
                value={caracteristica.id}
                checked={caracteristicaSeleccionada.includes(caracteristica.id)}
                onChange={e => handleCaracteristicaSeleccionada(e, caracteristica.id)}
              />
              {caracteristica.nombre}
            </label>
          ))}
        </div>

        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
