import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { addBook } from '../api';

const BookForm = () => {
    const [isbn, setIsbn] = useState('');

    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addBook({ isbn });
            alert('Kitob muvaffaqiyatli qo\'shildi!');
            setIsbn(''); // Formani tozalash
        } catch (error) {
            console.error('Kitob qo\'shishda xato', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleAddBook} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
                Kitob qo'shish
            </Typography>
            <TextField
                label="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
            />
            <Button variant="contained" type="submit" fullWidth>
                Kitobni qo'shish
            </Button>
        </Box>
    );
};

export default BookForm;
