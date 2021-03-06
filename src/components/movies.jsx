import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { Link } from "react-router-dom";
import MoviesList from "./moviesList";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    let { data: genresDB } = await getGenres();
    let { data: moviesDB } = await getMovies();
    let movies = [...moviesDB];
    let selectedGenre = { _id: "", name: "All genres" };
    let genres = [selectedGenre, ...genresDB];
    this.setState({ movies, genres, selectedGenre });
  }

  handleDelete = async movie => {
    const originalState = [...this.state.movies];
    this.setState({
      movies: [...this.state.movies].filter(m => m._id !== movie._id)
    });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      this.setState({
        movies: originalState
      });
    }
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getFilteredMoviesByGenre = (selectedGenre, movies) => {
    return selectedGenre && selectedGenre._id
      ? movies.filter(m => m.genre._id === selectedGenre._id)
      : movies;
  };

  getFilteredMoviesBySearchQuery = (searchQuery, movies) => {
    return searchQuery
      ? movies.filter(m =>
          m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      : movies;
  };

  getSortedMovies = (filteredMovies, sortColumn) => {
    return _.orderBy(filteredMovies, [sortColumn.path], sortColumn.order);
  };

  getPaginatedMovies = (sorted, currentPage, pageSize) => {
    return paginate(sorted, currentPage, pageSize);
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;
    let filteredMovies = movies;
    if (searchQuery) {
      filteredMovies = this.getFilteredMoviesBySearchQuery(searchQuery, movies);
    } else if (selectedGenre && selectedGenre._id) {
      filteredMovies = this.getFilteredMoviesByGenre(selectedGenre, movies);
    }
    const sorted = this.getSortedMovies(filteredMovies, sortColumn);
    const { length: count } = sorted;
    const paginatedMovies = this.getPaginatedMovies(
      sorted,
      currentPage,
      pageSize
    );
    return { data: paginatedMovies, count };
  };

  render() {
    const {
      genres,
      selectedGenre,
      sortColumn,
      pageSize,
      currentPage,
      searchQuery
    } = this.state;

    const { user } = this.props;

    const { count, data: movies } = this.getPageData();

    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
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
            {user && (
              <Link className="btn btn-primary" to="/movies/new">
                New movie
              </Link>
            )}
            <h1>Showing {count} movies in the database</h1>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesList
              movies={movies}
              sortColumn={sortColumn}
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
      </React.Fragment>
    );
  }
}

export default Movies;
