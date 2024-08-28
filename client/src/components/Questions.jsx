import React from 'react';
import { Box, Typography, FormControlLabel, Radio, RadioGroup, Button, Container } from '@mui/material';

const Questions = ({ questions, currentQuestion, selectedAnswers, handleAnswerSelect, handleNext, handlePrevious, handleSubmitQuiz }) => {

    if (!questions || questions.length === 0) {
        return <div>Loading...</div>;
    }

    const question = questions[currentQuestion];
    const options = [...question.incorrect_answers, question.correct_answer].sort();

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Box sx={{ p: 6, borderRadius: 2, boxShadow: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                    Question {currentQuestion + 1} of {questions.length}
                </Typography>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="body1" sx={{ mb: 2 }} dangerouslySetInnerHTML={{ __html: question.question }} />
                </Box>
                <RadioGroup
                    name={`question-${currentQuestion}`}
                    value={selectedAnswers[currentQuestion]}
                    onChange={(e) => handleAnswerSelect(currentQuestion, e.target.value)}
                >
                    {options.map((answer, index) => (
                        <FormControlLabel
                            key={index}
                            value={answer}
                            control={
                                <Radio
                                    checked={selectedAnswers[currentQuestion] === answer}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: 'primary.main',
                                            '& + .MuiFormControlLabel-label': {
                                                fontWeight: 'bold',
                                            },
                                        },
                                    }}
                                />
                            }
                            label={<span dangerouslySetInnerHTML={{ __html: answer }} />}
                            sx={{
                                mb: 2,
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'divider',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    bgcolor: 'action.hover',
                                },
                            }}
                        />
                    ))}
                </RadioGroup>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                    >
                        Previous
                    </Button>
                    {currentQuestion < questions.length - 1 ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSubmitQuiz}
                        >
                            Submit
                        </Button>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default Questions;
