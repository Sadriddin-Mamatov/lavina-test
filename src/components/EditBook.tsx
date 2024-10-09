import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import {getBooks} from "../api";
import {useParams} from "react-router-dom";

interface Book {
    id: number;
    title: string;
    author: string;
    cover: string;
    isbn: string;
    pages: number;
    published: number;
}

interface EditBookProps {
    bookId: number; // ID of the book to be edited
    getBookById: (id: number) => Book | null; // Function to fetch the book by ID
    updateBook: (updatedBook: Book) => void; // Function to update the book's details
}

const EditBook: React.FC<EditBookProps> = () => {
    const { id } = useParams<{ id: string }>();
    const bookId = Number(id);

    console.log(bookId, "djansdjasjdnasjdnas")
    const [formData, setFormData] = useState<Book | null>(null);
    console.log(formData)
    const fetchBooks = async () => {
        try {
            const response = await getBooks();
            setFormData(response.data.data); // Kiritilgan malumotlarni olish
        } catch (error) {
            console.error('Kitoblarni olishda xato', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);
    const getBookById = (id: number) => {
        return formData?.find((book) => book.id === id) || null;
    };
    console.log(getBookById())

    // useEffect(() => {
    //     const bookToEdit = getBookById(bookId);
    //     console.log(bookToEdit, "asdbahadbasdbadh idddddddddddddddd")
    //     if (bookToEdit) {
    //         setFormData(bookToEdit);
    //     }
    // }, [bookId, getBookById]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (formData) {
            setFormData({ ...getBookById.book, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            updateBook(formData);
        }
    };

    if (!formData) return <Typography>Loading...</Typography>;

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Edit Book
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Title"
                    name="title"
                    value={getBookById.book?.title}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Author"
                    name="author"
                    value={getBookById.book?.author}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Cover URL"
                    name="cover"
                    value={getBookById.book?.cover}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="ISBN"
                    name="isbn"
                    value={getBookById.book?.isbn}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Pages"
                    name="pages"
                    type="number"
                    value={getBookById.book?.pages}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Published Year"
                    name="published"
                    type="number"
                    value={getBookById.book?.published}
                    onChange={handleChange}
                    required
                />
                <Box sx={{ mt: 3 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default EditBook;
