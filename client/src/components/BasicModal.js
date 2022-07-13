import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
<<<<<<< HEAD:client/src/components/BasicModal.js
import { useContext } from 'react';
import Chat from './Chat';
=======
import Chat from '../Chat';
>>>>>>> dev:client/src/components/elements/ModalForChat.js

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Отправить сообщение</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="span">
            Чат што ли
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component="div">
            <Chat />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
