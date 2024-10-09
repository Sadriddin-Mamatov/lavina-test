import React, { useState } from 'react';
import { Box, Button, TextField, Container, Typography, Paper, Grid, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signup } from '../api';

const AuthForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [key, setKey] = useState('');
    const [secret, setSecret] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signup({ name, email, key, secret });
            if (response.data.isOk) {
                localStorage.setItem('userKey', response.data.data.key);
                localStorage.setItem('userSecret', response.data.data.secret);
                alert('Ro\'yxatdan muvaffaqiyatli o\'tildi!');
            }
        } catch (error) {
            console.error('Ro\'yxatdan o\'tish muvaffaqiyatsiz', error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: '2rem', marginTop: '4rem' }}>
                <Grid container direction="column" alignItems="center">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" gutterBottom>
                        Register
                    </Typography>
                    <Box component="form" sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Key"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            required
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Secret"
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                            required
                            type="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                    </Box>
                </Grid>
            </Paper>
        </Container>
    );
};

export default AuthForm;
