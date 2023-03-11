import styles from "./Checkout.module.css";
import { Link } from "react-router-dom";

export default function Checkout({
  carrito,
  setCarrito,
  user,
  setUser,
  setOpenLogin,
  setOrderMadeMsg,
}) {
  //sum elements in carrito
  const sumCarrito = carrito
    .map((item) => item.bagCuantity)
    .reduce((prev, curr) => prev + curr, 0);
  //sum total price
  const totalPrice = carrito
    .map((item) => item.bagCuantity * item.price)
    .reduce((prev, curr) => prev + curr, 0);
  //make order to current user
  const currentDate = Date.now();
  function makeOrder() {
    setUser({
      ...user,
      orders: [
        ...user.orders,
        {
          order: currentDate,
          items: carrito,
          totalPrice: totalPrice,
          dir: user.dir,
        },
      ],
    });
    setCarrito([]);
    setOrderMadeMsg("Pedido realizado correctamente.");
  }
  console.log(user.orders);
  return (
    <section className={styles.resumenContainer}>
      <hr className={styles.hr} />
      <h1>Resumen del pedido: {user.userName.slice(0, 20)} </h1>
      <hr className={styles.hr} />
      <h5>Total productos en el carrito: {sumCarrito}</h5>
      <h5>
        Precio sin IVA: {(totalPrice - totalPrice * 0.21).toFixed(2)}&nbsp;€
      </h5>
      <h5>IVA 21%: {(totalPrice * 0.21).toFixed(2)}&nbsp;€</h5>
      <h4>Precio total: {totalPrice.toFixed(2)}&nbsp;€ </h4>
      {!user.logIn && (
        <button
          className={styles.checkoutBtn}
          onClick={() => setOpenLogin(true)}
        >
          Identificate
        </button>
      )}
      {user.logIn && user.dir && (
        <>
          {user.dir && (
            <div className={styles.toDir}>
              <p>
                {" "}
                <b>Dirección de envío:</b> {user.dir}{" "}
              </p>
              <Link to="/perfil" className={styles.toPerfil}>
                Cambiar
              </Link>
            </div>
          )}
          <button className={styles.checkoutBtn} onClick={makeOrder}>
            Hacer pedido
          </button>
        </>
      )}
      {!user.dir && (
        <Link to="/perfil" className={styles.checkoutBtn}>
          Añadir dirección de envío para finalizar pedido
        </Link>
      )}
    </section>
  );
}
