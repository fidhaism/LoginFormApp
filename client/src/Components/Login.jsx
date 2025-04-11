import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Paper, Link as MuiLink, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!username || !password) {
            toast.error('Please enter username and password');
            setIsLoading(false);
            return;
        }

        try {
            const requestBody = { username, password };
            const response = await axios.post('http://localhost:3000/api/login', requestBody);

            if (response.status === 200 && response.data.token) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                onLogin(true);
                toast.success('Login successful');
                setUsername('');
                setPassword('');
                navigate('/home');
            } else {
                toast.error('Invalid login response from server');
            }
        } catch (error) {
            console.error('Error logging in user:', error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred while logging in');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={6} sx={{ padding: 4, width: '100%' }}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <MuiLink component={Link} to="/forgot-password" variant="body2" sx={{ display: 'block', textAlign: 'right', mt: 1 }}>
                            Forgot password?
                        </MuiLink>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>

                        <Typography variant="body2" align="center">
                            Don't have an account? <MuiLink component={Link} to="/register">Sign Up</MuiLink>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>
    );
};

export default Login;