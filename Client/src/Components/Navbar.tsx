import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContextProvider';
import logo from '../assets/TravelopiaAva.jpg';
import '../Styles/navbar.css';
import { Button, Heading, useToast } from '@chakra-ui/react';




const Navbar = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const toast = useToast();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.clear();
        setAuth({ isAuth: false, token: null, role: null });
        navigate('/');
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
            {auth.isAuth ? <Link to="/home" className="nav-link"><Heading as='h2' size='xl' >Home</Heading></Link> : <Link to="/home" className="nav-link"><Heading as='h2' size='xl' onClick={handleLoginToast} >Home</Heading></Link>}
            {auth.role === 'admin' && <Link to="/admin" className="nav-link"><Heading as='h2' size='xl' >Enqueries</Heading></Link>}
            <div>
                {username && <Button mr={2}>Hello,{username}</Button>}
                {auth.isAuth ?
                    <Button colorScheme='red' size='md' onClick={handleLogout}>
                        Logout
                    </Button>
                    :
                    <Link to="/" className="nav-link">
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
