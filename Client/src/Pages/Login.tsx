import { useContext, useState, FormEvent } from 'react';
import { BsPerson, BsLock } from 'react-icons/bs';
import '../Styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Spinner, useToast } from '@chakra-ui/react';
import { AuthContext } from '../Context/AuthContextProvider';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const toast = useToast();
    const [loader, setLoader] = useState<boolean>(false);
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);

        try {
            const response = await axios.post('https://traveopia-backend.onrender.com/login', {
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

                toast({
                    title: 'Login successful',
                    position: 'top',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                localStorage.setItem('username', response.data.username);
                localStorage.setItem('email', response.data.email);
                setLoader(false);
                navigate("/home");
            }
        } catch (error) {
            console.error('Error:', error);
            setLoader(false);
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

                {loader ?
                    <button type="submit" className="login-btn">
                        <Spinner size='sm' style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Login
                    </button>
                    :
                    <button type="submit" className="login-btn"> Login</button>
                }

                <p className="register">
                    Don't have an account?
                    <Link to={'/register'}><b>Register</b></Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
