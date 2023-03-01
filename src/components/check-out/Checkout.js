import styles from "./Checkout.module.css";

export default function Checkout({ carrito }) {
  //sum elements in carrito
  const sumCarrito = carrito
    .map((item) => item.bagCuantity)
    .reduce((prev, curr) => prev + curr, 0);
  //sum total price
  const totalPrice = carrito
    .map((item) => item.bagCuantity * item.price)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <section className={styles.resumenContainer}>
      <hr className={styles.hr} />
      <h1>Resumen del pedido: </h1>
      <hr className={styles.hr} />
      <h5>Total productos en el carrito: {sumCarrito}</h5>
      <h5>
        Precio sin IVA: {(totalPrice - totalPrice * 0.21).toFixed(2)}&nbsp;€
      </h5>
      <h5>IVA 21%: {(totalPrice * 0.21).toFixed(2)}&nbsp;€</h5>
      <h4>Precio total: {totalPrice.toFixed(2)}&nbsp;€ </h4>
    </section>
  );
}
