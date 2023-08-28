import React, { useContext } from "react";
import styles from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../DropTheBass.png";
import { DataContext } from "../Context/DataContext";
import { AiFillSetting } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";

function getInitials(mail) {
  const initial = mail.charAt(0).toUpperCase();
  return initial;
}

const Navbar = () => {
  const { user, setUser } = useContext(DataContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    try {
      setUser({});
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className={styles.navContainer}>
      <nav className={styles.navbar}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="logoDropBass" />
        </Link>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <FiSearch />
          </button>
        </div>

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
                  {getInitials(user.email)}
                </div>
                
                <Link className={styles.Admin} to={"/paneladmin"}>
                  <AiFillSetting color="D8C4B6" size={25}/>
                </Link>

                <button
                  className={styles.LoginBox}
                  onClick={handleLogout}
                >
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
        <Link className={styles.linksNavbar} to={"/Novedades"}>
          Novedades
        </Link>
        <Link className={styles.linksNavbar} to={"Productos"}>
          Productos
        </Link>
        <Link className={styles.linksNavbar} to={"Contacto"}>
          Contacto
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
