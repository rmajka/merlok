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
import Presentacion from "./components/presentacion/Presentacion";
import Carrito from "./pages/carrito/Carrito";
import ScrollArribaBtn from "./components/scroll-arriba-btn/ScrollArribaBtn";

function App() {
  //get products
  const productosRef = collection(db, "productsData");
  const [productosData, loadingProductosData, errorProductosData] =
    useCollectionData(productosRef);
  const [productos, setProductos] = useState([]);
  //add to carrito
  const [carrito, setCarrito] = useState([]);

  //set and show products
  useEffect(() => {
    if (!loadingProductosData) {
      let data = productosData.map((doc, index) => {
        return { ...doc, id: index };
      });
      setProductos(data);
    }
  }, [productosData]);
  //============================== working on it=================
  //add to sesion storage
  useEffect(() => {
    let sesionCarrito = JSON.stringify(carrito);
    sessionStorage.setItem("sesionCarrito", sesionCarrito);
  }, [carrito]);
  //=============================================================
  //open presentation window
  const [abrirPresentacion, setAbrirPresentacion] = useState({
    abrir: false,
    elemento: {},
  });

  return (
    <div className="App">
      <div className="main-content">
        <Navbar productos={productos} carrito={carrito} />
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
