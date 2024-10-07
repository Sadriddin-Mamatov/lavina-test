import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
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
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
                Ro'yxatdan o'tish
            </Typography>
            <TextField
                label="Ism"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
            />
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
            />
            <TextField
                label="Kalit"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
            />
            <TextField
                label="Maxfiy so'z"
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
            />
            <Button variant="contained" type="submit" fullWidth>
                Ro'yxatdan o'tish
            </Button>
        </Box>
    );
};

export default AuthForm;
