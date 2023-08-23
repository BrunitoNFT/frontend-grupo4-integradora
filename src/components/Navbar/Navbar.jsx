import React from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import logo from '../../DropTheBass.png'


const Navbar = () => {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.navbar}>

      <Link to='/'>
        <img className={styles.logo} src={logo} alt="logoDropBass" />
    </Link>
      
      
       
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              class="bi bi-search" 
              viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
          </button>
        </div>

        <div className={styles.navbarIcons}>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              color="white"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-cart-check"
              viewBox="0 0 16 16"
            >
              <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </Link>
        </div>
        <div className={styles.BurgerButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
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
