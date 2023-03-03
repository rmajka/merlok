import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import merlokLogo from "../../assets/merlok-logo.png";
import userLogo from "../../assets/user-logo.svg";
import bagLogo from "../../assets/bag-logo.svg";
import heartLogo from "../../assets/heart-logo.svg";
import fillHeartLogo from "../../assets/heart-fill-logo.svg";
import Buscador from "../buscador/Buscador";
import Hamburger from "../hamburger/Hamburger";

export default function Navbar({ productos, carrito, setElementoBuscado }) {
  //sum elements in carrito
  const sumCarrito = carrito
    .map((item) => item.bagCuantity)
    .reduce((prev, curr) => prev + curr, 0);

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
      <Buscador setElementoBuscado={setElementoBuscado} />
      <ul className={styles.linksContainer}>
        <Link to="/">Home</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/estancias">Estancias</Link>
        <Link to="/mejores-precios">Mejores precios</Link>
        <Link to="/novedades">Novedades</Link>
      </ul>
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
        <Hamburger />
      </div>
      <hr className={styles.hr} />
    </nav>
  );
}
