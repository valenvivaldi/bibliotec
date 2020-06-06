import React from "react";
//import logo from "./assets/images/logo.svg";
import "./assets/css/App.css";

//importar componentes
import Header from "./components/Header";
import Router from "./components/Router";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />

      <Router />

      <Footer />
    </div>
  );
}

export default App;
