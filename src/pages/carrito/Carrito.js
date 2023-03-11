import styles from "./Carrito.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Checkout from "../../components/check-out/Checkout";

export default function Carrito({
  carrito,
  setCarrito,
  setAbrirPresentacion,
  user,
  setUser,
  setOpenLogin,
}) {
  //order was made
  const [orderMadeMsg, setOrderMadeMsg] = useState("");
  //change the title
  useEffect(() => {
    document.title = "Merlok - Carrito";
    setOrderMadeMsg("");
  }, []);

  //custom styles for select element
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "30px",
      height: "30px",
      width: "100px",
      fontSize: "0.8rem",
      boxShadow: state.isFocused ? null : null,
    }),

    container: (provided) => ({
      ...provided,
      display: "flex",
    }),

    valueContainer: (provided) => ({
      ...provided,
      margin: "0px",
    }),

    input: (provided) => ({
      ...provided,
      margin: "-10px",
    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      height: "30px",
    }),
  };

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
            {(item.price * item.bagCuantity).toFixed(2)}&nbsp;€
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
          <Select
            styles={customStyles}
            options={options}
            onChange={handleSelect.bind(item)}
          />
        </div>
      </div>
    );
  });

  return (
    <section className={styles.container}>
      <h1 className={styles.header}>Tu carrito de compra</h1>
      {carrito.length === 0 && (
        <>
          <p className={styles.carritoVacio}>Carrito de compra está vacío</p>
          <Link to="/perfil" className={styles.toPerfil}>
            Ver pedidos
          </Link>
          <p>{orderMadeMsg}</p>
        </>
      )}
      <div className={styles.productsContainer}>{showCarrito}</div>
      {carrito.length !== 0 && (
        <Checkout
          carrito={carrito}
          setCarrito={setCarrito}
          user={user}
          setUser={setUser}
          setOpenLogin={setOpenLogin}
          setOrderMadeMsg={setOrderMadeMsg}
        />
      )}
    </section>
  );
}
