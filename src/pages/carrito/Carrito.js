import styles from "./Carrito.module.css";
import { useEffect } from "react";
import Select from "react-select";
import Checkout from "../../components/check-out/Checkout";

export default function Carrito({ carrito, setCarrito, setAbrirPresentacion }) {
  //change the title
  useEffect(() => {
    document.title = "Merlok - Carrito";
  }, []);

  //options for select
  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
    { value: 13, label: 13 },
    { value: 14, label: 14 },
    { value: 15, label: 15 },
  ];
  //change value of bag cuantity of item
  function handleSelect(event) {
    this.bagCuantity = event.value;
    setCarrito([...carrito]);
  }

  const showCarrito = carrito.map((item, index) => {
    return (
      // item shows in carrito
      <div className={styles.itemContainer} key={index}>
        <img
          src={item.img}
          onClick={() => setAbrirPresentacion({ abrir: true, elemento: item })}
          alt="carrito"
        />
        <div className={styles.itemDescription}>
          <span>{item.productName}</span>
          <p>{item.description}</p>
          <span>
            {(item.price * item.bagCuantity).toFixed(2)}{" "}
            {` - Uds: ${item.bagCuantity}`}{" "}
          </span>
          <p
            onClick={() =>
              setCarrito([
                ...carrito.filter((producto) => producto.id !== item.id),
              ])
            }
            className={styles.eliminarProducto}
          >
            Eliminar producto
          </p>
          <Select options={options} onChange={handleSelect.bind(item)} />
        </div>
      </div>
    );
  });

  return (
    <section className={styles.container}>
      <h1 className={styles.header}>Tu carrito de compra</h1>
      {carrito.length === 0 && <p>Carrito de compra está vacío</p>}
      <div className={styles.productsContainer}>{showCarrito}</div>
      <section>
        <Checkout carrito={carrito} />
      </section>
    </section>
  );
}
