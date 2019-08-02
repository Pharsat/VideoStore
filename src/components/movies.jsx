import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import MoviesList from "./moviesList";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: {},
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    let movies = [...getMovies()];
    let selectedGenre = { _id: "", name: "All genres" };
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

  handleSort = path => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      sortColumn.order
    );

    const { length: count } = sorted;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const paginatedMovies = paginate(sorted, currentPage, pageSize);

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
              onSort={this.handleSort}
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
