import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <form className="formLogin" onSubmit={this.onSubmit}>
          <form-group></form-group>
          <label htmlFor="dni" className="labelLogin">
            DNI
          </label>
          <input
            type="text"
            name="dni"
            id="dni"
            className="inputLogin"
            onChange={this.onChange}
          ></input>
          <label htmlFor="password" className="labelLogin">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="inputLogin"
            onChange={this.onChange}
          ></input>
          <input type="submit" className="submitLogin"></input>
        </form>
        {this.state.message && <p className="pmessage">{this.state.message}</p>}
      </React.Fragment>
    );
  }
}

export default Login;
