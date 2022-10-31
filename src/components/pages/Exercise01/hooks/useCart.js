import { useState } from "react";
import { discountRules } from "../data/data";

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

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

  const calculateTotal = () => {
    const discounts = calculateDiscounts();

    const subTotal = cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const discount = subTotal * discounts;
    setTotal(subTotal - discount);
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
  return {
    addToCart,
    cart,
    addOrRemoveMovie,
    total,
    calculateDiscounts,
    calculateTotal,
  };
};
