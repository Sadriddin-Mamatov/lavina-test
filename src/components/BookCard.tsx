import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Chip } from '@mui/material';

interface BookCardProps {
    book: {
        author: string;
        cover: string;
        id: number;
        isbn: string;
        pages: number;
        published: number;
        title: string;
    };
    status: number;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, status, onEdit, onDelete }) => {
    const getStatusLabel = (status: number) => {
        switch (status) {
            case 0:
                return 'Available';
            case 1:
                return 'Checked Out';
            default:
                return 'Unknown';
        }
    };

    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardMedia
                component="img"
                height="300"
                image={book.cover}
                alt={book.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Author: {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Published: {book.published}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Pages: {book.pages}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ISBN: {book.isbn}
                </Typography>
                <Chip
                    label={getStatusLabel(status)}
                    color={status === 0 ? 'success' : 'error'}
                    sx={{ mt: 2 }}
                />
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => onEdit(book.id)}>
                    Edit
                </Button>
                <Button size="small" color="error" onClick={() => onDelete(book.id)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default BookCard;
