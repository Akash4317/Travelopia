import React, { useContext, useState } from 'react';
import { BsPerson, BsLock } from 'react-icons/bs';
import '../Styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../Context/AuthContextProvider';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4500/login', {
                email,
                password
            });

            if (response.status === 200) {
                const { token, role } = response.data;

                setAuth({
                    isAuth: true,
                    token,
                    role
                });

                // Show success toast
                toast({
                    title: 'Login successful',
                    position: 'top',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                localStorage.setItem('email', response.data.email);
                navigate("/");
            }
        } catch (error) {
            console.error('Error:', error);

            // Show error toast
            toast({
                title: 'Login failed',
                position: 'top',
                description: 'Invalid email or password',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <div className='login_form'>
            <div className='navbar_div'><Navbar /></div>

            <form onSubmit={handleSubmit} className="login-form">
                <h1 className="login-title">Login</h1>

                <div className="input-box">
                    <BsPerson className='icon' />
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-box">
                    <BsLock className='icon' />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="remember-forgot-box">
                    <label htmlFor="remember">
                        <input type="checkbox" id="remember" />
                        Remember me
                    </label>
                    <a>Forgot Password?</a>
                </div>

                <button type="submit" className="login-btn">Login</button>

                <p className="register">
                    Don't have an account?
                    <Link to={'/register'}><b>Register</b></Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
