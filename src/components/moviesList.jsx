import React from "react";
import MovieDetail from "./movieDetail";
const MoviesList = props => {
  const { movies, onDelete, onLike } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Tittle</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
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
