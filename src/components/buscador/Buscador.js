import styles from "./Buscador.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Buscador({ setElementoBuscado }) {
  //local search term
  const [searchTerm, setSearchTerm] = useState("");
  //navegate to search result component
  const navegate = useNavigate();
  //search on submit
  function handleSearch(event) {
    event.preventDefault();
    setElementoBuscado(searchTerm);
    navegate("/buscadorPresentacion");
  }

  return (
    <form className={styles.form} onSubmit={handleSearch}>
      <input
        className={styles.input}
        type="text"
        placeholder="¿Qué estás buscando?"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </form>
  );
}
