import React, { useEffect, useState , useCallback} from 'react';
import {
    List,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from '@mui/material';
import {
    deleteBookById,
    getBooks,
    searchBook,
    updateBook
} from '../api';
import BookCard from "./BookCard";
import CustomModal from "./Modal";
import _ from 'lodash';


const BookList = () => {
    const [books, setBooks] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [status, setStatus] = useState();
    const [bookId, setBookId] = useState(null);
    const [deleteBook, setDeleteBook] = useState(null);
    const [deleteBookId, setDeleteBookId] = useState(null);

    const handleClose = () => setOpen(false);
    const fetchBooks = async () => {
        try {
            const response = await getBooks();
            setBooks(response.data.data);
        } catch (error) {
            console.error('Error', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleEdit = (id: number) => {
        setStatus(books?.data?.find((book) => book?.book?.id === id).status)
        setBookId(id)
        setOpen(true)
    };

    const onDelete=(id: number)=>{
        setOpenDelete(true)
        setDeleteBookId(id)
        setDeleteBook(books?.data?.find((book) => book?.book?.id === id).book)
    }
    const handleDelete=()=>{
        deleteBookById(deleteBookId).then(res=> res.status === 200 && window.location.reload());
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newStatus = event.target.value as number;
        setStatus(newStatus);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateBook(bookId, status).then(res => res.status=== 200 && window.location.reload() )
        setOpen(false);

    };

    const searchRequest= async (query: string) => {
        try {
            const response = await searchBook(query);
            if (response.data && response.data.isOk) {
                setBooks(response.data.data);
            } else {
                setBooks([]);
            }
        } catch (error) {
            console.error('Error', error);
        }
    };
    const debouncedSearch = useCallback(
        _.debounce((query: string) => {
            searchRequest(query);
        }, 1000),
        []
    );

    const handleSearch=(event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event)
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
                Book Lists
            </Typography>
            <TextField
                label="Search Books"
                onChange={(e) => handleSearch(e.target.value)}
                sx={{ mb: 2 , width: 350}}
            />
            <List className="card-body">
                {books?.map((item, index) => (
                        <BookCard book={item.book || item} status={item.status} key={index} onEdit={handleEdit} onDelete={onDelete}/>
                ))}
            </List>
            {
                openDelete && <CustomModal open={openDelete} onClose={()=>setOpenDelete(false)} onSubmit={handleDelete}>
                    <Typography variant="h6" id="custom-modal-title">
                        Delete Book
                    </Typography>
                    <Typography id="custom-modal-description" sx={{ mt: 2 }}>
                        {deleteBook.title}
                    </Typography>
                </CustomModal>
            }
            <CustomModal open={open} onClose={handleClose} onSubmit={handleSubmit}>
                <Typography variant="h6" id="custom-modal-title">
                    Edit Book Status
                </Typography>
                <Typography id="custom-modal-description" sx={{ mt: 2 }}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            defaultValue={status}
                            onChange={handleChange}
                            label="Status"
                        >
                            <MenuItem value={0}>New</MenuItem>
                            <MenuItem value={1}>Reading</MenuItem>
                            <MenuItem value={2}>Finished</MenuItem>
                        </Select>
                    </FormControl>
                </Typography>
            </CustomModal>
        </Box>
    );
};

export default BookList;
