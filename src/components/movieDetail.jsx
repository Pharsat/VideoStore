import React from "react";
import Like from "./common/like";
const MovieDetail = props => {
  const { movie, onDelete, onLike } = props;
  const { title, genre, numberInStock, dailyRentalRate, liked } = movie;
  return (
    <tr>
      <td>{title}</td>
      <td>{genre.name}</td>
      <td>{numberInStock}</td>
      <td>{dailyRentalRate}</td>
      <td>
        <Like liked={liked} callBackObject={movie} onCallBack={onLike} />
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(movie)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MovieDetail;
