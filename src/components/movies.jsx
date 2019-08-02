import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import MoviesList from "./moviesList";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: {}
  };
  componentDidMount() {
    let movies = [...getMovies()];
    let selectedGenre = { name: "All genres" };
    let genres = [selectedGenre, ...getGenres()];
    this.setState({ movies, genres, selectedGenre });
  }

  handleDelete = movie => {
    this.setState({
      movies: [...this.state.movies]
        .filter(m => m._id !== movie._id)
        .forEach(m => (m.liked = false))
    });
  };

  handleLike = movie => {
    let clonedMovies = [...this.state.movies];
    clonedMovies
      .filter(m => m._id === movie._id)
      .forEach(m => (m.liked = !m.liked));
    this.setState({
      movies: clonedMovies
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { pageSize, currentPage, movies, genres, selectedGenre } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;

    const { length: count } = filteredMovies;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const paginatedMovies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <main className="container">
        <div className="row">
          <div className="col col-2" style={{ padding: "20px 20px 0px 0px" }}>
            <ListGroup
              items={genres}
              displayProp="name"
              valueProp="_id"
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col" style={{ padding: "20px 0px 0px 0px" }}>
            <h1>Showing {count} movies in the database</h1>
            <MoviesList
              movies={paginatedMovies}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            {" "}
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;
