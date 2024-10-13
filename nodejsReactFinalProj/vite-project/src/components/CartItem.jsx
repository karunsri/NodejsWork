import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../utils/cartActions';
import './CartItem.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="cart-item">
      <div className='cart-details'>
      <h3>{item.title}</h3>
      <p>Quantity: {item.quantity}</p>
      </div>
      <button onClick={handleRemove} className='remove-btn'>Remove</button>
    </div>
  );
};

export default CartItem;
