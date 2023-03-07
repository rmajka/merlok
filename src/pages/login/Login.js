import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login({ location }) {
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
            {!loginMode && (
              <input
                className={styles.input}
                type="text"
                placeholder="Tu nombre"
                required
              />
            )}

            <input
              className={styles.input}
              type="email"
              placeholder="Tu email"
              required
            />

            <input
              className={styles.input}
              type="password"
              placeholder="Contraseña"
              required
            />
            <button className={styles.fromBtn} type="submit">
              {loginMode ? "Login" : "Regístrate"}
            </button>
          </form>
          <span className={styles.changeModeContainer}>
            {loginMode ? "¿No estás registrado?" : "¿Estás registrado?"}
            &nbsp;&nbsp;&nbsp;
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
