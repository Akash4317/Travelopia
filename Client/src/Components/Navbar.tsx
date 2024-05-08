import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContextProvider';
import logo from '../assets/TravelopiaAva.jpg';
import '../Styles/navbar.css';
import { Button, Heading, useToast } from '@chakra-ui/react';
import axios from 'axios';

type AuthContextValue = {
    auth: {
        isAuth: boolean;
        token: string | null;
        role: string | null;
    };
    setAuth: React.Dispatch<React.SetStateAction<{
        isAuth: boolean;
        token: string | null;
    }>>;
};

const Navbar: React.FC = () => {
    const { auth, setAuth } = useContext<AuthContextValue>(AuthContext);
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogout = () => {
        localStorage.clear();
        setAuth({ isAuth: false, token: null, role: null });
        navigate('/login');
        window.location.reload();
    };

    const handleLoginToast = () => {
        toast({
            title: "Please log in",
            position: 'top',
            description: "You need to log in to access the home page.",
            status: "warning",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <div className='Navbar'>
            <div>
                <img src={logo} alt="Logo" className="logo" />
            </div>
            {auth.isAuth ? <Link to="/" className="nav-link"><Heading as='h2' size='xl' >Home</Heading></Link> : <Link to="/" className="nav-link"><Heading as='h2' size='xl' onClick={handleLoginToast} >Home</Heading></Link>}
            {auth.role === 'admin' && <Link to="/admin" className="nav-link"><Heading as='h2' size='xl' >admin</Heading></Link>}
            <div>
                {auth.isAuth ?
                    <Button colorScheme='red' size='md' onClick={handleLogout}>
                        Logout
                    </Button>
                    :
                    <Link to="/login" className="nav-link">
                        <Button colorScheme='green' size='md' >
                            Login/Signup
                        </Button>
                    </Link>
                }
            </div>
        </div>
    );
};

export default Navbar;
