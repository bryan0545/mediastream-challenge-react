/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";
import { discountRules, movies } from "./data/data";

export default function Exercise01() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const discount = calculateDiscounts();
    const total = calculateTotal(discount);
    setTotal(total);
  }, [cart, discountRules]);

  const calculateDiscounts = () => {
    const discounts = discountRules.filter((discount) =>
      discount.m.every((id) => cart.some((producto) => producto.id === id))
    );

    const totalDiscount = discounts.reduce(
      (prev, current) => current.discount + prev,
      0
    );
    return totalDiscount;
  };

  const calculateTotal = (discounts) => {
    const subTotal = cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const discount = subTotal * discounts;
    return subTotal - discount;
  };

  const updateQuantityInCart = (quantity, movie) => {
    const newCart = cart.map((product) => {
      if (movie.id === product.id) {
        product.quantity += quantity;
      }
      return product;
    });
    return newCart;
  };

  const addToCart = (newMovie) => {
    const movieInCart = cart.find((movie) => movie.id === newMovie.id);

    if (!movieInCart) {
      return setCart([...cart, { ...newMovie, quantity: 1 }]);
    }

    const cartUpdated = updateQuantityInCart(1, newMovie);

    return setCart(cartUpdated);
  };

  const addOrRemoveMovie = (value, movie) => {
    if (value === -1) {
      if (movie.quantity === 1) {
        const newCart = cart.filter((product) => !(product.id === movie.id));
        return setCart(newCart);
      }
    }

    const cartUpdated = updateQuantityInCart(value, movie);

    return setCart(cartUpdated);
  };

  return (
    <section className="exercise01">
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
                  <button onClick={() => addOrRemoveMovie(-1, product)}>
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => addOrRemoveMovie(1, product)}>
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="movies__cart-total">
          <p>Total: ${total}</p>
        </div>
      </div>
    </section>
  );
}
