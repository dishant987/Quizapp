import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Container,
    Button, Modal, IconButton,
    Badge
} from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { decodeToken } from '../helper/decode';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Result = () => {
    const [data, setData] = useState([]);
    const [cookies] = useCookies(['quizAccessToken']);

    useEffect(() => {
        const fetchData = async () => {
            let userId = '';
            const accessToken = cookies.quizAccessToken;

            const decodedToken = decodeToken(accessToken);

            if (decodedToken) {
                userId = decodedToken._id;
            } else {
                return;
            }
            try {
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userquizdata`, {
                    userId: userId
                });
                setData(res.data);
                // console.log(res.data)
            } catch (error) {
                console.error("Failed to fetch quiz result:", error);
            }
        };

        fetchData();
    }, [cookies.quizAccessToken]);


    if (!data.length) {
        return (
            <Container maxWidth="md" sx={{ py: 6 }}>
                <Typography variant="h3" component="h1" align="center" gutterBottom color="primary">
                    Quiz Result
                </Typography>
                <Typography variant="h6" component="p" align="center">
                    Loading...
                </Typography>
            </Container>
        );
    }



    return (
        <Container maxWidth="md" sx={{ py: 6, marginTop: 8 }}>
            <Typography variant="h3" component="h1" align="center" gutterBottom color="primary">
                Quiz Result
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Tests</StyledTableCell>
                            <StyledTableCell >Achived</StyledTableCell>
                            <StyledTableCell>Points</StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell  >
                                    <Badge badgeContent={row.achived} color={row.achived === "pass" ? "success" : "error"}>

                                    </Badge>
                                </StyledTableCell>
                                <StyledTableCell >{row.points} of 10</StyledTableCell>
                                <StyledTableCell >{moment(row.createdAt).fromNow()}</StyledTableCell>



                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>




        </Container>
    );
};

export default Result;
