import React, { Component } from "react";
// import axios from "axios";
// import Global from "../Global";
import {  withRouter } from "react-router-dom";


//imports login
class Register extends Component {

  render() {
    return (
      <React.Fragment>
        <form className="formLogin" onSubmit={this.onSubmit}>
          <label htmlFor="dni" className="labelLogin">
            DNI
          </label>
          <input
            type="text"
            name="dni"
            className="inputLogin"
            onChange={this.onChange}
          ></input>
          <span className="red-text">{this.state.errors.name}</span>
          <label htmlFor="password" className="labelLogin">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            className="inputLogin"
            onChange={this.onChange}
          ></input>
          <span className="red-text">{this.state.errors.password}</span>
          <label htmlFor="password2" className="labelLogin">
            Confirmar contraseña
          </label>
          <input
            type="password"
            name="password2"
            className="inputLogin"
            onChange={this.onChange}
          ></input>
          <span className="red-text">{this.state.errors.password}</span>
          <input type="submit" className="submitLogin"></input>
        </form>
        {this.state.message && <p className="pmessage">{this.state.message}</p>}
      </React.Fragment>
    );
  }
}


export default Register;
