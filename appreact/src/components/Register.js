import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
class Register extends Component {
  state={

  }
  render() {
    return (
      <React.Fragment>
        <form className="formLogin">
          <label htmlFor="dni" className="labelLogin">
            DNI
          </label>
          <input type="text" name="dni" className="inputLogin"></input>
          <label htmlFor="password" className="labelLogin">
            Contraseña
          </label>
          <input type="text" name="password" className="inputLogin"></input>
          <label htmlFor="password2" className="labelLogin">
            Confirmar contraseña
          </label>
          <input type="text" name="password2" className="inputLogin"></input>
          <input type="submit" className="submitLogin"></input>
        </form>
        {this.state.message && <p className="pmessage">{this.state.message}</p>}
      </React.Fragment>
    );
  }
}
export default Register;
