import styles from "./Login.module.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Registrate() {
  const [open, setOpen] = useState(false);
  const [loginMode, setLoginMode] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <section className={styles.container}>
      <main className={open ? styles.open : styles.close}>
        <div className={styles.fromContainer}>
          <h1>hola</h1>
          <Link to="/" onClick={() => setOpen(false)}>
            Volver
          </Link>
          <form action="submit" className={styles.from}>
            {!loginMode && <label htmlFor="name">Tu nombre</label>}
            {!loginMode && <input type="text" required />}
            <label htmlFor="emial">Tu email</label>
            <input type="email" required />
            <label htmlFor="password">Tu contraseña</label>
            <input type="password" required />
            <button className={styles.fromBtn} type="submit">
              {loginMode ? "Login" : "Regístrate"}
            </button>
          </form>
          <span>
            {loginMode ? "¿No estás registrado?" : "¿Estás registrado?"}{" "}
            <button
              className={styles.loginModeBtn}
              onClick={() => setLoginMode((curr) => !curr)}
            >
              {loginMode ? "Regístrate" : "Identifícate"}
            </button>
          </span>
        </div>
      </main>
    </section>
  );
}
