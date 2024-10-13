import React from 'react';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import './App.css'; 
import Footer from './components/Footer';


const ContactUs = React.lazy(() => import('./components/ContactUs'));

const App = () => {
  return (
      <div>
        <Header />
        <Suspense fallback={<div>Loading...</div>}></Suspense>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer/>
      </div>
  );
};

export default App;
