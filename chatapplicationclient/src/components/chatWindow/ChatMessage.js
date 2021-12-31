import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';

function ChatMessage(props) {

    const [user, setuser] = useState('receiver');
    const [msgType, setMsgType] = useState('msg');

    return (
        <div className={`${user}`} >
            <div>msg</div>
            <div>time</div>
        </div >
    );
}

export default ChatMessage;