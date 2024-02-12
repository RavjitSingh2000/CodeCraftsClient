'use client';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext, { AuthContextType } from '@/context/AuthContext';
import Link from 'next/link';
import axios from 'axios';

//TypeScript parameters defined for the login
// type LoginProps = {
//     Username : string,
//     Password : string
// }

const Login = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        Username: '',
        Password: '',
    });

    const auth = useContext(AuthContext) as AuthContextType;
    const {Username, Password} = formData;
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let formValid = true;
    // const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const emailPattern = "";
    if (Username === '') {
        formValid = false;
        setEmailError('Please enter email');
    } else if (!Username.match(emailPattern)) {
        formValid = false;
        setEmailError('Please enter email in valid format');
    } else {
        formValid = true;
        setEmailError('');
    }

    if (formValid) {
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const data = {
            Username: Username,
            Password: Password,
        };
        console.log(data);
        try {
            const response = await axios.post('http://localhost:4000/api/user/login', data, config);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            auth.login();
            router.push('/posts'); //<-need to change this later
        } catch (err: any) {
            console.log(err);
            setError(err.response.data.errors || 'something went wrong');
        }
    }
}

    return (
        <>  
            <header className='display-4 container-fluid'>Welcome to our insurance company</header>
            <article className='container-sm'>
                <h1>This is a card</h1>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="Username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="Username" name="Username" value={formData.Username} onChange={(e) => onChange(e)} />
                        {/* {emailError && <div className="text-danger">{emailError}</div>} */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password" name="Password" value={formData.Password} onChange={(e) => onChange(e)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </article>
        </>
    );
}

export default Login;