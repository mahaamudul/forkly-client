const getCartKey = (email) => `bistro-boss-cart-${email || "guest"}`;

export const getLocalCart = (email) => {
  try {
    const storedCart = localStorage.getItem(getCartKey(email));
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
};

export const saveLocalCart = (email, cart) => {
  localStorage.setItem(getCartKey(email), JSON.stringify(cart));
};

export const addLocalCartItem = (email, item) => {
  const cart = getLocalCart(email);
  const cartItem = {
    ...item,
    _id: `local-cart-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  };

  saveLocalCart(email, [...cart, cartItem]);
  return cartItem;
};

export const removeLocalCartItem = (email, id) => {
  const cart = getLocalCart(email);
  const nextCart = cart.filter((item) => item._id !== id);
  saveLocalCart(email, nextCart);
  return cart.length !== nextCart.length;
};
