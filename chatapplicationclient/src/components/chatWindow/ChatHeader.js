import * as React from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';

function ChatHeader(props) {
  return (
      <header className="chatWindowHeader">
        <span className='friendName'>name</span>
        <span className='audioIcon'><img src='./audio-chat.png' width='30px' /></span>
        <span className='videoIcon'><img src='./video-chat.png' width='30px' /></span>
      </header>
  );
}

export default ChatHeader;