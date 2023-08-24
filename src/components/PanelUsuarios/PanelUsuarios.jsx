import React, { useState, useCallback } from 'react';
import styles from './panelUsuarios.module.css';

const AdminPermissions = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'Julio', isAdmin: false },
    { id: 2, username: 'Alberto', isAdmin: true },
    { id: 3, username: 'Shazam', isAdmin: false },
    { id: 4, username: 'Matias', isAdmin: false },
    { id: 5, username: 'Roberto', isAdmin: false },
    { id: 6, username: 'Roberto', isAdmin: false },
    { id: 7, username: 'Roberto', isAdmin: false },
    { id: 8, username: 'Roberto', isAdmin: false },
    { id: 9, username: 'Roberto', isAdmin: false },
    { id: 10, username: 'Roberto', isAdmin: false },
    { id: 11, username: 'Roberto', isAdmin: false },
    { id: 12, username: 'Roberto', isAdmin: false },
    { id: 13, username: 'Roberto', isAdmin: false },
    { id: 14, username: 'Roberto', isAdmin: false },
    { id: 15, username: 'Roberto', isAdmin: false },
    { id: 16, username: 'Roberto', isAdmin: false },
    { id: 17, username: 'Roberto', isAdmin: false },
    { id: 18, username: 'Roberto', isAdmin: false },
    { id: 19, username: 'Roberto', isAdmin: false },
    { id: 20, username: 'Carlos', isAdmin: false },
    { id: 21, username: 'Epitafio', isAdmin: false },
    { id: 22, username: 'Roberto', isAdmin: false },
    { id: 23, username: 'Roberto', isAdmin: false },
  ]);

  const [confirmUserId, setConfirmUserId] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  const handlePermissionChange = useCallback(
    (userId) => {
      setConfirmUserId(userId);
    },
    []
  );

  const handleConfirmation = useCallback(() => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === confirmUserId ? { ...user, isAdmin: !user.isAdmin } : user
      )
    );
    setConfirmUserId(null);
  }, [confirmUserId]);

  const handleCancel = useCallback(() => {
    setConfirmUserId(null);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filterUsers = (users) => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return users
      .filter(user =>
        user.username.toLowerCase().includes(searchValue.toLowerCase())
      )
      .slice(startIndex, endIndex);
  };

  return (
    <div className={styles.adminPermissions}>
      <h2>Administración de Permisos</h2>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <ul className={styles.userList}>
        {filterUsers(users).map((user) => (
          <li key={user.id} className={styles.userItem}>
            {user.isAdmin && <span className={styles.adminIndicator}></span>}
            <span>{user.username}</span>
            <label className={styles.toggleLabel}>
              {user.isAdmin ? (
                <button onClick={() => handlePermissionChange(user.id)}>Quitar administrador</button>
              ) : (
                <button onClick={() => handlePermissionChange(user.id)}>Hacer administrador</button>
              )}
            </label>
            {confirmUserId === user.id && (
              <div className={styles.confirmationBox}>
                <p>¿Estás seguro que quieres cambiar los permisos de {user.username}?</p>
                <button onClick={handleConfirmation}>Sí</button>
                <button onClick={handleCancel}>Cancelar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? styles.activePage : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminPermissions;
