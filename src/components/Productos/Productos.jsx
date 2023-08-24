import React, { useState, useEffect } from 'react';
import estilos from './productos.module.css';

const categorias = ['Electrónica', 'Ropa', 'Hogar', 'Deportes'];

const Productos = ({ setProductosFiltrados }) => {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Hacer la solicitud fetch al archivo JSON
    fetch('/data.json') // Ajusta la ruta según la ubicación de tu archivo JSON
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const manejarCambioCategoria = (categoria) => {
    if (categoriasSeleccionadas.includes(categoria)) {
      setCategoriasSeleccionadas(categoriasSeleccionadas.filter(cat => cat !== categoria));
    } else {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
    }
  };

  const filtrarProductos = () => {
    if (categoriasSeleccionadas.length === 0) {
      setProductosFiltrados(productos);
    } else {
      const filtrados = productos.filter(producto => categoriasSeleccionadas.includes(producto.categoria));
      setProductosFiltrados(filtrados);
    }
  };

  return (
    <div className={estilos.filtroProductos}>
      <h2>Filtrar por Categoría</h2>
      <div className={estilos.listaCategorias}>
        {categorias.map(categoria => (
          <label key={categoria} className={estilos.etiquetaCategoria}>
            <input
              type="checkbox"
              checked={categoriasSeleccionadas.includes(categoria)}
              onChange={() => manejarCambioCategoria(categoria)}
            />
            {categoria}
          </label>
        ))}
      </div>
      <button onClick={filtrarProductos}>Aplicar Filtros</button>
      <button onClick={() => setCategoriasSeleccionadas([])}>Limpiar Filtros</button>

      <div className={estilos.listaProductos}>
      <h2>Lista de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Caracteristicas</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.objeto}</td>
              <td>{producto.categoria}</td>
              <td>{producto.marca}</td>
              <td>{producto.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Productos;
