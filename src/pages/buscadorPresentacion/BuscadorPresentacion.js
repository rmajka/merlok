import styles from "./BuscadorPresentacion.module.css";
import PtoductoItem from "../../components/producto-item/PtoductoItem";
import { useEffect } from "react";

export default function BuscadorPresentacion({
  elementoBuscado,
  setAbrirPresentacion,
  carrito,
  setCarrito,
  productos,
  setProductos,
}) {
  //scroll up on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let elementosEncontrados = [];
  if (elementoBuscado.trim().toLowerCase() !== "") {
    const unaccentedString = elementoBuscado
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const regexPattern = unaccentedString.replace(/\s+/g, "\\s+");
    const regex = new RegExp(regexPattern, "i");
    const buscador = productos.filter((item) =>
      item.searchKey.toLowerCase().match(regex)
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
