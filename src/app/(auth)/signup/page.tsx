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
  const [formData2, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData2;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData2, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users',
        data,
        config
      );
      localStorage.setItem('token', response.data.token);

      const decodeddata = jwtDecode(response.data.token);
      console.log(decodeddata);
      auth.login();
      router.push('/posts');
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
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" placeholder="Enter username" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cellphone">Cellphone Number</label>
                                    <input type="text" className="form-control" id="cellphone" placeholder="Enter cellphone number" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" id="address" placeholder="Enter address" />
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
