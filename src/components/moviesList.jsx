import React, { Component } from "react";
import Like from "./common/like";
import auth from "../services/authService";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesList extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like
          liked={movie.liked}
          callBackObject={movie}
          onCallBack={this.props.onLike}
        />
      )
    }
  ];

  deleteColumn = {
    key: "empty",
    content: movie => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(movie)}
      >
        {" "}
        Delete
      </button>
    )
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { sortColumn, movies, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        data={movies}
        onSort={onSort}
      />
    );
  }
}

export default MoviesList;
