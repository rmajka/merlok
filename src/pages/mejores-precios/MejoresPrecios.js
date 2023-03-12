import styles from "./MejoresPrecios.module.css";
import { useEffect } from "react";
import ProductoItem from "../../components/producto-item/PtoductoItem";

export default function MejoresPrecios({
  productos,
  setProductos,
  carrito,
  setCarrito,
  setAbrirPresentacion,
}) {
  //change the title
  useEffect(() => {
    document.title = "Merlok - Mejores precios";
    window.scrollTo(0, 0);
  }, []);
  //sorted by price items
  let sortedItems = [];

  let sorted = productos.sort(function (a, b) {
    return a.price - b.price;
  });
  sortedItems = sorted.map((item, index) => {
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
      <h1 className={styles.header}>
        Precios imbatibles para los mejores productos del hogar
      </h1>
      <div className={styles.productContainer}>{sortedItems}</div>
    </section>
  );
}
