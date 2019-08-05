import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

class MoviesList extends Component {
  columns = [
    { path: "title", label: "Title" },
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
    },
    {
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
    }
  ];

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
