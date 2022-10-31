const Filter = ({
  onChange,
  changeOrder,
  loading,
  genres,
  orderDescending,
}) => {
  return (
    <div className="movie-library__actions">
      <select
        name="genre"
        placeholder="Search by genre..."
        disabled={loading}
        onChange={onChange}
      >
        <option selected>All genres</option>
        {genres.length > 0
          ? genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))
          : null}
      </select>
      <button onClick={changeOrder}>{`Year ${
        orderDescending ? "Descending" : "Ascending"
      }`}</button>
    </div>
  );
};
export default Filter;
