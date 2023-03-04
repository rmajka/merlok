import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import merlokLogo from "../../assets/merlok-logo.png";
import userLogo from "../../assets/user-logo.svg";
import bagLogo from "../../assets/bag-logo.svg";
import heartLogo from "../../assets/heart-logo.svg";
import fillHeartLogo from "../../assets/heart-fill-logo.svg";
import Buscador from "../buscador/Buscador";
import Hamburger from "../hamburger/Hamburger";

export default function Navbar({ productos, carrito, setElementoBuscado }) {
  const [openSideBar, setOpenSidebar] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  //sum elements in carrito
  const sumCarrito = carrito
    .map((item) => item.bagCuantity)
    .reduce((prev, curr) => prev + curr, 0);
  //close sedebar when width bigger than 780px, it used to set links styles
  useEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    if (innerWidth > 780) {
      setOpenSidebar(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  //navegate used on click
  const navigate = useNavigate();
  return (
    <nav className={styles.navbar}>
      <img
        src={merlokLogo}
        className={styles.logo}
        onClick={() => navigate("/")}
        alt="merlok"
      />
      {/*search bar*/}
      <Buscador setElementoBuscado={setElementoBuscado} />
      <ul className={openSideBar ? styles.open : styles.linksContainer}>
        <Link
          className={styles.link}
          to="/"
          onClick={() => setOpenSidebar(false)}
        >
          Home
        </Link>
        <Link
          className={styles.link}
          to="/productos"
          onClick={() => setOpenSidebar(false)}
        >
          Productos
        </Link>
        <Link
          className={styles.link}
          to="/estancias"
          onClick={() => setOpenSidebar(false)}
        >
          Estancias
        </Link>
        <Link
          className={styles.link}
          to="/mejores-precios"
          onClick={() => setOpenSidebar(false)}
        >
          Mejores precios
        </Link>
        <Link
          className={styles.link}
          to="/novedades"
          onClick={() => setOpenSidebar(false)}
        >
          Novedades
        </Link>
        <Link className={styles.closeBtn} onClick={() => setOpenSidebar(false)}>
          cerrar
        </Link>
      </ul>
      {openSideBar && (
        <div
          className={styles.coverContainer}
          onClick={() => setOpenSidebar(false)}
        ></div>
      )}
      <div className={styles.btnsContainer}>
        <Link to="/login" className={styles.usuarioBtn}>
          <img src={userLogo} className={styles.imgLogo} alt="usuario" />
          <span className={styles.usuarioBtnSpan}>
            Inicia sesión o regístrate
          </span>
        </Link>
        <Link to="/favoritos" className={styles.favLink}>
          <img
            src={
              productos.some((item) => item.isFavourite === true)
                ? fillHeartLogo
                : heartLogo
            }
            className={styles.imgLogo}
            alt="favoritos"
          />
        </Link>
        <Link to="/carrito" className={styles.carritoLink}>
          <img src={bagLogo} className={styles.imgLogo} alt="carrito" />
          {sumCarrito !== 0 && (
            <span className={styles.contador}>{sumCarrito}</span>
          )}
        </Link>
        <Hamburger setOpenSidebar={setOpenSidebar} />
      </div>
      <hr className={styles.hr} />
    </nav>
  );
}
