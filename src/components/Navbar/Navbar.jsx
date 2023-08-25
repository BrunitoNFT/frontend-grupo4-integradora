import React, { useContext } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import logo from "../../DropTheBass.png";
import { DataContext } from "../Context/DataContext";
import { AiFillSetting } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";

const Navbar = () => {
  const { user, setUser } = useContext(DataContext);

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
                <BsCartCheck />
              </Link>
            </>
          ) : (
              <div className={styles.navbarAvatar}>

                <div className={styles.avatar}>{user.name}</div>
                
                <Link className={styles.Admin} to={"/paneladmin"}>
                  <AiFillSetting />
                </Link>

                <button
                  className={styles.LoginBox}
                  onClick={(e) => setUser({})}
                >
                  Cerrar sesión
                </button>

                <Link className={styles.seeCarrito} to={"/cart"}>
                  <BsCartCheck />
                </Link>

              </div>
          )}
        </div>



        <div className={styles.BurgerButton}>
          <FiMenu />
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
