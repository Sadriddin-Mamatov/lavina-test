import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { registerUser } from '../services/api';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [key, setKey] = useState('');
    const [secret, setSecret] = useState('');

    const handleRegister = async () => {
        try {
            const result = await registerUser({ name, email, key, secret });
            localStorage.setItem('key', result.data.key);
            localStorage.setItem('secret', result.data.secret);
            alert('Registration successful');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Register</Typography>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField label="Key" value={key} onChange={(e) => setKey(e.target.value)} fullWidth />
            <TextField label="Secret" value={secret} onChange={(e) => setSecret(e.target.value)} fullWidth />
            <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
        </Container>
    );
};

export default Register;
