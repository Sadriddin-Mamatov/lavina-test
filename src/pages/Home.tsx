import React from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import { Box } from '@mui/material';

const Home = () => {
    return (
        <Box sx={{ mt: 4 }}>
            <BookForm />
            <BookList />
        </Box>
    );
};

export default Home;
