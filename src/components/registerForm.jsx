import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    //Call server
    // let value = this.username.current.value;
    console.log("submitted");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            type: "email",
            name: "username",
            label: "Username"
          })}
          {this.renderInput({
            type: "password",
            name: "password",
            label: "Password"
          })}{" "}
          {this.renderInput({
            type: "text",
            name: "name",
            label: "Name"
          })}
          {this.renderButton("Register")}
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
