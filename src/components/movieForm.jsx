import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
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

  async componentDidMount() {
    await this.pupulateGenres();
    await this.pupulateMovie();
  }

  async pupulateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async pupulateMovie() {
    const { match, history } = this.props;
    try {
      const movieId = match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch ({ response }) {
      if (response && response.status === 404)
        return history.replace("/not-found");
    }
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie._id !== "" ? movie.genre._id : movie.genre,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
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
