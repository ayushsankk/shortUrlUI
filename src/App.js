import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    place: '',
    warranty: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = (await axios.get('http://localhost:8080/products'));
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async () => {
    try {
      await axios.post('http://localhost:8080/product', newProduct);
      setNewProduct({
        name: '',
        type: '',
        place: '',
        warranty: 0
      });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Product Management</h1>

      <div className="form-container">
        <h2>Add Product</h2>
        <form className="form">
          <label className="form-label">Name:</label>
          <input className="form-input" type="text" name="name" value={newProduct.name} onChange={handleInputChange} />

          <label className="form-label">Type:</label>
          <input className="form-input" type="text" name="type" value={newProduct.type} onChange={handleInputChange} />

          <label className="form-label">Place:</label>
          <input className="form-input" type="text" name="place" value={newProduct.place} onChange={handleInputChange} />

          <label className="form-label">Warranty:</label>
          <input className="form-input" type="number" name="warranty" value={newProduct.warranty} onChange={handleInputChange} />

          <button className="form-button" type="button" onClick={addProduct}>Add</button>
        </form>
      </div>

      <div className="product-list">
        <h2>Products</h2>
        <ul className="list">
          {products.map((product) => (
            <li key={product.id} className="list-item">
              <strong className="product-info">Name:</strong> {product.name}, <strong className="product-info">Type:</strong> {product.type}, <strong className="product-info">Place:</strong> {product.place}, <strong className="product-info">Warranty:</strong> {product.warranty}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
