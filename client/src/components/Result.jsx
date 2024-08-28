import React from 'react';
import Confetti from 'react-confetti';

import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';

const Result = ({ questions, selectedAnswers }) => {


    const getCorrectAnswersCount = () => {
        return questions.reduce((total, question, index) => {
            if (selectedAnswers[index] === question.correct_answer) {
                return total + 1;
            }
            return total;
        }, 0);
    };

    const score = getCorrectAnswersCount();

    return (
        <>
            <Confetti height={'1500px'} recycle={false} />

            <Box sx={{ position: 'relative' }}>

                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                        Quiz Results
                    </Typography>
                    <Typography variant="h6" align="center" gutterBottom>
                        You scored {score} out of {questions.length}
                    </Typography>

                    <List>
                        {questions.map((question, index) => (
                            <React.Fragment key={index}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1">
                                                {index + 1}. {question.question}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Typography
                                                    variant="body2"
                                                    color={
                                                        selectedAnswers[index] === question.correct_answer
                                                            ? 'success.main'
                                                            : 'error.main'
                                                    }
                                                    sx={{ display: 'block', mb: 1 }}
                                                >
                                                    <strong>Your Answer:</strong>{' '}
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: selectedAnswers[index] || 'Not Answered',
                                                        }}
                                                    />
                                                </Typography>
                                                <Typography variant="body2" color="primary.main">
                                                    <strong>Correct Answer:</strong>{' '}
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: question.correct_answer,
                                                        }}
                                                    />
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                                {index < questions.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            </Box>
        </>
    );
};

export default Result;
