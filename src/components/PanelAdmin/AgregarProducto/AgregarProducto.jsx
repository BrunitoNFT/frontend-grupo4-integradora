import React, { useState, useEffect } from 'react';

function AgregarProductos() {
  const [name, setName] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [brands, setBrands] = useState([]);
  const [marcasDisponibles, setMarcasDisponibles] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Obtener categorías usando fetch
    fetch("http://18.118.140.140/categories")
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error al obtener categorías:', error));

    // Obtener marcas usando fetch
    fetch("http://18.118.140.140/brand")
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
    formData.append('stock', stock);
    formData.append('categoria', categoria);
    brands.forEach(brand => formData.append('brands', brand));
    imagenes.forEach((imagen, index) => formData.append(`imagen-${index}`, imagen));

    try {
      const response = await fetch("http://18.118.140.140/product", {
        method: 'POST',
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
    <div>
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
        <label>Stock:</label>
        <input type="number" value={stock} onChange={e => setStock(e.target.value)} />
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
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto, index) => (
          <li key={index}>
            <strong>{producto.name}</strong> - {producto.descripcion} - ${producto.price} - Stock: {producto.stock}
            - Categoría: {producto.categoria} - Marcas: {producto.brands.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgregarProductos;
