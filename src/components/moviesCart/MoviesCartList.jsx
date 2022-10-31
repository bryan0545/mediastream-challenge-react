const MoviesCartList = ({ movies, addToCart }) => {
  return (
    <div className="movies__list">
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className="movies__list-card">
            <ul>
              <li>ID: {movie.id}</li>
              <li>Name: {movie.name}</li>
              <li>Price: ${movie.price}</li>
            </ul>
            <button onClick={() => addToCart(movie)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MoviesCartList;
