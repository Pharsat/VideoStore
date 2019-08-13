import http from "./httpService";

const apiEndpoint = "/movies";

function getMovieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(getMovieUrl(movieId));
}

export function saveMovie(movie) {
  const body = { ...movie };
  delete body._id;
  if (movie._id) {
    return http.put(getMovieUrl(movie._id), body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteMovie(id) {
  return http.delete(getMovieUrl(id));
}
