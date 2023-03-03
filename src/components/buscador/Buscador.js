import styles from "./Buscador.module.css";

export default function Buscador({ setElementoBuscado }) {
  function handleChange(event) {
    setElementoBuscado(event.target.value);
  }

  return (
    <input
      className={styles.input}
      type="text"
      placeholder="¿Qué estás buscando?"
      onChange={handleChange}
    />
  );
}
