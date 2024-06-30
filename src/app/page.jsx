"use client"
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://api.mercadolibre.com/sites/MLA/search?seller_id=179571326');
      const data = await res.json();
      setProducts(data.results);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className='container'>
        <h1>Product Listing</h1>
        <div className="products">
          <ul>
            {products.map((product) => (
              <li key={product.id} className='product'>
                <h2>{product.title}</h2>
                <img src={product.thumbnail} alt={product.title} />
                <p>Price: ${product.price}</p>
                <a href={product.permalink} target="_blank" rel="noopener noreferrer">
                  View Product
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
