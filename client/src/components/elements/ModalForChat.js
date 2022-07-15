import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Send } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import { UserContext } from '../../context/user';

const myIP = "192.168.0.14";
const socket = new WebSocket(`ws://${myIP}:3002`);

function ModalForChat({ id }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [ownMessage, setOwnMessage] = useState(false);
  const userNamed = user.name;
  const userId = user.id;
  console.log('id', user.id);
  const iD = useParams();
  console.log('ID', iD.id);
  const roomId = (iD.id);

  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    socket.send(JSON.stringify({ type: 'GET_MESSAGES', roomId }));
  }, []);

  useEffect(() => {
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'CONNECTION', postId: id, userNamed, userID: userId }));
    };
    socket.onmessage = (messageEvent) => {
      const { type, payload } = JSON.parse(messageEvent.data);
      switch (type) {
        case 'GET_MESSAGES':
          setConversation(payload);
          break;
        case 'NEW_MESSAGES':
          console.log(payload);
          setConversation((prev) => [...prev, payload]);
          break;

        default:
          break;
      }
    };
  }, [socket, conversation]);

  const sendMessage = async (e) => {
    e.preventDefault();

    socket.send(JSON.stringify({ type: 'NEW_MESSAGES', payload: { message: value, id: user.id, postId: id, userNamed } }));
    setTimeout(() => {
      socket.send(JSON.stringify({ type: 'GET_MESSAGES' }));
    }, 70);

    setValue("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <div className="email-modal-icon">
      <Button
        onClick={handleClickOpen}
        variant="contained"
        disableElevation
        startIcon={<ChatIcon />}
      >
        Чат
      </Button>

      <Dialog className="email-modal" open={open} onClose={handleClose}>

        <div className="row py-5">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <form name="chat" onSubmit={sendMessage} className="row justify-content-end">
                  <input value={value} onChange={(e) => setValue(e.target.value)} name="message" type="text" id="inputMessage" className="form-control" />
                  <button type="submit" className="my-1 btn btn-outline-success">OK</button>
                </form>
              </div>
              <div className="flex-container" style={{ overflow: 'hidden' }}>
                <div className="chatBox">
                  {conversation && conversation.map((el, index) => (
                    <div key={index}>
                      <span className={user ? 'own-message-name' : 'message-name'}>
                        {el.userName}
                        {' '}
                        :
                      </span>
                      <br />
                      <span className={user ? 'own-message-message' : 'message-message'}>{el.message}</span>
                    </div>

                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogActions>
          <TextField
            label="Multiline"
            multiline
            maxRows={4}
            value={value}
            onChange={handleChange}
          />
          <Button variant="outlined" onClick={handleClose}>Отмена</Button>
          <Button type="submit" variant="contained" endIcon={<Send />}>Отправить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalForChat;
