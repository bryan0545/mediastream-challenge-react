/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";
import imageNotFound from "./assets/notImage.png";

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderDescending, setOrderDescending] = useState(true);

  const handleGenderMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log("Getting genders");
    fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((json) => {
        setMovieGenres(json);
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  const handleMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log("Getting movies");
    fetch("http://localhost:3001/movies?_limit=50")
      .then((res) => res.json())
      .then((json) => {
        const movies = orderMovies(json, true);
        setMovies(movies);
        setMoviesFiltered(movies);
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  useEffect(() => {
    handleMovieFetch();
  }, []);

  useEffect(() => {
    handleGenderMovieFetch();
  }, []);

  const filterMovies = (e, genre) => {
    const selectedGenre = e.target.value;
    const moviesList = movies.filter((movie) =>
      movie.genres.includes(selectedGenre)
    );

    setMoviesFiltered(moviesList.length > 0 ? moviesList : movies);
  };

  const orderMovies = (movies, orderDesc) => {
    const orderedMovies = movies.sort((a, b) => {
      return orderDesc
        ? Number(b.year) - Number(a.year)
        : Number(a.year) - Number(b.year);
    });
    return orderedMovies;
  };

  const changeOrder = () => {
    const moviesOrdered = orderMovies(moviesFiltered, !orderDescending);
    setOrderDescending((prev) => !prev);
    setMoviesFiltered(moviesOrdered);
  };

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>
      <div className="movie-library__actions">
        <select
          name="genre"
          placeholder="Search by genre..."
          disabled={loading}
          onChange={filterMovies}
        >
          <option selected>All genres</option>
          {movieGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button onClick={changeOrder}>{`Year ${
          orderDescending ? "Descending" : "Ascending"
        }`}</button>
      </div>

      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <div className="movie-library__list-container">
          <ul className="movie-library__list">
            {moviesFiltered.map((movie) => (
              <div key={movie.id} className="movie-library__card">
                <div className="movie-library__card-img">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    onError={(e) => (e.currentTarget.src = imageNotFound)}
                  />
                </div>
                <ul>
                  <li className="card__title">{movie.title}</li>
                  <li>{movie.genres.join(", ")}</li>
                  <li>{movie.year}</li>
                </ul>
              </div>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
