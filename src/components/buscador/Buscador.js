import styles from "./Buscador.module.css";
import { useNavigate } from "react-router-dom";

export default function Buscador({ setElementoBuscado }) {
  const navegate = useNavigate();
  function handleKeyDown(event) {
    if (event.key == "Enter") {
      setElementoBuscado(event.target.value);
      navegate("/buscadorPresentacion");
    }
  }

  return (
    <input
      className={styles.input}
      type="text"
      placeholder="¿Qué estás buscando?"
      onKeyDown={handleKeyDown}
    />
  );
}
