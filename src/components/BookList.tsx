import React, { useEffect, useState } from 'react';
import { getBooks } from '../api';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookCard from "./BookCard";

const BookList = () => {
    const [books, setBooks] = useState<any[]>([]);
    const navigate = useNavigate();

    const fetchBooks = async () => {
        try {
            const response = await getBooks();
            setBooks(response.data); // Kiritilgan malumotlarni olish
        } catch (error) {
            console.error('Kitoblarni olishda xato', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleEdit = (id: number) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete=(id: number)=>{

    }
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
                Kitoblar ro'yxati
            </Typography>
            <List className="card-body">
                {books?.data?.map((item, index) => (
                        <BookCard book={item.book} status={item.status} key={index} onEdit={handleEdit} onDelete={handleDelete}/>
                ))}
            </List>
        </Box>
    );
};

export default BookList;
