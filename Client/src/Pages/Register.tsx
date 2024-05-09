import { useState, FormEvent } from 'react';
import { BsPerson, BsLock, BsMailbox2Flag } from 'react-icons/bs';
import '../Styles/login.css'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Spinner, useToast } from '@chakra-ui/react';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);
        const data = { username, email, password };
        try {
            const response = await axios.post('https://traveopia-backend.onrender.com/register', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                toast({
                    title: 'Registration successful',
                    position: 'top',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                setLoader(false);
                navigate('/');
            }
        } catch (err) {
            console.error('Error:', err);
            setLoader(false);
            toast({
                title: 'Registration failed',
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
                <h1 className="login-title">Register</h1>
                <div className="input-box">
                    <BsMailbox2Flag className='icon' />
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-box">
                    <BsPerson className='icon' />
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-box">
                    <BsLock className='icon' />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                {loader ?
                    <button type="submit" className="login-btn">
                        <Spinner size='sm' style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Sign up
                    </button>
                    :
                    <button type="submit" className="login-btn"> Sign up</button>
                }

                <p className="register">
                    Already have an account?
                    <Link to={'/'}><b>Login</b></Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
