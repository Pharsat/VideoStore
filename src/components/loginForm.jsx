import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };
  //   username = React.createRef();

  componentDidMount() {
    // this.username.current.focus();
  }

  validate = () => {
    const errors = {};
    const { account } = this.state;
    if (account.username === "") {
      errors.username = "Username is required.";
    }
    if (account.password === "") {
      errors.password = "Password is required.";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    //Call server
    // let value = this.username.current.value;
    console.log("submitted");
  };
  validateProperty = ({ name, value }) => {
    if (name === "username" && value === "") return "Username is required.";
    if (name === "password" && value === "") return "Password is required.";
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value.trim();

    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            placeholder="Enter username"
            description=" We'll never share your username with anyone else."
            error={errors.username}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            placeholder="Enter password"
            error={errors.password}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
