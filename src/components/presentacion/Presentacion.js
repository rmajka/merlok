import styles from "./Presentacion.module.css";

export default function Presentacion({
  setAbrirPresentacion,
  abrirPresentacion,
}) {
  function disabledEventPropagation(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
  }
  return (
    <section
      className={styles.container}
      onClick={() => setAbrirPresentacion({ abrir: false, elemento: {} })}
    >
      <div
        className={styles.presentacionBox}
        onClick={disabledEventPropagation}
      >
        {" "}
        <img
          src={abrirPresentacion.elemento.img}
          className={styles.imgPresentacion}
          alt="producto merlok"
        />
        <div>
          {" "}
          <h1 className={styles.title}>{abrirPresentacion.elemento.title}</h1>
          <p className={styles.descripcion}>
            {abrirPresentacion.elemento.presentation}
          </p>
        </div>
        <button
          className={styles.cerrarBtn}
          onClick={() => setAbrirPresentacion({ abrir: false, elemento: {} })}
        >
          X
        </button>
      </div>
    </section>
  );
}
