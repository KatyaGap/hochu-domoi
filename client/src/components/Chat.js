import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/user';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const { user } = useContext(UserContext);

  const subscribe = async () => {
    try {
      const { data } = await axios.get('http://192.168.1.37:3001/get-messages');
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (error) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };

  useEffect(() => {
    subscribe();
  }, []);

  const sendMessage = async () => {
    await axios.post(`http://192.168.1.37:3001/new-messages`, {
      message: value,
      id: Date.now(),
      userName: user.name,
    });
  };

  return (
    <div className="center">
      <div className="form">
        <input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
        <button onClick={sendMessage} type="submit">Send</button>
      </div>
      <div className="messages">
        {messages.map((mess) => (
          <div className="message" key={mess.id}>
            <div>
              {mess.userName}
              :
              {mess.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
