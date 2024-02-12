'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddProducts = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ProductName:'',
    Model:'',
    Manufacturer:'',
    Description:'',
    Price:'',
    WarrantyDetails:'',
    Availability:''
  });

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEsIlJvbGVJRCI6MiwiaWF0IjoxNzA3NzQ4NzY0fQ.HRT7CVZmShHQeRLWCpv4uSuc3qSDZZocdrVf_CmNaKI';


  const { ProductName, Model, Manufacturer, Description, Price, WarrantyDetails, Availability } = formData;
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    };

    const data = {
      ProductName,
      Model,
      Manufacturer,
      Description,
      Price,
      WarrantyDetails,
      Availability
    };

    try {
      const response = await axios.post(
        'http://localhost:4000/api/product/create',
        data,
        config
      );
 
      console.log(response);
      console.log('product added');
      router.push('/');
    } catch (e: any) {
      console.log(e.response.data.errors);
    }
  };

  return (
    <>
      <h1>Add Product</h1>
      <p>Create a new product</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
            <label>Product Name:</label>
          <input
            type='text'
            placeholder='Product Name'
            name='ProductName'
            value={ProductName}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
        <label>Product Model:</label>
          <input
            type='text'
            placeholder='Model'
            name='Model'
            value={Model}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
        <label>Product Manufacturer:</label>
          <input
            type='text'
            placeholder='Manufacturer'
            name='Manufacturer'
            value={Manufacturer}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
        <label>Description:</label>
          <input
            type='text'
            placeholder='Description'
            name='Description'
            value={Description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
        <label>Price:</label>
          <input
            type='number'
            placeholder='Price'
            name='Price'
            value={Price}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
        <label>Warranty Details:</label>
          <input
            type='text'
            placeholder='Warranty Details'
            name='WarrantyDetails'
            value={WarrantyDetails}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
        <label>Availability:</label>
          <input
            type='text'
            placeholder='Availability'
            name='Availability'
            value={Availability}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type='submit' value='Add Product' />
      </form>
    </>
  );
};

export default AddProducts;
