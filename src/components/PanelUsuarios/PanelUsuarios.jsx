import React, { useState, useEffect } from 'react';
import styles from './panelUsuarios.module.css';

const PanelUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://18.118.140.140/users");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
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

  const handleMakeAdmin = async (email) => {
    console.log('Intentando promover a administrador con correo:', email);
  
    try {
      const response = await fetch(`http://18.118.140.140/administracion/promote?emailUser=${email}`, {
        method: 'POST',
        mode: "no-cors",
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Respuesta del servidor:', response);
  
      if (response.ok) {
        // ... Tu código para actualizar el estado ...
        console.log(`Usuario con correo ${email} promovido a administrador.`);
      } else {
        const errorData = await response.text(); // Obtén detalles del error si están disponibles
        console.error('Error al promover al usuario a administrador:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
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
            <th></th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map((usuario, index) => (
            <tr key={index}>
              <td>
                <div
                  className={usuario.role === "ROLE_ADMIN" ? styles.greenLight : styles.blackLight}
                ></div>
              </td>
              <td>{usuario.name}</td>
              <td>{usuario.lastname}</td>
              <td>{usuario.email}</td>
              <td>
                {usuario.role === "ROLE_USER" && (
                 <button className={styles.adminButton} onClick={() => handleMakeAdmin(usuario.email)}>
                 Dar Permisos
               </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PanelUsuarios;
