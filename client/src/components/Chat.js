import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');

  const subscribe = async () => {
    try {
      const { data } = await axios.get('http://192.168.1.37:4000/get-messages');
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
    await axios.post(`http://192.168.1.37:4000/new-messages`, {
      message: value,
      id: Date.now(),
    });
  };

  return (
    <div className="center">
      <div className="form">
        <input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
        <button onClick={sendMessage} type="button">Send</button>
      </div>
      <div className="messages">
        {messages.map((mess) => <div className="message" key={mess.id}>{mess.message}</div>)}
      </div>
    </div>
  );
}

export default Chat;
