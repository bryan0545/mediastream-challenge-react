import axios from "axios";

export const getGenresMovie = async () => {
  try {
    const response = await axios.get("http://localhost:3001/genres");
    return response;
  } catch (error) {
    throw new Error("Run yarn movie-api for fake api");
  }
};

export const getMovies = async () => {
  try {
    const response = await axios.get("http://localhost:3001/movies?_limit=50");
    return response;
  } catch (error) {
    throw new Error("Run yarn movie-api for fake api");
  }
};
