import styles from "./Productos.module.css";
import { useEffect } from "react";
import PtoductoItem from "../../components/producto-item/PtoductoItem";

export default function Productos({
  setAbrirPresentacion,
  carrito,
  setCarrito,
  productos,
  setProductos,
  errorProductosData,
}) {
  //change the title
  useEffect(() => {
    document.title = "Merlok - Productos";
  }, []);
  //map to show products
  let showProductos = [];
  if (productos) {
    showProductos = productos.map((item, index) => {
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
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.header}>
        Transforma tu hogar con nuestros productos de calidad
      </h1>
      <div className={styles.productsContainer}>
        {showProductos}
        {errorProductosData && <h2>Error al cargar datos.</h2>}
      </div>
    </section>
  );
}
