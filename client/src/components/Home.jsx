import React from 'react';
import { Box, Typography, Button, Container, AppBar, Toolbar, IconButton } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const userName = "John Doe"; // Replace with the actual logged-in user's name

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <>

            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        textAlign: 'center',
                        position: 'relative',
                    }}
                >
                    <Typography variant="h3" component="h1" gutterBottom>
                        Welcome to QuizApp
                    </Typography>
                    <Typography variant="h6" component="p" gutterBottom>
                        Test your knowledge with our interactive quizzes.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 4 }}
                        onClick={handleLogin}
                        endIcon={<ArrowForwardIos />}
                    >
                        Get Started
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default Home;
