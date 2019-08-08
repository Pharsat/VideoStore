import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

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

  doSubmit = () => {
    //Call server
    // let value = this.username.current.value;
    console.log("submitted");
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
