import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getBooks , updateBook} from "../api";
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

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
    updateBook: (updatedBook: Book) => void; // Function to update the book's details
}

const EditBook: React.FC<EditBookProps> = () => {
    const { id } = useParams<{ id: string }>();
    const bookId = Number(id);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Book | null>(null);
    console.log(formData, "djs form dataaaaa")
    const [changedValue, setChangedValue] = useState<Book | null>(null);
    console.log(changedValue, "dasbdsdbsdhsahdbsbadbasb changed value---")
    const editBook=formData?.book;

    const fetchBooks = async () => {
        try {
            const response = await getBooks();
            setFormData(response?.data?.data?.find((book) => book?.book?.id === bookId));
        } catch (error) {
            console.error('error', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        if (formData) {
            setChangedValue(prevState => ({ ...prevState, [name]: value }));
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateBook(id, changedValue)
        navigate("/")
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
                    defaultValue={editBook?.title}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Author"
                    name="author"
                    defaultValue={editBook?.author}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Cover URL"
                    name="cover"
                    defaultValue={editBook?.cover}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="ISBN"
                    name="isbn"
                    defaultValue={editBook?.isbn}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Pages"
                    name="pages"
                    type="number"
                    defaultValue={editBook?.pages}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Published Year"
                    name="published"
                    type="number"
                    defaultValue={editBook?.published}
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
