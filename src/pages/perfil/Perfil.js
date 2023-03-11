import styles from "./Perfil.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Perfil({ user, setUser }) {
  //store address
  const [address, setAdress] = useState("");

  //add address to current user
  function handleSubmit(e) {
    e.preventDefault();
    setUser({ ...user, dir: address });
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
          <h4>Númer de pedido: {item.order}</h4>
          <h5>Fecha del pedido: {dateString}</h5>
          <h5>Precio total: {item.totalPrice.toFixed()}€</h5>
          <h6>Dirección de envío: {item.dir}</h6>
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
            <p>Nombre: {user.userName}</p>
            <p>Email: {user.userEmail}</p>
            <p>Dirección de envío: {user.dir}</p>
            <form className={styles.form}>
              <input
                type="text"
                required
                placeholder="Dirección de envío"
                onChange={(event) => setAdress(event.target.value)}
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
            </form>
            <div className={styles.userPedidosContainer}>
              <h1 className={styles.header}>Tus pedidos</h1>
              {user.orders.length === 0 && <h5>No tienes pedidos</h5>}
              {orders}
            </div>
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
