import React, { useState, useEffect } from 'react';

const PanelUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

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

  return (
    <div>
      <h1>Panel de Usuarios</h1>
      <ul>
        {usuarios.map((usuario, index) => (
          <li key={index}>
            <p>Nombre: {usuario.name}</p>
            <p>Apellido: {usuario.lastname}</p>
            <p>Email: {usuario.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelUsuarios;
