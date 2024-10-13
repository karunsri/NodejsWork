const initialState = {
  items: []
};

const addToCart = (state, product) => {
  const existingItem = state.items.find(item => item.id === product.id);
  if (existingItem) {
    return {
      ...state,
      items: state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    };
  }
  return {
    ...state,
    items: [...state.items, { ...product, quantity: 1 }]
  };
};

const removeFromCart = (state, productId) => ({
  ...state,
  items: state.items.filter(item => item.id !== productId)
});

const updateCartQuantity = (state, { productId, quantity }) => ({
  ...state,
  items: state.items.map(item =>
    item.id === productId
      ? { ...item, quantity: quantity }
      : item
  )
});

const handlers = {
  ADD_TO_CART: addToCart,
  REMOVE_FROM_CART: removeFromCart,
  UPDATE_CART_QUANTITY: updateCartQuantity
};

const cartReducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};

export default cartReducer;
