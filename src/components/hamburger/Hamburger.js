import styles from "./Hamburger.module.css";

export default function Hamburger() {
  return (
    <button className={styles.hamBtn}>
      <div className={styles.div}></div>
      <div className={styles.div}></div>
      <div className={styles.div}></div>
    </button>
  );
}
