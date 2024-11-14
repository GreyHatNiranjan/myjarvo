// app/products/page.js
'use client'
import { useEffect, useState } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the Next.js API route
    async function fetchData() {
      try {
        let response = await fetch('/api/mysql');
        let data = await response.json();
        setProducts(data); // Set the fetched data instead of the response object
        // console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
    
  }, []);

  return (
    <div>
      <h1>Product List</h1>

      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            {product.email} - ${product.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
