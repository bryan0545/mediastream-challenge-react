const Cart = ({ cart, addOrRemoveMovie, total }) => {
  return (
    <div className="movies__cart">
      {cart.length > 0 ? (
        <ul>
          {cart.map((product) => (
            <li key={product.id} className="movies__cart-card">
              <ul>
                <li>ID: {product.id}</li>
                <li>Name: {product.name}</li>
                <li>Price: ${product.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => addOrRemoveMovie(-1, product)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => addOrRemoveMovie(1, product)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="movies__cart-total">
        <p>Total: ${total}</p>
      </div>
    </div>
  );
};
export default Cart;
