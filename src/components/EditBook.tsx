import React, { useState, useEffect } from 'react';
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
    getBookById: (id: number) => Book | null; // Function to fetch the book by ID
    updateBook: (updatedBook: Book) => void; // Function to update the book's details
}

const EditBook: React.FC<EditBookProps> = ({ bookId, getBookById, updateBook }) => {
    const [formData, setFormData] = useState<Book | null>(null);

    useEffect(() => {
        const bookToEdit = getBookById(bookId);
        if (bookToEdit) {
            setFormData(bookToEdit);
        }
    }, [bookId, getBookById]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (formData) {
            setFormData({ ...formData, [name]: value });
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
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Cover URL"
                    name="cover"
                    value={formData.cover}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="ISBN"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Pages"
                    name="pages"
                    type="number"
                    value={formData.pages}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Published Year"
                    name="published"
                    type="number"
                    value={formData.published}
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
