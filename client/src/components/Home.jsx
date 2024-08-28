import React from 'react';
import { Button, Typography, Container, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to the Quiz!
        </Typography>
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            Instructions:
          </Typography>
          <Typography variant="body1" paragraph>
            1. You will be presented with 10 questions.
          </Typography>
          <Typography variant="body1" paragraph>
            2. Each question carries 1 mark.
          </Typography>
          <Typography variant="body1" paragraph>
            3. There is no negative marking.
          </Typography>
          <Typography variant="body1" paragraph>
            4. Try to answer all the questions to score maximum points.
          </Typography>
        </Box>
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStartQuiz}
          >
            Start Quiz
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
