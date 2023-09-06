import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./galeria.module.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const GaleriaImg = () => {
  const { id } = useParams();
  console.log("/Galeria:", id);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("No se pudo cargar el archivo JSON");
        }
        const productsData = await response.json();
        const foundProduct = productsData.find(
          (product) => product.id.toString() === id
        );

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error al cargar los datos", error);
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  // Crear un array de imágenes a partir de las propiedades img1, img2, img3, etc.
  const imagenes = Object.keys(product)
    .filter((key) => key.startsWith("img"))
    .map((key) => product[key]);

  return (
    <section className={styles.gallery}>
      <h1>Galería de Imágenes</h1>
      <div className={styles.galleryContainer}>
        {imagenes.map((imagen, index) => (
          <img
            className={styles.imagenes}
            key={index}
            src={imagen}
            alt={`Imagen ${index + 1}`}
          />
        ))}
      </div>
      <Link className={styles.aVolverDetalle} to={"/detalle/" + product.id}><BsFillArrowLeftCircleFill color='#214F55' size={40}/></Link>
    </section>
  );
};

export default GaleriaImg;
