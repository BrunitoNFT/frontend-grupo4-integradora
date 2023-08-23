import React, { useState } from 'react';
import styles from './agregarProducto.module.css';

const AgregarProducto = ({ agregarProducto }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
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

  const handleCategoriaSeleccionada = (e, categoriaId) => {
    const isChecked = e.target.checked;

    if (isChecked) {
        // Agregar la categoría seleccionada al conjunto
      setCategoriaSeleccionada([...categoriaSeleccionada, categoriaId]);
    } else {
        // Remover la categoría deseleccionada del conjunto
      setCategoriaSeleccionada(categoriaSeleccionada.filter(id => id !== categoriaId));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre || !descripcion || categoriaSeleccionada.length === 0 || imagenes.length === 0) {
      setMensajeError('Por favor, completa todos los campos.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    categoriaSeleccionada.forEach(id => {
      formData.append('categoriaSeleccionada', id);
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
        setCategoriaSeleccionada([]);
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

/// Traer el listado de Categorias para armar la checklist

  const [categorias] = useState([
    { id: 1, nombre: 'Electrónico' },
    { id: 2, nombre: 'Acustico' },
  ]);

  return (
    <div className={styles.agregarProducto}>
      <h2>Agregar Producto</h2>
      {mensajeError && <p className={styles.mensajeError}>{mensajeError}</p>}
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={handleNombreChange} />

        <label>Descripción:</label>
        <textarea value={descripcion} onChange={handleDescripcionChange}></textarea>

        <label>Imágenes:</label>
        <input type="file" multiple onChange={handleImagenesChange} />
        
        <label>Categoría:</label>
        <div>
          {categorias.map(categoria => (
            <label key={categoria.id}>
              <input
                type="checkbox"
                value={categoria.id}
                checked={categoriaSeleccionada.includes(categoria.id)}
                onChange={e => handleCategoriaSeleccionada(e, categoria.id)}
              />
              {categoria.nombre}
            </label>
          ))}
        </div>

        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
