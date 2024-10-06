import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { getAuthHeaders } from '../../utils/authHeader';

interface Book {
    id: number;
    isbn: string;
}

interface BookListProps {
    userKey: string | null;
    userSecret: string | null;
}

const BookList: React.FC<BookListProps> = ({ userKey, userSecret }) => {
    const [books, setBooks] = useState<Book[]>([]);

    const fetchBooks = async () => {
        if (!userKey || !userSecret) {
            console.error('Foydalanuvchi kaliti yoki maxfiy so\'z mavjud emas.');
            return;
        }

        const response = await fetch('https://no23.lavina.tech/books', {
            method: 'GET',
            headers: getAuthHeaders('GET', '/books', {}, userKey, userSecret),
        });

        if (response.ok) {
            const data = await response.json();
            setBooks(data);
        } else {
            console.error('Kitoblarni olishda xato');
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Kitoblar Ro'yxati
            </Typography>
            <List>
                {books.map((book) => (
                    <ListItem key={book.id}>
                        <ListItemText primary={book.isbn} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default BookList;
