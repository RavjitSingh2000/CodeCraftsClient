'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '@/components/Product';

type ProductType = {
    ProductID: number,
    ProductName: string,
    Model: string,
    Manufacturer: string,
    Description: string,
    Price: number,
    WarrantyDetails: string,
    Availability: {
      type: string,
      enum: ['Available', 'Out of Stock'],
      default: 'Available'
    };
};

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const sendGetRequest = async () => {
    try {

        const config = {
            headers: {
                'Content-Type':'application/json',
                'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEsIlJvbGVJRCI6MiwiaWF0IjoxNzA3NzUxOTA3fQ.OiTBhJ0Q-U2Qc85BHVBg7lXtpBFa6jCkyjev3HalfjM'
            }
        }
      const response = await axios.get(
        'http://localhost:4000/api/product',config
      );

      console.log(response);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendDeleteRequest = async () => {
    try {
      const response = await axios.delete(
        'https://jsonplaceholder.typicode.com/posts/1'
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const sendPostRequest = async () => {
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title: 'foo',
          body: 'bar',
          userId: 1,
        }
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const sendPutRequest = async () => {
    try {
      const response = await axios.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          id: 1,
          title: 'foo',
          body: 'bar',
          userId: 1,
        }
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch('https://jsonplaceholder.typicode.com/posts')
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //     setPosts(responseData);
  //     console.log(responseData);
  //   });
  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     setPosts(responseData);
    //     console.log(responseData);
    //   });
    // axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
    //   setPosts(response.data);
    //   console.log(response);
    // });
    sendGetRequest();
  }, []);

  return (
    <div>
      <button onClick={sendPostRequest}>Add Post</button>
      <button onClick={sendPutRequest}>Update Post</button>
      <button onClick={sendDeleteRequest}>Delete Post</button>
      {products.map((product) => (
        <Product product={product} key={product.ProductID} />
      ))}
    </div>
  );
};

export default Products;
