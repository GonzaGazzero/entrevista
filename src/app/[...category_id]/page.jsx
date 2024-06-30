// src/app/[category_id]/page.jsx
"use client"; 

import React, { useEffect, useState } from 'react';

const CategoryPage = ({ params }) => {
  const [products, setProducts] = useState([]);
  const category_id = params.category_id;

  useEffect(() => {
    if (!category_id) return;

    const fetchProducts = async () => {
      const res = await fetch(`https://api.mercadolibre.com/sites/MLA/search?category=${category_id}`);
      const data = await res.json();
      setProducts(data.results);
    };

    fetchProducts();
  }, [category_id]);

  return (
    <div>
      <h1>Product Listing for Category: {category_id}</h1>
      <div className="products">
        <ul>
          {products.map((product) => (
            <li key={product.id}>
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
  );
};

export default CategoryPage;
