import React from 'react';
import styles from './galeria.module.css';

const GaleriaImg = () => {
  
  return (
    <>
    <div className={styles.galleryContainer}>
      <div className={styles.mainImage}>
        <img src="imagen_principal.jpg" alt="Imagen Principal" />
      </div>

      <div className={styles.imageGrid}>
        <div className={styles.additionalImage}>
          <img src="imagen_2.jpg" alt="Imagen 2" />
        </div>
        <div className={styles.additionalImage}>
          <img src="imagen_3.jpg" alt="Imagen 3" />
        </div>
        <div className={styles.additionalImage}>
          <img src="imagen_4.jpg" alt="Imagen 4" />
        </div>
        <div className={styles.additionalImage}>
          <img src="imagen_5.jpg" alt="Imagen 5" />
        </div>
      </div>
    </div>
    
    <button className={styles.verMas}>
      <a href="/" className={styles.viewMoreLink}>Ver más</a>
    </button> 
    </>
  );
};

export default GaleriaImg;