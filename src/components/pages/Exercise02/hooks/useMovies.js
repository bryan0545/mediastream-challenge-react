import { useState } from "react";
import { getGenresMovie, getMovies } from "../services/moviesApi";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [error, setError] = useState(false);
  const [orderDescending, setOrderDescending] = useState(true);
  const [loading, setLoading] = useState(false);

  const filterMovies = (e) => {
    const selectedGenre = e.target.value;
    const moviesList = movies.filter((movie) =>
      movie.genres.includes(selectedGenre)
    );

    setFilteredMovies(moviesList.length > 0 ? moviesList : movies);
  };

  const changeOrder = () => {
    const moviesOrdered = orderMovies(filteredMovies, !orderDescending);
    setOrderDescending((prev) => !prev);
    setFilteredMovies(moviesOrdered);
  };

  const orderMovies = (movies, orderDesc) => {
    const orderedMovies = movies.sort((a, b) => {
      return orderDesc
        ? Number(b.year) - Number(a.year)
        : Number(a.year) - Number(b.year);
    });
    return orderedMovies;
  };

  const handleGenderMovieFetch = async () => {
    setLoading(true);
    setError(false);
    console.log("Getting genders");
    try {
      const response = await getGenresMovie();
      setMovieGenres(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const handleMovieFetch = async () => {
    setLoading(true);
    setError(false);
    console.log("Getting movies");
    try {
      const response = await getMovies();
      const ordenedMovies = orderMovies(response.data, true);
      setFilteredMovies(ordenedMovies);
      setMovies(ordenedMovies);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  return {
    movies,
    movieGenres,
    handleGenderMovieFetch,
    handleMovieFetch,
    error,
    loading,
    filteredMovies,
    filterMovies,
    changeOrder,
    orderDescending,
  };
};
