import React, { Component } from "react";
// import axios from "axios";
// import Global from "../Global";
import {  withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

//imports login
class Register extends Component {
  constructor() {
    super();
    this.state = {
      dni: "",
      password: "",
      password2: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      dni: this.state.dni,
      password: this.state.password,
      password2: this.state.password2,
    };
    console.log('estoy en onsubmit de register');
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
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
//export default Register;
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
