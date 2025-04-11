import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Paper, CssBaseline } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        // Validate form inputs
        if (!email || !newPassword) {
            toast.error('Please enter your email and new password');
            setIsLoading(false);
            return;
        }

        try {
            // Make API call to reset password
            const response = await axios.post('http://localhost:3000/api/forgot-password', { email, newPassword });

            if (response.status === 200) {
                toast.success('Password reset successfully. Redirecting to login...');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page
                }, 2000);
            } else {
                toast.error('Failed to reset password');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // Show backend error message
            } else {
                toast.error('An error occurred while resetting the password');
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
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={handleForgotPassword} noValidate sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="newPassword"
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </Button>
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

export default ForgotPassword;