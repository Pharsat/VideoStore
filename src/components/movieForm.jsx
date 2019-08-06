import React, { Component } from "react";
class MovieForm extends Component {
  state = {};
  render() {
    const { match, history } = this.props;

    return (
      <React.Fragment>
        <h1>Movie Form {match.params.id}</h1>
        <button
          className="btn btn-primary"
          onClick={() => history.push("/movies")}
        >
          Save
        </button>
      </React.Fragment>
    );
  }
}

export default MovieForm;
