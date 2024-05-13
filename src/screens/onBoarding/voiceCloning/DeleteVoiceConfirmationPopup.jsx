import React from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';
import { CustomButton } from '../../../components';

const DeleteVoiceConfirmationPopup = ({ open, onClose, onConfirmDelete }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 4,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Typography variant="h6">Are you sure you want to delete this voice?</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
  <CustomButton
    label="No"
    sx={{
      backgroundColor: 'green',
      color: 'white',
      marginRight: 2,
      width:"80px",
      borderRadius: 1,
      fontSize: 12, 
      paddingX: 1,
      paddingY: 0.5,
    }}
    onClick={onClose}
  />
  <CustomButton
    label="Yes"
    sx={{
      backgroundColor: 'red',
      color: 'white',
      width:"80px",
    //   marginLeft: 2,
      borderRadius: 1,
      fontSize: 12,
      paddingX: 1,
      paddingY: 0.5, 
    }}
    onClick={onConfirmDelete}
  />
</Box>

      </Box>
    </Modal>
  );
};

export default DeleteVoiceConfirmationPopup;
