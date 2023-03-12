import styles from "./Favoritos.module.css";
import { useEffect } from "react";
import ProductoItem from "../../components/producto-item/PtoductoItem";

export default function Favoritos({
  productos,
  setProductos,
  carrito,
  setCarrito,
  setAbrirPresentacion,
}) {
  //change the title
  useEffect(() => {
    document.title = "Merlok - Favoritos";
    window.scrollTo(0, 0);
  }, []);
  //filter favourites
  const fav = productos.filter((item) => item.isFavourite);
  const favoritos = fav.map((item, index) => {
    return (
      <ProductoItem
        producto={item}
        productos={productos}
        setProductos={setProductos}
        carrito={carrito}
        setCarrito={setCarrito}
        setAbrirPresentacion={setAbrirPresentacion}
        key={index}
      />
    );
  });
  return (
    <section className={styles.container}>
      <h1 className={styles.header}>Tus artículos favoritos</h1>
      <div className={styles.favContainer}>{favoritos}</div>
    </section>
  );
}
