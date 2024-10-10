import React from 'react';
import { Modal, Box, Button } from '@mui/material';

interface CustomModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void; // Submit tugmasi uchun funksiya
    children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, onSubmit, children }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="custom-modal-title"
            aria-describedby="custom-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '8px',
                }}
            >
                {children}

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        Submit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CustomModal;
