import React, { Component } from "react";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import { getCurrentUser } from "./services/authService";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

library.add(faHeart, faHeartRegular, faSortUp, faSortDown);

class App extends Component {
  state = {};

  componentDidMount() {
    this.setState({ user: getCurrentUser() });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <div className="content">
          <main className="container">
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/movies/:id" component={MovieForm} />
              <Route
                path="/movies"
                render={props => <Movies {...props} user={this.state.user} />}
              />
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
