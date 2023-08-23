import React, { useState } from 'react';
import AgregarProducto from './AgregarProducto';
import ListaProductos from './ListaProductos';
import AdministrarCaracteristicas from './AdministrarCaracteristicas';
import AdministrarCategorias from './AdministrarCategorias';
import styles from './panelAdministracion.module.css';

const AdministracionPanel = () => {
  const [mostrarAgregarProducto, setMostrarAgregarProducto] = useState(false);
  const [mostrarListaProductos, setMostrarListaProductos] = useState(false);
  const [mostrarAdminCaracteristicas, setMostrarAdminCaracteristicas] = useState(false);
  const [mostrarAdminCategorias, setMostrarAdminCategorias] = useState(false);

  const handleMostrarAgregarProducto = () => {
    setMostrarAgregarProducto(true);
    setMostrarListaProductos(false);
    setMostrarAdminCaracteristicas(false);
    setMostrarAdminCategorias(false); 
  };

  const handleMostrarListaProductos = () => {
    setMostrarAgregarProducto(false);
    setMostrarListaProductos(true);
    setMostrarAdminCaracteristicas(false);
    setMostrarAdminCategorias(false); 
  };

  const handleMostrarAdminCaracteristicas = () => {
    setMostrarAgregarProducto(false);
    setMostrarListaProductos(false);
    setMostrarAdminCaracteristicas(true);
    setMostrarAdminCategorias(false);
  };

  const handleMostrarAdminCategorias = () => {
    setMostrarAgregarProducto(false);
    setMostrarListaProductos(false);
    setMostrarAdminCaracteristicas(false);
    setMostrarAdminCategorias(true);
  };

  return (
    <>
      <div className={styles.adminPanel}>
        <h1>Panel de Administración</h1>
        <nav className={styles.adminMenu}>
          <ul>
            <li><a href="#" onClick={handleMostrarListaProductos}>Lista de Productos</a></li>
            <li><a href="#" onClick={handleMostrarAgregarProducto}>Agregar Producto</a></li>
            <li><a href="#" onClick={handleMostrarAdminCaracteristicas}>Administrar Características</a></li>
            <li><a href="#" onClick={handleMostrarAdminCategorias}>Administrar Categorías</a></li>
          </ul>
        </nav>

        {mostrarAgregarProducto && <AgregarProducto />}
        {mostrarListaProductos && <ListaProductos />}
        {mostrarAdminCaracteristicas && <AdministrarCaracteristicas />}
        {mostrarAdminCategorias && <AdministrarCategorias />}
      </div>

      <div className={styles.adminCartel}>
        <p>Pantalla no disponible en dispositivo móvil</p>
      </div>
    </>
  );
};

export default AdministracionPanel;
