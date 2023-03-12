import styles from "./Perfil.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Perfil({ user, setUser }) {
  //store address
  const [address, setAdress] = useState({
    calle: "",
    ciudad: "",
    cp: "",
    provincia: "",
  });
  //update user state
  const [newUser, setNewUser] = useState({ userName: "", userEmail: "" });
  //err msg
  const [msg, setMsg] = useState("");
  const [updateUserMsg, setUpdateUserMsg] = useState("");
  //update user
  function updateUser(e) {
    e.preventDefault();
    if (newUser.userName.trim().length !== 0) {
      setUser({ ...user, userName: newUser.userName });
      setNewUser({ userName: "", userEmail: "" });
      setUpdateUserMsg("Cambios guardados");
      return;
    }
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newUser.userEmail)
    ) {
      setUser({ ...user, userEmail: newUser.userEmail });
      setNewUser({ userName: "", userEmail: "" });
      setTimeout(setUpdateUserMsg("Cambios guardados"), 2000);
    } else {
      setUpdateUserMsg("Email no valido.");
    }

    setTimeout(() => setUpdateUserMsg(""), 4000);
  }

  //add address to current user
  function isEmpty(obj) {
    return (
      obj.calle.trim().length !== 0 &&
      obj.ciudad.trim().length !== 0 &&
      obj.cp.trim().length !== 0 &&
      obj.provincia.trim().length !== 0
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (isEmpty(address)) {
      setUser({ ...user, dir: address });
      setAdress({
        calle: "",
        ciudad: "",
        cp: "",
        provincia: "",
      });
      setMsg("Dirección ha sido cambiada correctamente.");
    } else {
      setMsg("Rellena tolos los campos.");
    }
  }
  //map orders
  let orders = [];

  if (user.orders.length !== 0) {
    orders = user.orders.map((item, index) => {
      //get order links to images
      let orderImgs = [];
      for (let i = 0; i < item.items.length; i++) {
        orderImgs.push(item.items[i].img);
      }
      //get order date
      const date = new Date(item.order);
      const dateString = date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return (
        <div className={styles.orderContainer} key={index}>
          <hr className={styles.hr} />
          <h4>Númer de pedido:&nbsp; {item.order}</h4>
          <h5>Fecha del pedido:&nbsp; {dateString}</h5>
          <h5>Precio total:&nbsp; {item.totalPrice.toFixed()}€</h5>
          <h6>
            Dirección de envío:&nbsp;{" "}
            <span>{` ${item.dir.calle} ${item.dir.cp} ${item.dir.ciudad} ${item.dir.provincia}`}</span>
          </h6>
          <div className={styles.imgsContainer}>
            {orderImgs.map((item, index) => {
              return (
                <img
                  src={item}
                  className={styles.orderImg}
                  key={index}
                  alt="producto merlok"
                />
              );
            })}
          </div>
        </div>
      );
    });
  }

  return (
    <>
      {user.logIn ? (
        <section className={styles.container}>
          <h1 className={styles.header}>Aquí podras ver tus datos y pedidos</h1>
          <div className={styles.user}>
            <p>
              <b>Nombre:</b> {user.userName}
            </p>
            <p>
              <b>Email:</b> {user.userEmail}
            </p>
            <p>
              <b>Dirección de envío:</b>{" "}
              {user.dir && (
                <span>{` ${user.dir.calle} ${user.dir.cp} ${user.dir.ciudad} ${user.dir.provincia}`}</span>
              )}
            </p>
            <div className={styles.formContainer}>
              <form className={styles.form}>
                <input
                  type="text"
                  className={styles.input}
                  required
                  placeholder="Calle y número"
                  value={address.calle}
                  onChange={(event) =>
                    setAdress({ ...address, calle: event.target.value })
                  }
                />
                <input
                  type="text"
                  className={styles.input}
                  required
                  placeholder="Ciudad"
                  value={address.ciudad}
                  onChange={(event) =>
                    setAdress({ ...address, ciudad: event.target.value })
                  }
                />
                <input
                  type="text"
                  className={styles.input}
                  required
                  placeholder="Código postal"
                  value={address.cp}
                  onChange={(event) =>
                    setAdress({ ...address, cp: event.target.value })
                  }
                />
                <input
                  type="text"
                  className={styles.input}
                  required
                  placeholder="Provincia"
                  value={address.provincia}
                  onChange={(event) =>
                    setAdress({ ...address, provincia: event.target.value })
                  }
                />
                <button
                  type="submit"
                  className={styles.dirBtn}
                  onClick={handleSubmit}
                >
                  {user.dir
                    ? "Cambiar dirección de envío"
                    : "Añadir dirección de envío"}
                </button>
                {msg}
              </form>
              <form className={styles.form}>
                <input
                  type="text"
                  required
                  value={newUser.userName}
                  className={styles.input}
                  placeholder="Nuevo nombre"
                  onChange={(event) =>
                    setNewUser({
                      ...newUser,
                      userName: event.target.value,
                    })
                  }
                />
                <input
                  type="email"
                  required
                  value={newUser.userEmail}
                  className={styles.input}
                  placeholder="Nuevo email"
                  onChange={(event) =>
                    setNewUser({
                      ...newUser,
                      userEmail: event.target.value.trim(),
                    })
                  }
                />
                <button
                  type="submit"
                  className={styles.dirBtn}
                  onClick={updateUser}
                >
                  Guardar cambios
                </button>
                {updateUserMsg}
              </form>
            </div>

            <div className={styles.userPedidosContainer}>
              <h4>Tus pedidos:</h4>
              {user.orders.length === 0 && <h5>No tienes pedidos</h5>}
            </div>
            <div className={styles.orders}>{orders}</div>
          </div>
        </section>
      ) : (
        <>
          <h1 className={styles.noUser}>Identifícate para ver más</h1>
          <Link to="/" className={styles.toHome}>
            Volver a la página principal
          </Link>
        </>
      )}
    </>
  );
}
