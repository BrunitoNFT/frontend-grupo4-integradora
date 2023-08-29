import React, { useState, useEffect } from 'react';
import estilos from './productos.module.css';

const categorias = ['Electrónica', 'Ropa', 'Hogar', 'Deportes'];

const Productos = ({ setProductosFiltrados }) => {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [productos, setProductos] = useState([])
  
  async function fetchProductos() {
    const response = await fetch('http://18.118.140.140/product')
    const jsonData = await response.json()
    setProductos(jsonData)
  }

  useEffect(() => {
    fetchProductos()
  }, [])

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
  
  console.log("PRODUCTOS", productos);

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
        <div>
          <ul>
            {productos.map((producto) => (
              <li key={producto.id}>
                <img src={producto.urlImg} alt="imagenProducto" />
                <div>{producto.name}</div>
                <div>$ {producto.price}</div>
              </li>
            ))}
          </ul>
      </div>
    </div> 
    </div>
  );
};

export default Productos;
