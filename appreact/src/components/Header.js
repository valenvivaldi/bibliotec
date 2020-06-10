import React, { Component } from "react";
import logo from "../assets/images/logotipo.png";
import { Link } from "react-router-dom";

//import para la autenticaion
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Header extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <header id="header">
        <div id="navbar">
          <img id="logo" src={logo} alt="logotipo"></img>
          <div id="brand">
            <strong>Biblioteca Cooperativa Mariano Moreno</strong>
          </div>
          <div id="menu">
            <ul>
              <li>
                {/* <a href="#">Inicio</a> */}
                <Link to="/">Inicio</Link>
              </li>
              <li>
                {/* <a href="#">Perfil</a> */}
                <Link to="/uploadExcel">Importar</Link>
              </li>
              <li>
                <a href="#">Ayuda</a>
              </li>
              {this.props.auth.isAuthenticated ? (
                <li className="userLi">
                  <Link>{this.props.auth.user.dni}</Link>
                  <button
                    className="logoutButton"
                    type="button"
                    onClick={this.onLogoutClick}
                  >
                    Salir
                  </button>
                </li>
              ) : (
                <React.Fragment>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
          <div id="fixfloat"> </div>
        </div>
      </header>
    );
  }
}
Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Header);
