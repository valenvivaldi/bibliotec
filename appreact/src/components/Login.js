import React, { Component } from "react";

import Global from "../Global";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  state = {};
  onChange = (e) => {
    //console.log(e);
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      dni: this.state.dni,
      password: this.state.password,
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
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
          <form-group></form-group>
          <label htmlFor="dni" className="labelLogin">
            DNI
          </label>
          <input
            type="text"
            name="dni"
            id='dni'
            className="inputLogin"
            onChange={this.onChange}
          ></input>
          <label htmlFor="password" className="labelLogin">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id='password'
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
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
