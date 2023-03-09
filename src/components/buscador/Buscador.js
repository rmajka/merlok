import styles from "./Buscador.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export default function Buscador({ setElementoBuscado }) {
  //remove keyboard afer submit
  const inputRef = useRef(null);
  //local search term
  const [searchTerm, setSearchTerm] = useState("");
  //navegate to search result component
  const navegate = useNavigate();
  //search on submit
  function handleSearch(event) {
    event.preventDefault();
    setElementoBuscado(searchTerm);
    inputRef.current.blur(); // hide the keyboard
    navegate("/buscadorPresentacion");
  }

  return (
    <form className={styles.form} onSubmit={handleSearch}>
      <input
        className={styles.input}
        type="search"
        placeholder="¿Qué estás buscando?"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        ref={inputRef}
      />
    </form>
  );
}
