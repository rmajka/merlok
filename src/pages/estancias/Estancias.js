import styles from "./Estancias.module.css";
import { useEffect } from "react";
import { db } from "../../config/Database";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import HorizontalScroll from "../../components/horizontal-scroll/HorizontalScroll";

export default function Estancias({ setAbrirPresentacion }) {
  //change the title
  useEffect(() => {
    document.title = "Merlok - Estancias";
    window.scrollTo(0, 0);
  }, []);
  //get cocina main photo data
  const estanciasRef = collection(db, "estanciasMainPhotos");
  const [estanciasData, loadingestanciasData, errEstanciasData] =
    useCollectionData(estanciasRef);

  //get cocinas photos for scroll containar
  const cocinasScrollRef = collection(db, "cocinas-v-scroll-estancias");
  const [cocinasScrollData, loadingCocinasScrollData, errEstaCocinaScrollData] =
    useCollectionData(cocinasScrollRef);

  //get salones photos for scroll containar
  const salonesScrollRef = collection(db, "salon-v-scroll-estancias");
  const [
    salonesScrollData,
    loadingSalonesScrollData,
    errEstaSalonesScrollData,
  ] = useCollectionData(salonesScrollRef);

  //get main cocina photo
  let cocinaMain;
  if (!loadingestanciasData) {
    const cocina = estanciasData.filter((item) => item.id === "cocinaMain");
    cocinaMain = cocina.map((item) => {
      return (
        <img
          src={item.img}
          className={styles.mainPhoto}
          key={item.id}
          onClick={() => setAbrirPresentacion({ abrir: true, elemento: item })}
          alt="estancias"
        />
      );
    });
  }

  //salon main photo
  let salonMain;
  if (!loadingestanciasData) {
    const salon = estanciasData.filter((item) => item.id === "salonMain");
    salonMain = salon.map((item) => {
      return (
        <img
          src={item.img}
          className={styles.mainPhoto}
          key={item.id}
          onClick={() => setAbrirPresentacion({ abrir: true, elemento: item })}
          alt="estancias"
        />
      );
    });
  }

  //map cocnia scroll items
  let cocinaScroll = [];
  if (!loadingCocinasScrollData) {
    cocinaScroll = cocinasScrollData.map((item, index) => {
      return (
        <img
          src={item.img}
          key={index}
          onClick={() => setAbrirPresentacion({ abrir: true, elemento: item })}
          alt="estancias"
        />
      );
    });
  }

  //map salones scroll items
  let salonScroll = [];
  if (!loadingSalonesScrollData) {
    salonScroll = salonesScrollData.map((item, index) => {
      return (
        <img
          src={item.img}
          key={index}
          onClick={() => setAbrirPresentacion({ abrir: true, elemento: item })}
          alt="estancias"
        />
      );
    });
  }

  return (
    <section className={styles.container}>
      {(errEstaCocinaScrollData ||
        errEstaSalonesScrollData ||
        errEstanciasData) && (
        <h1>Error al cargar datos. Disculpe las molestias</h1>
      )}
      <h1 className={styles.header}>
        Tu espacio con nuestras Estancias de Estilo y Comodidad
      </h1>

      <div className={styles.mainContainer}>
        {cocinaMain}
        <div className={styles.mainDescription}>
          <h3>Cocinas modernas y salas de estar</h3>
          <p>
            Nuestro equipo de dise??adores ha trabajado incansablemente para
            crear una variedad de dise??os y estilos que se adapten a tus
            necesidades. Desde cocinas minimalistas y elegantes hasta salas de
            estar acogedoras y funcionales, nuestros muebles est??n dise??ados
            para hacer que tu hogar sea a??n m??s c??modo y hermoso. Adem??s,
            nuestros materiales de alta calidad garantizan durabilidad y
            resistencia a lo largo del tiempo. ??Ven y descubre c??mo podemos
            hacer realidad tus ideas y crear el hogar de tus sue??os!
          </p>
        </div>
      </div>
      <hr className={styles.hr} />
      <HorizontalScroll elementos={cocinaScroll} />
      <hr className={styles.hr} />
      <div className={styles.mainContainer}>
        <div className={styles.mainDescription}>
          <h3>Sal??n, refleja tu estilo</h3>
          <p>
            En el sal??n charlamos, nos divertimos, nos relajamos, en definitiva,
            vivimos en ??l. Por eso, encontrar la decoraci??n del sal??n ideal a
            veces requiere tiempo. Adem??s, es importante tener en cuenta la
            funcionalidad y la comodidad al momento de elegir los muebles y la
            distribuci??n del espacio. En nuestra tienda podr??s encontrar una
            amplia variedad de estilos y dise??os para adecuarlos a tus
            necesidades y gustos, siempre con la garant??a de la mejor calidad en
            materiales y acabados. Transforma tu sal??n en un espacio acogedor y
            personalizado con nuestra selecci??n de muebles y decoraci??n.
          </p>
        </div>
        {salonMain}
      </div>
      <hr className={styles.hr} />
      <HorizontalScroll elementos={salonScroll} />
      <hr className={styles.hr} />
    </section>
  );
}
