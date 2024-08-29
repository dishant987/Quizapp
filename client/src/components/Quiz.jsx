import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Skeleton } from '@mui/material';
import Questions from './Questions';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { decodeToken } from '../helper/decode';
import axios from 'axios';

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(20); // Timer state
    const [isTimeUp, setIsTimeUp] = useState(false); // Track if time is up
    const [cookies] = useCookies(['accessToken']);
    const navigate = useNavigate();

    const fetchQuizData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=10');
            setQuestions(response.data.results);
        } catch (error) {
            console.error("Failed to fetch quiz data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizData();
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        } else {
            setIsTimeUp(true);
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setTimer(30); // Reset timer for next question
            }
        }
    }, [timer, currentQuestion, questions.length]);

    const handleAnswerSelect = (questionIndex, answer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: answer,
        });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimer(30); // Reset timer for next question
            setIsTimeUp(false); // Allow previous button again
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0 && !isTimeUp) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmitQuiz = async () => {
        let userId = '';
        const accessToken = cookies.accessToken;
        const decodedToken = decodeToken(accessToken);

        if (decodedToken) {
            userId = decodedToken._id;
        } else {
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/submit-quiz', {
                questions,
                selectedAnswers,
                userId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            navigate('/results');
        } catch (error) {
            console.error("Failed to submit quiz result:", error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h3" component="h1" align="center" gutterBottom color="primary">
                Quiz App
            </Typography>
            {loading ? (
                <Box sx={{ my: 4 }}>
                    {[...Array(4)].map((_, idx) => (
                        <Skeleton key={idx} variant="rectangular" height={40} sx={{ mb: 2 }} />
                    ))}
                </Box>
            ) : (
                <Questions
                    questions={questions}
                    currentQuestion={currentQuestion}
                    selectedAnswers={selectedAnswers}
                    handleAnswerSelect={handleAnswerSelect}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                    handleSubmitQuiz={handleSubmitQuiz}
                    timer={timer}
                    isTimeUp={isTimeUp}
                />
            )}
        </Container>
    );
};

export default App;
