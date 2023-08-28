import React, { useState } from 'react';
import styles from './administrarCategorias.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

  const editarCategoria = (indice, nuevosDatos) => {
    const nuevasCategorias = [...categorias];
    nuevasCategorias[indice] = nuevosDatos;
    setCategorias(nuevasCategorias);
  };

  const eliminarCategoria = (indice) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
    if (confirmacion) {
      const nuevasCategorias = [...categorias];
      nuevasCategorias.splice(indice, 1);
      setCategorias(nuevasCategorias);
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
      <table className={styles.listaCategorias}>
  <tbody>
    {categorias.map((categoria, indice) => (
      <tr key={indice}>
        <td className={styles.titulo}>
          {categoria.titulo}
        </td>
        <td className={styles.descripcion}>
          {categoria.descripcion}
        </td>
        <td className={styles.img}>
          <img src={URL.createObjectURL(categoria.imagen)} alt={`Imagen de ${categoria.titulo}`} />
        </td>
        <td className={styles.Icons}>
                <div className={styles.iconContainer}>
                  <div onClick={() => editarCategoria(indice, categoria)} className={styles.iconDiv}>
                    <FaEdit />
                  </div>
                  <div onClick={() => eliminarCategoria(indice)} className={styles.iconDiv}>
                    <FaTrash />
                  </div>
                </div>
              </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
    
  );
};

export default AdministrarCategorias;
