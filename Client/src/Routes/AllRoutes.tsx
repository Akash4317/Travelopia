
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import PrivateRoute from './PrivateRoute'
import Admin from '../Pages/Admin'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContextProvider'

const AllRoutes = () => {
    const { auth } = useContext(AuthContext);
    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={auth.isAuth ? <Navigate to="/home" /> : <Login />}
                />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )
}

export default AllRoutes
