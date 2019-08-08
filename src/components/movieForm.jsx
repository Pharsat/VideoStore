import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string().allow(""),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .label("Daily rental rate")
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const { match, history } = this.props;
    const movieId = match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const { match } = this.props;

    return (
      <React.Fragment>
        <h1>Movie Form {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            type: "hidden",
            name: "_id",
            label: ""
          })}
          {this.renderInput({
            type: "text",
            name: "title",
            label: "Title"
          })}
          {this.renderSelect({
            name: "genreId",
            label: "Genre",
            option_value: "_id",
            option_text: "name",
            options: this.state.genres
          })}
          {this.renderInput({
            type: "number",
            name: "numberInStock",
            label: "Number in stock"
          })}
          {this.renderInput({
            type: "number",
            name: "dailyRentalRate",
            label: "Rate"
          })}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
