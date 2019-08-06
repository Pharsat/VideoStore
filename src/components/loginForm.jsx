import React, { Component } from "react";
class LoginForm extends Component {
  username = React.createRef();

  componentDidMount() {
    // this.username.current.focus();
  }

  handleSubmit = e => {
    e.preventDefault();
    //Call server
    let value = this.username.current.value;
    console.log("submitted");
  };
  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              autoFocus
              ref={this.username}
              type="text"
              className="form-control"
              id="userName"
              aria-describedby="userNameHelp"
              placeholder="Enter username"
            />
            <small id="userNameHelp" className="form-text text-muted">
              We'll never share your username with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
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
