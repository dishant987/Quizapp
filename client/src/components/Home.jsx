import React, { useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Home = () => {

    const navigate = useNavigate();
    const [cookies] = useCookies(['quizAccessToken']);
    useEffect(() => {
        // Check if the user is logged in by looking for the access token
        if (cookies.quizAccessToken) {
            navigate('/quizhome');
        }
    }, [cookies, navigate]);

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
