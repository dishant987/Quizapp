import * as React from 'react';
import { Box, Container, Divider, IconButton, Stack, Link, TextField, Typography, Button, InputLabel } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';



export default function Footer() {
    return (
        <>
            <Divider />
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 4, sm: 8 },
                    py: { xs: 8, sm: 5 },
                    textAlign: { sm: 'center', md: 'left' },
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                            minWidth: { xs: '100%', sm: '60%' },
                        }}
                    >
                        <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontWeight: 600, mt: 2 }}
                            >
                                Join the newsletter
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                                Subscribe for weekly updates. No spams ever!
                            </Typography>
                            <InputLabel htmlFor="email-newsletter">Email</InputLabel>
                            <Stack direction="row" spacing={1} useFlexGap>
                                <TextField
                                    id="email-newsletter"
                                    hiddenLabel
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    aria-label="Enter your email address"
                                    placeholder="Your email address"
                                    slotProps={{
                                        htmlInput: {
                                            autoComplete: 'off',
                                            'aria-label': 'Enter your email address',
                                        },
                                    }}
                                    sx={{ width: '250px' }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{ flexShrink: 0 }}
                                >
                                    Subscribe
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Link color="text.secondary" variant="body2" component={RouterLink} to="/">
                            Features
                        </Link>
                        <Link color="text.secondary" variant="body2" component={RouterLink} to="/">
                            Testimonials
                        </Link>
                        <Link color="text.secondary" variant="body2" component={RouterLink} to="/">
                            Highlights
                        </Link>
                        <Link color="text.secondary" variant="body2" component={RouterLink} to="/">
                            FAQs
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            Company
                        </Typography>
                        <Link color="text.secondary" variant="body2" component={RouterLink} to="/">
                            About us
                        </Link>
                        <Link color="text.secondary" variant="body2"  component={RouterLink} to="/">
                            Careers
                        </Link>
                        <Link color="text.secondary" variant="body2" component={RouterLink} to="/">
                            Press
                        </Link>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        pt: { xs: 4, sm: 8 },
                        width: '100%',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <div>
                        Made with <Favorite sx={{ mx: 0.5, fontSize: 'inherit', color: 'red' }} /> by{' '}
                        <Link
                           component={RouterLink}
                            to="/about" // Replace with the appropriate path
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ ml: 0.5, textDecoration: 'underline' }}
                        >
                            Dishant
                            &nbsp;
                            {new Date().getFullYear()}
                        </Link>
                    </div>
                    <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        sx={{ justifyContent: 'left', color: 'text.secondary' }}
                    >
                        <IconButton
                            color="inherit"
                            size="small"

                            aria-label="GitHub"
                            sx={{ alignSelf: 'center' }}
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            size="small"

                            aria-label="X"
                            sx={{ alignSelf: 'center' }}
                        >
                            <TwitterIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            size="small"

                            aria-label="LinkedIn"
                            sx={{ alignSelf: 'center' }}
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </Stack>
                </Box>

            </Container>
        </>
    );
}
