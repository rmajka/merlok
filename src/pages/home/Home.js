import styles from "./Home.module.css";
import { useEffect } from "react";
import { db } from "../../config/Database";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import HorizontalScroll from "../../components/horizontal-scroll/HorizontalScroll";
import PtoductoItem from "../../components/producto-item/PtoductoItem";

export default function Home({
  productos,
  setProductos,
  carrito,
  setCarrito,
  setAbrirPresentacion,
}) {
  //change the title
  useEffect(() => {
    document.title = "Merlok - Home";
  }, []);
  //get home grid data
  const gridRef = collection(db, "homeGrid");
  const [gridData, loadingGridData, errGridData] = useCollectionData(gridRef);
  //get home showcase scroll data
  const showcaseScrollRef = collection(db, "homepage-v-scroll");
  const [showcaseHome, loadingShowcaseHome, errShowcaseHome] =
    useCollectionData(showcaseScrollRef);
  //get products
  const productosRef = collection(db, "productsData");
  const [productosData, loadingProductosData, errorProductosData] =
    useCollectionData(productosRef);
  //grid collection
  let gridPhotos = "";
  if (!loadingGridData) {
    gridPhotos = gridData.map((item, index) => {
      return (
        <img
          src={item.img}
          alt="homepage"
          key={index}
          className={
            index === 0
              ? styles.first
              : index === 1
              ? styles.second
              : index === 2
              ? styles.third
              : ""
          }
          onClick={() => setAbrirPresentacion({ abrir: true, elemento: item })}
        />
      );
    });
  }

  const gridContainer = (
    <div className={styles.homeGridContainer}>{gridPhotos}</div>
  );
  //scroll home items
  let scrollHome = [];

  if (!loadingShowcaseHome) {
    scrollHome = showcaseHome.map((item, index) => {
      return (
        <img
          src={item.img}
          alt="home product"
          className={styles.scrollHomeImg}
          key={index}
          onClick={() => setAbrirPresentacion({ abrir: true, elemento: item })}
        />
      );
    });
  }
  //only new items
  let newItems = [];
  if (productosData) {
    let onlyNew = productos.filter((item) => item.isNew);
    newItems = onlyNew.map((item, index) => {
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
    <section className={styles.homeContainer}>
      <h1 className={styles.header}>
        Merlok, tu tienda de muebles y decoración
      </h1>
      {gridContainer}
      {errGridData && <h2>Error al cargar datos. Disculpe las molestias</h2>}
      <h1 className={styles.header}>
        Tu hogar pequeño, tranquilo y organizado
      </h1>{" "}
      {!loadingShowcaseHome && <HorizontalScroll elementos={scrollHome} />}
      {errShowcaseHome && (
        <h2>Error al cargar los datos. Disculpe las molestias</h2>
      )}
      <h1 className={styles.header}>Novedades que no puedes perder</h1>{" "}
      {!loadingProductosData && <HorizontalScroll elementos={newItems} />}
      {errorProductosData && (
        <h2>Error al cargar los datos. Disculpe las molestias</h2>
      )}
    </section>
  );
}
