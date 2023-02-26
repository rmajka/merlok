import styles from "./ScrollArribaBtn.module.css";
import arrowUp from "../../assets/arrow-up.svg";
import { useState } from "react";

export default function ScrollArribaBtn() {
  const [showText, setShowText] = useState(false);
  return (
    <button
      className={styles.btn}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      <img
        className={styles.logo}
        src={arrowUp}
        alt="merlok página principal"
      />
      <p className={showText ? styles.text : styles.hideText}>
        Volver&nbsp;arriba
      </p>
    </button>
  );
}
