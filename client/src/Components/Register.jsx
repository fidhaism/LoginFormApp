import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Paper, CssBaseline } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Define email state
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        // Validate required fields
        if (!name || !username || !email || !password) {
            toast.error('All fields are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/register', {
                name,
                username,
                email,
                password,
            });

            if (response.status === 201) {
                toast.success('User registered successfully');
                navigate('/login'); // Redirect to login page
            }
        } catch (error) {
            console.error('Error registering user:', error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // Show backend error message
            } else {
                toast.error('An error occurred while registering');
            }
        }
    };

    return (
        <Container component="main" maxWidth="sm">
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
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Typography variant="body2" align="center">
                            Already have an account? <a href="/login">Sign in</a>
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

export default Register;