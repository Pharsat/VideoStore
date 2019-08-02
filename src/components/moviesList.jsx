import React, { Component } from "react";
import MovieDetail from "./movieDetail";
import TableHeader from "./common/tableHeader";

class MoviesList extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "empty" }
  ];

  render() {
    const { sortColumn, movies, onDelete, onLike, onSort } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />

        <tbody>
          {movies.map(movie => (
            <MovieDetail
              key={movie._id}
              movie={movie}
              onDelete={onDelete}
              onLike={onLike}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesList;
