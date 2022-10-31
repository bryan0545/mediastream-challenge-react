import imageNotFound from "../assets/notImage.png";

const MoviesList = ({ movies }) => {
  return (
    <div className="movie-library__list-container">
      <ul className="movie-library__list">
        {movies.map((movie) => (
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
  );
};
export default MoviesList;
