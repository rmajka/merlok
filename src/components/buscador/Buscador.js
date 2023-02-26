import styles from "./Buscador.module.css";

export default function Buscador() {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="¿Qué estás buscando?"
    />
  );
}
