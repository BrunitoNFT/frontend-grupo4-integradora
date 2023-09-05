import React, { useContext, useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../DropTheBass.png";
import { DataContext } from "../Context/DataContext";
import { AiFillSetting } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

function getInitials(name, lastName) {
  if (!name || !lastName) return "";

  const initials = `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  return initials;
}

const Navbar = () => {
  const { user, setUser } = useContext(DataContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch("http://18.118.140.140/users")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        console.log('AQUIIIII', userData);
      })
      .catch((error) => {
        console.error("Error al obtener datos del usuario:", error);
      });
  }, []);

  const handleLogout = () => {
    try {
      setUser({});
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
    
    <div className={styles.navContainer}>
      <nav className={styles.navbar}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="logoDropBass" />
        </Link>

        {/* <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <FiSearch />
          </button>
        </div> */}

        <div className={styles.navbarIcons}>
          {JSON.stringify(user) === "{}" ? (
            <>
            <button className={styles.RegisterBox}>
              <Link className="Register" to={"/register"}>
                Crear cuenta
              </Link>
            </button>

            <button className={styles.LoginBox}>
              <Link className={styles.Login} to={"/login"}>
                Iniciar sesión
              </Link>
            </button>

            <Link className={styles.seeCarrito} to={"/cart"}>
              <BsCartCheck color="whitesmoke"/>
            </Link>
          </>
          ) : (
            <div className={styles.navbarAvatar}>
              <div className={styles.avatar}>
                {getInitials(userData.name, userData.lastName)}
              </div>
              <Link className={styles.Admin} to={"/paneladmin"}>
                <AiFillSetting color="D8C4B6" size={25}/>
              </Link>
              <button className={styles.LoginBox} onClick={handleLogout}>
                Cerrar sesión
              </button>
              <Link className={styles.seeCarrito} to={"/cart"}>
                <BsCartCheck color="whitesmoke"/>
              </Link>
            </div>
          )}
        </div>

        <div className={styles.BurgerButton}>
          <FiMenu color="D8C4B6"/>
        </div>
      </nav>

      <div className={styles.navbarBoxes}>
        <Link className={styles.linksNavbar} to={"/Favoritos"}>
          Favoritos
        </Link>
        <Link className={styles.linksNavbar} to={"/Productos"}>
          Productos
        </Link>
        <Link className={styles.linksNavbar} to={"/politicas"}>
          Politicas
        </Link>
      </div>
    </div>
    
    </>
  );
};

export default Navbar;
