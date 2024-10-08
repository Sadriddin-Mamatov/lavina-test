import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import EditBook from '../components/EditBook';
import {getBooks} from "../api";


const EditBookPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const bookId = Number(id); // Convert the `id` from the URL to a number

    const [books, setBooks] = useState<any[]>([]);

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
    const getBookById = (id: number) => {
        return books?.data?.find((book) => book.id === id) || null;
    };

    const updateBook = (updatedBook: any) => {
        console.log('Updated Book:', updatedBook);
        // Logic to update the book in your app's state or database
    };

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
