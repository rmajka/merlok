import styles from "./ProductoItem.module.css";
import buyLogo from "../../assets/buy-logo.svg";
import heartLogo from "../../assets/heart-logo.svg";
import heartFillLogo from "../../assets/heart-fill-logo.svg";
import doneLogo from "../../assets/done-logo.svg";
import { useState } from "react";

export default function PtoductoItem({
  producto,
  setAbrirPresentacion,
  carrito,
  setCarrito,
  setProductos,
  productos,
}) {
  //show done logo
  const [showDone, setShowDone] = useState(false);

  //add to favourite
  function agregarAlFavorito() {
    producto.isFavourite = !producto.isFavourite;
    setProductos([...productos]);
  }

  //add to carrito
  function agregarAlCarrito() {
    //set show icon add
    setShowDone(true);
    setTimeout(() => {
      setShowDone(false);
    }, 300);

    //empty carrito
    if (carrito.length === 0) {
      producto.bagCuantity = 1;
      setCarrito([producto]);
      console.log("frist in carrito");
      return;
    }
    //update item in carrito
    if (carrito.some((obj) => obj.id === producto.id)) {
      const updatedItems = [...carrito];
      const index = carrito.indexOf(producto);
      updatedItems[index].bagCuantity++;
      setCarrito(updatedItems);
      console.log("in carrito, updating");
      return;
    }
    //add new item to carrito
    if (carrito.some((obj) => obj.id !== producto.id)) {
      const newItem = producto;
      newItem.bagCuantity = 1;
      setCarrito([...carrito, newItem]);
      console.log("new in carrito");
      return;
    }
  }
  return (
    <div className={styles.container}>
      <img
        src={producto.img}
        className={styles.img}
        alt="producto merlok"
        onClick={() =>
          setAbrirPresentacion({ abrir: true, elemento: producto })
        }
      />
      {producto.isNew && <span className={styles.isNew}>NOVEDAD</span>}
      <span className={styles.productName}>{producto.productName}</span>
      <p className={styles.productDescription}>{producto.description}</p>
      <span className={styles.productPrice}>{producto.price}€</span>
      <div>
        <img
          src={producto.isFavourite ? heartFillLogo : heartLogo}
          className={styles.favLogo}
          onClick={agregarAlFavorito}
          alt="compra en merlok"
        />
        <img
          src={showDone ? doneLogo : buyLogo}
          className={styles.buyLogo}
          onClick={agregarAlCarrito}
          alt="compra en merlok"
        />
      </div>
    </div>
  );
}
