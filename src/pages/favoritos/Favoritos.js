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
      <h1>Tus artículos favoritos</h1>
      <div>{favoritos}</div>
    </section>
  );
}
