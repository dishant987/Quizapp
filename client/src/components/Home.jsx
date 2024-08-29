import React, { useEffect } from 'react';
import { Box, Typography, Button, Container, Fade, Zoom } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Typewriter from 'typewriter-effect';

// Keyframe animation for bouncing effect
const bounce = `
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
`;

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
            <style>
                {bounce} {/* Apply the bounce animation */}
            </style>
            <Container maxWidth="lg"> {/* Use 'lg' to ensure it's responsive */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        textAlign: 'center',
                        position: 'relative',
                        padding: { xs: 2, sm: 4, md: 6 }, // Responsive padding
                        gap: { xs: 2, sm: 3, md: 4 }, // Responsive gap
                    }}
                >
                    <Fade in={true} timeout={1000}>
                        <Typography
                            variant="h3"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontSize: { xs: 'h4.fontSize', sm: 'h3.fontSize', md: 'h2.fontSize' },
                                fontWeight: 600, // Adjust font weight
                            }}
                        >
                            <Typewriter
                                options={{
                                    strings: ['Welcome to QuizApp'],
                                    autoStart: true,
                                    loop: true,
                                    delay: 90, // Adjust typing speed here
                                    deleteSpeed: 45, // Adjust deletion speed here
                                }}
                            />
                        </Typography>
                    </Fade>
                    <Fade in={true} timeout={1500}>
                        <Typography
                            variant="h6"
                            component="p"
                            gutterBottom
                            sx={{
                                fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize', md: 'h6.fontSize' },
                                mb: 3, // Responsive margin-bottom
                            }}
                        >
                            Test your knowledge with our interactive quizzes.
                        </Typography>
                    </Fade>
                    <Zoom in={true} timeout={2000}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize', md: 'h6.fontSize' }, // Responsive font size
                                padding: { xs: '8px 16px', sm: '10px 20px', md: '12px 24px' }, // Responsive padding
                                minWidth: { xs: '150px', sm: '200px', md: '250px' }, // Responsive width
                            }}
                            onClick={handleLogin}
                            endIcon={<ArrowForwardIos />}
                        >
                            Get Started
                        </Button>
                    </Zoom>
                </Box>
            </Container>
        </>
    );
};

export default Home;
