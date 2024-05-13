import { Box, Typography, Button, Modal, } from '@mui/material';

export const ConfirmDeletePopup = ({ open, onClose, onConfirmDelete }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 250,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography variant="h6" id="modal-title" sx={{ textAlign: 'center' }}>
          Do you want to delete this voice?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2,  gap:"10px"}}>
        <Button onClick={onClose} variant="contained" sx={{ width: '20%', bgcolor: '#72B216', color: 'white',fontWeight: 'bold' }}>
  No
</Button>
<Button onClick={onConfirmDelete} variant="contained" sx={{ width: '20%', bgcolor: 'red', color: 'white',fontWeight: 'bold' }}>
  Yes
</Button>
        </Box>
      </Box>
    </Modal>
  );
};