import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../api';
import { Box, Typography, CircularProgress } from '@mui/material';

const Profile = () => {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetchUserInfo = async () => {
        try {
            const response = await getUserInfo();
            setUserInfo(response.data.data);
        } catch (err) {
            setError('Error');
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
                My profile
            </Typography>
            <Typography variant="body1">Name: {userInfo?.name}</Typography>
            <Typography variant="body1">Email: {userInfo?.email}</Typography>
            <Typography variant="body1">Key: {userInfo?.key}</Typography>
        </Box>
    );
};

export default Profile;
