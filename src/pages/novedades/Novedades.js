import styles from "./Novedades.module.css";
import { useEffect } from "react";
import PtoductoItem from "../../components/producto-item/PtoductoItem";

export default function Novedades({
  productos,
  setProductos,
  carrito,
  setCarrito,
  setAbrirPresentacion,
}) {
  //change the title
  useEffect(() => {
    document.title = "Merlok - Novedades";
  }, []);
  //only new items
  const onlyNew = productos.filter((item) => item.isNew);
  const newItems = onlyNew.map((item, index) => {
    return (
      <PtoductoItem
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
        Transforma tu hogar con las últimas novedades
      </h1>
      <div className={styles.productsContainer}>{newItems}</div>
    </section>
  );
}
