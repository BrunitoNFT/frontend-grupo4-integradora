import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdministrarCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`http://18.118.140.140/categories`);
      if (response.ok) {
        const categoriasData = await response.json();
        setCategorias(categoriasData);
      } else {
        console.error('Error al obtener las categorías');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleCategoriaChange = (event) => {
    setNuevaCategoria(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nuevaCategoriaData = {
      name: nuevaCategoria
    };

    try {
      const response = await fetch(`http://18.118.140.140/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaCategoriaData)
      });

      if (response.ok) {
        console.log('Nueva categoría creada exitosamente');
        setNuevaCategoria('');
        fetchCategorias();
      } else {
        console.error('Error al crear la categoría');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleEditClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setNuevaCategoria(categoria.name);
  };

  const handleDeleteClick = async (categoriaId) => {
    try {
      const response = await fetch(`http://18.118.140.140/categories/${categoriaId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('Categoría eliminada exitosamente');
        fetchCategorias();
      } else {
        console.error('Error al eliminar la categoría');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleUpdateClick = async () => {
    const updatedCategoria = {
      id: categoriaSeleccionada.id,
      name: nuevaCategoria
    };

    try {
      const response = await fetch(`http://18.118.140.140/categories/${categoriaSeleccionada.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCategoria)
      });

      if (response.ok) {
        console.log('Categoría actualizada exitosamente');
        setCategoriaSeleccionada(null);
        setNuevaCategoria('');
        fetchCategorias();
      } else {
        console.error('Error al actualizar la categoría');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <h2>Administrar Categorías</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nueva Categoría:
          <input type="text" value={nuevaCategoria} onChange={handleCategoriaChange} />
        </label>
        <button type="submit">Crear Categoría</button>
      </form>
      <h3>Listado de Categorías</h3>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            {categoria.name}
            <button onClick={() => handleEditClick(categoria)}>
              <FaEdit />
            </button>
            <button onClick={() => handleDeleteClick(categoria.id)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      {categoriaSeleccionada && (
        <div>
          <h3>Editar Categoría</h3>
          <input type="text" value={nuevaCategoria} onChange={handleCategoriaChange} />
          <button onClick={handleUpdateClick}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
};

export default AdministrarCategorias;
