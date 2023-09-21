import React, { useContext, useState } from "react";
import styles from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../DropTheBass.png";
import { DataContext } from "../Context/DataContext";
import { AiFillSetting } from "react-icons/ai";
import { BsBookmarkCheck } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";


const Navbar = () => {
  let token = localStorage.getItem("jwtToken")
  let avatar = localStorage.getItem("firstLetterNameAndLastname")
  const { user, setUser } = useContext(DataContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://18.118.140.140/auth/logout", {
        method: "GET",
        headers: {
          "authorization": `Bearer ${token}`,
          "content-type": 'application/json; charset=UTF-8',
          "mode":'no-cors'
        }
      })
      if (response.ok) {
        localStorage.removeItem("jwtToken")
        localStorage.removeItem("firstLetterNameAndLastname")
        localStorage.removeItem("favoritos")
        localStorage.removeItem("name")
        localStorage.removeItem("lastname")
        localStorage.removeItem("email")
        setUser({});
        navigate("/login");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (option === "admin") {
      window.location.href = "/paneladmin";
    } else if (option === "usuarios") {
      window.location.href = "/panelusuarios";
    }
  };

  return (
      <div className={styles.navContainer}>
        <nav className={styles.navbar}>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="logoDropBass" />
          </Link>

          <button className={styles.BurgerButton}>
            <FiMenu color="D8C4B6" size={28} />
          </button>

          <div className={styles.navbarIcons}>
            {JSON.stringify(user) === "{}" && token === null ? (
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
              <Link className={styles.seeCarrito} to={"/reservas"}>
                <BsBookmarkCheck color="whitesmoke" />
              </Link>
            </>
            ) : (
              <>
              <div className={styles.navbarAvatar}>
                <div className={styles.SelectWrapper}>
                  <div
                    className={`${styles.Select} ${isOpen ? styles.Open : ""}`}
                    onClick={toggleSelect}
                    >
                    <AiFillSetting color="D8C4B6" size={30}/>
                  </div>
                  {isOpen && (
                    <ul className={styles.OptionList}>
                      <li className={styles.OptionListLi} onClick={() => handleOptionClick("admin")}>Panel Administrador</li>
                      <li className={styles.OptionListLi} onClick={() => handleOptionClick("usuarios")}>Panel Usuarios</li>
                    </ul>
                  )}
                </div>
                <div className={styles.avatarLogout}>
                <div className={styles.avatar}>
                  {avatar}
                </div>
                <button className={styles.LoginBox} onClick={handleLogout}>
                  Cerrar sesión
                </button>
                </div>
                <Link className={styles.seeCarrito} to={"/reservas"}>
                  <BsBookmarkCheck color="whitesmoke" />
                </Link>
              </div>
              </>

            )}
          </div>

          
        </nav>

        <div className={styles.navbarBoxes}>
          <Link className={styles.linksNavbar} to={"/Favoritos"}>
            Favoritos
          </Link>
          <Link className={styles.linksNavbar} to={"/Productos"}>
            Productos
          </Link>
        </div>
      </div>
  );
};

export default Navbar;
