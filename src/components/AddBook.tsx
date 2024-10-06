import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { getAuthHeaders } from '../../utils/authHeader';

interface BookFormProps {
    userKey: string | null;
    userSecret: string | null;
}

const BookForm: React.FC<BookFormProps> = ({ userKey, userSecret }) => {
    const [isbn, setIsbn] = useState('');

    const addBook = async () => {
        if (!userKey || !userSecret) {
            console.error('Foydalanuvchi kaliti yoki maxfiy so\'z mavjud emas.');
            return;
        }

        const response = await fetch('https://no23.lavina.tech/books', {
            method: 'POST',
            headers: getAuthHeaders('POST', '/books', { isbn }, userKey, userSecret),
            body: JSON.stringify({ isbn }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Kitob qo\'shildi:', data);
            setIsbn('');
        } else {
            console.error('Kitob qo\'shishda xato');
        }
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Kitob Qo'shish
            </Typography>
            <TextField
                label="ISBN"
                fullWidth
                margin="normal"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={addBook}>
                Qo'shish
            </Button>
        </div>
    );
};

export default BookForm;
