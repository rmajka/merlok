import styles from "./BuscadorPresentacion.module.css";
import PtoductoItem from "../../components/producto-item/PtoductoItem";
import React from "react";

export default function BuscadorPresentacion({
  elementoBuscado,
  setAbrirPresentacion,
  carrito,
  setCarrito,
  productos,
  setProductos,
}) {
  let elementosEncontrados = [];
  if (elementoBuscado.toLowerCase() != "") {
    const buscador = productos.filter((item) =>
      item.searchKey.toLowerCase().includes(elementoBuscado.toLowerCase())
    );

    elementosEncontrados = buscador.map((item, index) => {
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
      <p>Resultados de tu busqueda: {elementoBuscado}</p>
      <div className={styles.itemsContainer}> {elementosEncontrados}</div>
    </section>
  );
}
