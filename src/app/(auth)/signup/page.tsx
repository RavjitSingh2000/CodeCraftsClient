'use client';
import { useState, useContext } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import AuthContext, { AuthContextType } from '@/context/AuthContext';

const Register = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const router = useRouter();
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    CellphoneNo: '',
    Email: '',
    Name:'',
    Address:''
  });

  const { Username, Password, CellphoneNo, Email,Name,Address } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = {
        Username: Username,
        Password: Password,
        CellphoneNo: CellphoneNo,
        Email: Email,
        Name:Name,
        Address:Address
    };
    try {
      const response = await axios.post(
        'http://localhost:4000/api/user/signup',
        data,
        config
      );
      localStorage.setItem('token', response.data);

      const decodeddata = jwtDecode(response.data);
      console.log(decodeddata);
      auth.login();
      router.push('/products');
    } catch (e: any) {
      console.log('error ', e.message);
    }
  };
  return (
    <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            User Registration Form
                        </div>
                        <div className="card-body">
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" placeholder="Enter username"
                                     name="Username"
                                     value={Username}
                                     onChange={(e) => onChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter password"
                                    name="Password"
                                    value={Password}
                                    onChange={(e) => onChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cellphone">Cellphone Number</label>
                                    <input type="text" className="form-control" id="cellphone" placeholder="Enter cellphone number" 
                                    name="CellphoneNo"
                                    value={CellphoneNo}
                                    onChange={(e) => onChange(e)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                                    name="Email"
                                    value={Email}
                                    onChange={(e) => onChange(e)} />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter name"
                                    name="Name"
                                    value={Name}
                                    onChange={(e) => onChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" id="address" placeholder="Enter address"
                                    name="Address"
                                    value={Address}
                                    onChange={(e) => onChange(e)} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Register;
