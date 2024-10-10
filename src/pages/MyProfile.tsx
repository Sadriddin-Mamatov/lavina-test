import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../api';
import { Box, Typography, CircularProgress } from '@mui/material';

const Myself = () => {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    console.log(userInfo, "dajsbdabshdbashbdhasbd")
    const fetchUserInfo = async () => {
        try {
            const response = await getUserInfo();
            setUserInfo(response.data.data);
        } catch (err) {
            setError('Foydalanuvchi ma\'lumotlarini olishda xato');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h1">
                Mening ma'lumotlarim
            </Typography>
            <Typography variant="body1">Ism: {userInfo?.name}</Typography>
            <Typography variant="body1">Email: {userInfo?.email}</Typography>
            <Typography variant="body1">Key: {userInfo?.key}</Typography>
        </Box>
    );
};

export default Myself;
