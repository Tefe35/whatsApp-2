import { Avatar, Button, IconButton } from '@material-ui/core';
import React from 'react';
import '../Components/Css/Chat.css';
import { useEffect, useState } from 'react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { AttachFile } from '@material-ui/icons';
import PhoneIcon from '@material-ui/icons/Phone';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function Chat() {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      //Room name
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      //messages
      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <IconButton>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        </IconButton>

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen{' : '}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <PhoneIcon />
          </IconButton>

          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>

          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <div
            className={`chat__message ${
              message.name === user.displayName && ' chat__reciver'
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </div>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <AttachFile />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <Button hidden disabled={!input} onClick={sendMessage} type="submit">
            Send message
          </Button>
        </form>

        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
