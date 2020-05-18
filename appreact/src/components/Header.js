import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header id="header">
        <div id="navbar">
          <div id="brand">
            <strong>Biblioteca Cooperativa Mariano Moreno</strong>
          </div>
          <div id="menu">
            <ul>
              <li>
                <a href="#">Inicio</a>
              </li>
              <li>
                <a href="#">Perfil</a>
              </li>
              <li>
                <a href="#">Ayuda</a>
              </li>
              <li>
                <a href="#">Usuario</a>
              </li>
            </ul>
          </div>
          <div id="fixfloat"> </div>
        </div>
      </header>
    );
  }
}
export default Header;
