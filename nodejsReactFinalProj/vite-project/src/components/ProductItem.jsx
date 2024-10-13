import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../utils/cartActions';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-item">
      <h2 className='title'>{product.title}</h2>
      <p className='price'>${product.price}</p>
      <h3 className='rating'>{product.rating}</h3>
      <button onClick={handleAddToCart} className='atc-btn'>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
