import React, { useState, useEffect } from 'react';
import styles from './panelUsuarios.module.css'; // Importa los estilos

const PanelUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://18.118.140.140/users");
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          console.error('Error al obtener los usuarios');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.panelUsuarios}>
      <h1 className={styles.panelTitle}>Panel de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <table className={styles.usuarioTable}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Administrador</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.name}</td>
              <td>{usuario.lastname}</td>
              <td>{usuario.email}</td>
              <td>{usuario.isAdmin ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PanelUsuarios;
