/* eslint-disable no-case-declarations */
import { useSelect } from '@mui/base';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import { UserContext } from '../context/user';

const socket = new WebSocket('ws://192.168.1.37:3001');

function Chat({ id }) {
  const { user } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [sendTo, setSendTo] = useState(null);
  const userNamed = user.name;
  const userId = user.id;
  const iD = useParams();
  console.log(iD.id);
  const newPostId = (iD.id);

  // console.log('========>', userId);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    socket.send(JSON.stringify({ type: 'GET_MESSAGES' }));
  }, []);

  useEffect(() => {
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'CONNECTION', postId: id, userNamed, userID: userId, newPostId }));
    };
    socket.onmessage = (messageEvent) => {
      const { type, payload } = JSON.parse(messageEvent.data);
      // console.log('-=-=-=-=-=-', type, payload);
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
    }, 30);

    setValue("");
  };

  return (
    <>
      <div className="col-8">
        <div className="card">
          <div className="card-header">
            Chat
          </div>
          <div id="chat" className="card-body" />
        </div>
      </div>
      <div className="row py-5">
        <div className="col-4">
          <div className="card">
            <div className="card-header">
              Type something

            </div>
            <div className="card-body">
              <form name="chat" onSubmit={sendMessage} className="row justify-content-end">
                <input value={value} onChange={(e) => setValue(e.target.value)} name="message" type="text" id="inputMessage" className="form-control" />
                <button type="submit" className="my-1 btn btn-outline-success">OK</button>
              </form>
            </div>
            <div className="chat" style={{ overflow: 'hidden' }}>
              {conversation.map((el, index) => (
                <div key={index}>
                  <span>
                    {el.userName}
                    {' '}
                    :
                  </span>
                  <br />
                  <span>{el.message}</span>
                </div>

              ))}
            </div>
          </div>
        </div>
        <div />
      </div>
      {/* </div> */}
    </>

  );
}

export default Chat;
