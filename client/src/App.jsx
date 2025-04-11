import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import ForgotPassword from './Components/ForgotPassword';
import PrivateRoute from './Components/PrivateRoute';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set logged-in state based on token presence
    }, []);

    const handleLogin = (status) => {
        setIsLoggedIn(status);
    };

    return (
        <Router>
            <Routes>
                {/* Default route should point to Login */}
                <Route path="/" element={<Login onLogin={handleLogin} />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <Home />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;