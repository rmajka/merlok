import "./App.css";
import { Routes, Route } from "react-router-dom";
import { db } from "./config/Database";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState, useEffect } from "react";
import Navbar from "./components/navegacion/Navbar";
import Home from "./pages/home/Home";
import Estancias from "./pages/estancias/Estancias";
import Productos from "./pages/productos/Productos";
import Novedades from "./pages/novedades/Novedades";
import MejoresPrecios from "./pages/mejores-precios/MejoresPrecios";
import Favoritos from "./pages/favoritos/Favoritos";
import Login from "./pages/login/Login";
import Presentacion from "./components/presentacion/Presentacion";
import Carrito from "./pages/carrito/Carrito";
import BuscadorPresentacion from "./pages/buscadorPresentacion/BuscadorPresentacion";
import ScrollArribaBtn from "./components/scroll-arriba-btn/ScrollArribaBtn";

function App() {
  //get products
  const productosRef = collection(db, "productsData");
  const [productosData, loadingProductosData, errorProductosData] =
    useCollectionData(productosRef);
  const [productos, setProductos] = useState([]);
  //item for search
  const [elementoBuscado, setElementoBuscado] = useState("");
  //add to carrito
  const [carrito, setCarrito] = useState([]);
  //current user
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    userPass: "",
    logIn: false,
  });
  //open/ close login screen
  const [openLogin, setOpenLogin] = useState(false);
  //save user to sestion storage
  //get from session storage
  useEffect(() => {
    const data = window.sessionStorage.getItem("user");
    if (data !== null) {
      const d = JSON.parse(data);
      if (d.logIn) setUser(d);
    }
  }, []);
  //add to session srorage
  useEffect(() => {
    window.sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  //==================it seems to be workinkg correctly ==========
  //get from session storage
  useEffect(() => {
    const data = window.sessionStorage.getItem("sesionCarrito");
    if (data !== null) {
      const d = JSON.parse(data);
      if (d.length !== 0) setCarrito(d);
    }
  }, []);
  //add to sesion storage
  useEffect(() => {
    const sesionCarrito = JSON.stringify(carrito);
    window.sessionStorage.setItem("sesionCarrito", sesionCarrito);
  }, [carrito]);

  //=============================================================

  //set and show products
  useEffect(() => {
    if (!loadingProductosData) {
      let data = productosData.map((doc, index) => {
        return { ...doc, id: index };
      });
      setProductos(data);
    }
  }, [productosData]);

  //open presentation window
  const [abrirPresentacion, setAbrirPresentacion] = useState({
    abrir: false,
    elemento: {},
  });

  return (
    <div className="App">
      <div className="main-content">
        <Login
          user={user}
          setUser={setUser}
          openLogin={openLogin}
          setOpenLogin={setOpenLogin}
        />
        <Navbar
          productos={productos}
          carrito={carrito}
          setElementoBuscado={setElementoBuscado}
          user={user}
          openLogin={openLogin}
          setOpenLogin={setOpenLogin}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                productos={productos}
                setProductos={setProductos}
                carrito={carrito}
                setCarrito={setCarrito}
                setAbrirPresentacion={setAbrirPresentacion}
              />
            }
          />
          <Route
            path="/productos"
            element={
              <Productos
                productos={productos}
                setProductos={setProductos}
                carrito={carrito}
                setCarrito={setCarrito}
                setAbrirPresentacion={setAbrirPresentacion}
                errorProductosData={errorProductosData}
              />
            }
          />
          <Route
            path="/estancias"
            element={<Estancias setAbrirPresentacion={setAbrirPresentacion} />}
          />
          <Route
            path="/novedades"
            element={
              <Novedades
                productos={productos}
                setProductos={setProductos}
                carrito={carrito}
                setCarrito={setCarrito}
                setAbrirPresentacion={setAbrirPresentacion}
              />
            }
          />
          <Route
            path="/mejores-precios"
            element={
              <MejoresPrecios
                productos={productos}
                setProductos={setProductos}
                carrito={carrito}
                setCarrito={setCarrito}
                setAbrirPresentacion={setAbrirPresentacion}
              />
            }
          />
          <Route
            path="/favoritos"
            element={
              <Favoritos
                productos={productos}
                setProductos={setProductos}
                carrito={carrito}
                setCarrito={setCarrito}
                setAbrirPresentacion={setAbrirPresentacion}
              />
            }
          />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                setCarrito={setCarrito}
                setAbrirPresentacion={setAbrirPresentacion}
                user={user}
              />
            }
          />

          <Route
            path="/buscadorPresentacion"
            element={
              <BuscadorPresentacion
                elementoBuscado={elementoBuscado}
                productos={productos}
                setProductos={setProductos}
                carrito={carrito}
                setCarrito={setCarrito}
                setAbrirPresentacion={setAbrirPresentacion}
              />
            }
          />
        </Routes>
        {abrirPresentacion.abrir && (
          <Presentacion
            abrirPresentacion={abrirPresentacion}
            setAbrirPresentacion={setAbrirPresentacion}
          />
        )}
      </div>
      <ScrollArribaBtn />
    </div>
  );
}

export default App;
