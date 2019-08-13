import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as authService from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await authService.login(data.username, data.password);
      // this.props.history.push("/");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    //Call server
    // let value = this.username.current.value;
  };

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            type: "text",
            name: "username",
            label: "username",
            placeholder: "Enter username",
            description: "We'll never share your username with anyone else."
          })}
          {this.renderInput({
            type: "password",
            name: "password",
            label: "Password",
            placeholder: "Enter password"
          })}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
