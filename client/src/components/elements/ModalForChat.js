import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, IconButton, TextField, Dialog, DialogActions } from '@mui/material';
import { Send, Cancel } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import { UserContext } from '../../context/user';

const myIP = "192.168.43.59";

const socket = new WebSocket(`ws://${myIP}:3002`);
// const socket = new WebSocket(`ws://localhost:3002`);

function ModalForChat({ id }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const [value, setValue] = useState("");
  const userNamed = user.name;
  const userId = user.id;
  console.log('id', user.id);
  const iD = useParams();
  console.log('ID', iD.id);
  const roomId = (iD.id);
  console.log('user.id: ', user.id);

  const [conversation, setConversation] = useState([]);

  // const getData = () => {
  //   const response = axios
  //     .get('https://geolocation-db.com/json/')
  //     .then((res) => {
  //       console.log('res.data: ', res?.data);
  //       setMyIP(res.data.IPv4);
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    socket.send(JSON.stringify({ type: 'GET_MESSAGES', roomId }));
  }, []);

  useEffect(() => {
    socket.onopen = () => {
      console.log('socket opened');
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
    <div className="chat-modal-icon">
      <Button
        onClick={handleClickOpen}
        variant="contained"
        disableElevation
        startIcon={<ChatIcon />}
      >
        Чат
      </Button>

      <Dialog className="chat-modal" open={open} onClose={handleClose}>

        <div className="chat-wrapper">
          <div className="chat-box">

            {conversation && conversation.map((el, index) => (
              <div className={el.userId === user.id ? 'message own-message' : 'message incoming-message'} key={index}>
                <span className="message-name">
                  {el.userName}
                </span>
                <span className="message-text">{el.message}</span>
              </div>
            ))}

          </div>
        </div>

        <form name="chat" onSubmit={sendMessage} className="chat-form">
          <TextField
            label="Ваше сообщение"
            id="inputMessage"
            className="form-control"
            multiline
            maxRows={4}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button size="large" className="chat-send-button" type="submit" variant="contained" endIcon={<Send />}>Отправить</Button>
        </form>

        <div className="dialog-overlay">
          <IconButton onClick={handleClose} aria-label="delete">
            <Cancel />
          </IconButton>
        </div>
      </Dialog>
    </div>
  );
}

export default ModalForChat;
