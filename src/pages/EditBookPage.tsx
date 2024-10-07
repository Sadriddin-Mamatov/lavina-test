import React from 'react';
import { useParams } from 'react-router-dom';
import EditBook from '../components/EditBook';

const booksData = [
    {
        id: 41,
        title: 'Raspberry Pi User Guide',
        author: 'Eben Upton',
        cover: 'https://covers.openlibrary.org/b/id/7605922-M.jpg',
        isbn: '9781118464465',
        pages: 264,
        published: 2012,
    },
    {
        id: 42,
        title: 'JavaScript: The Good Parts',
        author: 'Douglas Crockford',
        cover: 'https://covers.openlibrary.org/b/id/7891234-M.jpg',
        isbn: '9780596517748',
        pages: 176,
        published: 2008,
    },
    // Add more books as needed
];

const getBookById = (id: number) => {
    return booksData.find((book) => book.id === id) || null;
};

const updateBook = (updatedBook: any) => {
    console.log('Updated Book:', updatedBook);
    // Logic to update the book in your app's state or database
};

const EditBookPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const bookId = Number(id); // Convert the `id` from the URL to a number

    return (
        <div>
            <EditBook
                bookId={bookId}
                getBookById={getBookById}
                updateBook={updateBook}
            />
        </div>
    );
};

export default EditBookPage;
