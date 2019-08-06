import React, { Component } from "react";
class LoginForm extends Component {
  state = { account: { username: "", password: "" } };
  //   username = React.createRef();

  componentDidMount() {
    // this.username.current.focus();
  }

  handleSubmit = e => {
    e.preventDefault();
    //Call server
    // let value = this.username.current.value;
    console.log("submitted");
  };
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              //   autoFocus
              //   ref={this.username}
              type="text"
              className="form-control"
              id="username"
              name="username"
              aria-describedby="usernameHelp"
              placeholder="Enter username"
              value={account.username}
              onChange={this.handleChange}
            />
            <small id="usernameHelp" className="form-text text-muted">
              We'll never share your username with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="Password"
              value={account.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
