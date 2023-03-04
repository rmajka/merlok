import styles from "./Hamburger.module.css";

export default function Hamburger({ setOpenSidebar }) {
  return (
    <button className={styles.hamBtn} onClick={() => setOpenSidebar(true)}>
      <div className={styles.div}></div>
      <div className={styles.div}></div>
      <div className={styles.div}></div>
    </button>
  );
}
