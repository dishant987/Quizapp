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
      <Paper
        elevation={4}
        sx={{
          padding: 6,
          marginTop: 10,
          borderRadius: 4,
          bgcolor: 'background.default',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          Welcome to the Quiz!
        </Typography>
        <Box my={4}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 'medium'
            }}
          >
            Instructions:
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7
            }}
          >
            1. You will be presented with 10 questions.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7
            }}
          >
            2. Each question carries 1 mark.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7
            }}
          >
            3. There is no negative marking.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7
            }}
          >
            4. You have 30 seconds to answer each question.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7
            }}
          >
            5. Once you proceed to the next question, you cannot go back to the previous one.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7
            }}
          >
            6. Try to answer all the questions to score maximum points.
          </Typography>
        </Box>
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStartQuiz}
            sx={{
              paddingX: 4,
              paddingY: 1.5,
              fontSize: '1rem',
              boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            Start Quiz
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
