import React from "react";
import MovieDetail from "./movieDetail";
const MoviesList = props => {
  const { movies, onDelete, onLike, onSort } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>Tittle</th>
          <th onClick={() => onSort("genre.name")}>Genre</th>
          <th onClick={() => onSort("numberInStock")}>Stock</th>
          <th onClick={() => onSort("dailyRentalRate")}>Rate</th>
          <th>Like</th>
          <th />
        </tr>
      </thead>
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
};

export default MoviesList;
