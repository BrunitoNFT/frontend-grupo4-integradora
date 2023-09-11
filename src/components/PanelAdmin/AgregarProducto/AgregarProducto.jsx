import React, { useState, useEffect } from 'react';
import styles from './agregarProducto.module.css';

function AgregarProductos() {
  const [name, setName] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [price, setPrice] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [brands, setBrands] = useState([]);
  const [marcasDisponibles, setMarcasDisponibles] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [productos, setProductos] = useState([]);

  let token = localStorage.getItem("jwtToken")

  useEffect(() => {
    // Obtener categorías usando fetch
    fetch("http://18.118.140.140/categories")
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error al obtener categorías:', error));

    // Obtener caracteristicas usando fetch
    fetch("http://18.118.140.140/features")
      .then(response => response.json())
      .then(data => setMarcasDisponibles(data))
      .catch(error => console.error('Error al obtener marcas:', error));
  }, []);

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes(files);
  };

  const crearProducto = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('descripcion', descripcion);
    formData.append('price', price);
    formData.append('categoria', categoria);
    brands.forEach(brand => formData.append('brands', brand));
    imagenes.forEach((imagen, index) => formData.append(`imagen-${index}`, imagen));

    try {
      const response = await fetch("http://18.118.140.140/product", {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`},
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setProductos([...productos, data]);
        alert(`Producto '${name}' creado exitosamente!`);
      } else {
        alert('Hubo un error al crear el producto.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Hubo un error al crear el producto.');
    }
  };

  const toggleMarca = (brandId) => {
    if (brands.includes(brandId)) {
      setBrands(brands.filter(item => item !== brandId));
    } else {
      setBrands([...brands, brandId]);
    }
  };

  return (
    <div className={styles.agregarProducto}>
      <h1>Agregar Productos</h1>
      <div>
        <label>Nombre:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Descripción:</label>
        <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Categoría:</label>
        <select value={categoria} onChange={e => setCategoria(e.target.value)}>
  <option value="">Selecciona una categoría</option>
  {categorias.map((cat) => (
    <option key={cat.id} value={cat.id}>{cat.name}</option>
  ))}
</select>
      </div>
      <div>
  <label>Marcas:</label>
  {marcasDisponibles.map((brand) => (
    <div key={brand.id}>
      <input
        type="checkbox"
        value={brand.id}
        name={`brand-${brand.id}`}
        checked={brands.includes(brand.id)}
        onChange={() => toggleMarca(brand.id)}
      />
      <label>{brand.name}</label>
    </div>
  ))}
</div>
      <div>
        <label>Imágenes:</label>
        <input type="file" multiple onChange={handleImagenesChange} />
      </div>
      <button onClick={crearProducto}>Crear Producto</button>
    </div>
  );
}

export default AgregarProductos;
