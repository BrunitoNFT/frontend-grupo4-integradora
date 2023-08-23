import React, { useState } from 'react';
import styles from './administrarCategorias.module.css';

const AdministrarCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
  });

  const agregarCategoria = () => {
    if (nuevaCategoria.titulo && nuevaCategoria.descripcion && nuevaCategoria.imagen) {
      setCategorias([...categorias, { ...nuevaCategoria }]);
      setNuevaCategoria({
        titulo: '',
        descripcion: '',
        imagen: '',
      });
    }
  };

  return (
    <div className={styles.administrarCategorias}>
      <h2>Administrar Categorías</h2>
      <div className={styles.agregarCategoria}>
        <input
          type="text"
          placeholder="Título de la Categoría"
          value={nuevaCategoria.titulo}
          onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, titulo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción de la Categoría"
          value={nuevaCategoria.descripcion}
          onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, imagen: e.target.files[0] })}
        />
        <button onClick={agregarCategoria}>Agregar Categoría</button>
      </div>
      <ul className={styles.listaCategorias}>
        {categorias.map((categoria, indice) => (
          <li key={indice}>
            <h3>{categoria.titulo}</h3>
            <p>{categoria.descripcion}</p>
            <img src={URL.createObjectURL(categoria.imagen)} alt={`Imagen de ${categoria.titulo}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdministrarCategorias;
