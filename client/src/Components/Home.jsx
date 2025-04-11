import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';

const HeroSection = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    color: '#fff',
    padding: '50px 20px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        padding: '30px 10px',
    },
}));

const Home = () => {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/user', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.status === 200) {
                    setUserData(response.data);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            {/* Navbar */}
            <AppBar position="static" sx={{ backgroundColor: '#6a11cb' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        User Dashboard
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <HeroSection>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Welcome, {userData.name || 'User'}!
                </Typography>
                <Typography variant="h6">
                    Manage your account and explore your personalized dashboard.
                </Typography>
            </HeroSection>

            {/* User Information Section */}
            <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.05)' },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Name
                                </Typography>
                                <Typography>{userData.name || 'N/A'}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.05)' },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Username
                                </Typography>
                                <Typography>{userData.username || 'N/A'}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.05)' },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Email
                                </Typography>
                                <Typography>{userData.email || 'N/A'}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Home;