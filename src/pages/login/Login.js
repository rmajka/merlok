import styles from "./Login.module.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import eyeOpen from "../../assets/eye-open.svg";
import eyeClosed from "../../assets/eye-close.svg";

export default function Login({ user, setUser, openLogin, setOpenLogin }) {
  const [loginMode, setLoginMode] = useState(false);
  const [tempUser, setTempUser] = useState({
    userName: "",
    userEmail: "",
    userPass: "",
    logIn: false,
  });
  const [msg, setMsg] = useState("");
  const [showPas, setShowPass] = useState(false);
  //show current pathname
  const location = useLocation();
  let path = location.pathname.substring(1);
  if (path === "") {
    path = "home";
  } else if (path === "buscadorPresentacion") {
    path = "buscador";
  }
  //manage sign up
  function handleSubmitFrom(e) {
    e.preventDefault();
    if (loginMode) {
      if (
        user.userEmail === tempUser.userEmail &&
        user.userPass === tempUser.userPass
      ) {
        setUser({ ...user, logIn: true });
        setTempUser({
          userName: "",
          userEmail: "",
          userPass: "",
          logIn: false,
        });
        setMsg("");
      } else setMsg("Email / contraseña incorrectos");
    } else {
      setUser(tempUser);
      setTempUser({
        userName: "",
        userEmail: "",
        userPass: "",
        logIn: false,
      });
      setMsg("Te has registrado correctamente");
    }
  }

  //switch login / signup mode
  function switchLoginMode() {
    setLoginMode((curr) => !curr);
    setMsg("");
  }
  console.log("path: ", path);
  return (
    <section className={styles.container}>
      <main className={openLogin ? styles.open : styles.close}>
        <div className={styles.fromContainer}>
          <h1>Hola {user.logIn && user.userName}</h1>
          <span
            className={styles.volverBtn}
            onClick={() => setOpenLogin(false)}
          >
            Volver a {path}
          </span>
          {!user.logIn && (
            <form
              action="submit"
              className={styles.from}
              onSubmit={handleSubmitFrom}
            >
              {!loginMode && (
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Tu nombre"
                  value={tempUser.userName}
                  onChange={(event) =>
                    setTempUser({ ...tempUser, userName: event.target.value })
                  }
                  required
                />
              )}

              <input
                className={styles.input}
                type="email"
                placeholder="Tu email"
                value={tempUser.userEmail}
                onChange={(event) =>
                  setTempUser({ ...tempUser, userEmail: event.target.value })
                }
                required
              />
              <div className={styles.passContainer}>
                <input
                  className={styles.inputPass}
                  type={showPas ? "text" : "password"}
                  placeholder="Contraseña"
                  value={tempUser.userPass}
                  onChange={(event) =>
                    setTempUser({ ...tempUser, userPass: event.target.value })
                  }
                  required
                />
                <img
                  className={styles.passImg}
                  src={showPas ? eyeOpen : eyeClosed}
                  alt="login merlok"
                  onClick={() => setShowPass((curr) => !curr)}
                />
              </div>
              <button className={styles.fromBtn} type="submit">
                {loginMode ? "Login" : "Regístrate"}
              </button>
            </form>
          )}
          <span>{msg}</span>
          {!user.logIn && (
            <span className={styles.changeModeContainer}>
              {loginMode ? (
                <span>¿No estás registrado?</span>
              ) : (
                <span>¿Estás registrado?</span>
              )}
              &nbsp;&nbsp;&nbsp;
              <button
                type="submit"
                className={styles.loginModeBtn}
                onClick={switchLoginMode}
              >
                {loginMode ? "Regístrate" : "Identifícate"}
              </button>
            </span>
          )}
          {user.logIn && (
            <button
              className={styles.cerrarSesionBtn}
              onClick={() =>
                setUser({
                  userName: "",
                  userEmail: "",
                  userPass: "",
                  logIn: false,
                })
              }
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </main>
    </section>
  );
}
