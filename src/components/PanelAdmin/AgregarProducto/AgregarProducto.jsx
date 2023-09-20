import React, { useState, useEffect } from 'react';
import styles from './agregarProducto.module.css';

function AgregarProductos() {
  const [name, setName] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [price, setPrice] = useState(0.00);
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [features, setFeatures] = useState([]);
  const [featuresElegidas, setFeaturesElegidas] = useState([]);
  const featuresArray = featuresElegidas.map(feature => ({ id: `${feature}`}));
  const [invocarCreacion, setInvocarCreacion] = useState(false)

  let stock = '3';
  let token = sessionStorage.getItem("jwtToken")

  useEffect(() => {
    // Obtener categorías usando fetch
    fetch("http://18.118.140.140/categories")
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error al obtener categorías:', error));

    // Obtener caracteristicas usando fetch
    fetch("http://18.118.140.140/brand")
      .then(response => response.json())
      .then(data => setBrands(data))
      .catch(error => console.error('Error al obtener marcas:', error));
  }, []);

  useEffect(() => {
    fetch("http://18.118.140.140/features")
      .then(response => response.json())
      .then(data => setFeatures(data))
      .catch(error => console.error('Error al obtener categorías:', error));
  }, []);

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes(files);
  };

  useEffect(()=>{
    const crearProducto = async () => {
      try {
        const response = await fetch("http://18.118.140.140/product", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            description: descripcion,
            price: price,
            stock: stock,
            brand: {
              "id": brand
            },
            category: {
              "id": categoria
            },
            features: featuresArray
            
          })
        });
        if (response.ok) {
          const data = await response.json();
          setProductos([...productos, data]);
          alert(`Producto '${name}' creado exitosamente!`);
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Hubo un error al crear el producto.');
      }
    };
    
    if (invocarCreacion) {
      crearProducto();
    }
  }, [invocarCreacion])

  const toggleFeatureElegidas = (featureId) => {
    if (featuresElegidas.includes(featureId)) {
      setFeaturesElegidas(featuresElegidas.filter(item => item !== featureId));
    } else {
      setFeaturesElegidas([...featuresElegidas, featureId]);
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
        <select value={brand} onChange={e => setBrand(e.target.value)}>
          <option value="">Selecciona una marca</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
      </div>
      <div className={styles.featuresFather}>
        <label>Características:</label>
        {features.map((feature) => (
          <div className={styles.features} key={feature.id}>
            <span>{feature.name}</span>
            <input
              type="checkbox"
              value={feature.name}
              name={`feature-${feature.id}`}
              checked={featuresElegidas.includes(feature.id)}
              onChange={() => toggleFeatureElegidas(feature.id)}
            />
          </div>
        ))}
      </div>
      <div>
        <label>Imágenes:</label>
        <input type="file" multiple onChange={handleImagenesChange} />
      </div>
      <button onClick={()=>setInvocarCreacion(true)}>Crear Producto</button>
    </div>
  );
}

export default AgregarProductos;
