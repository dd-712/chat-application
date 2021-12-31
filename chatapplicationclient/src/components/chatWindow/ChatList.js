import * as React from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';
import ChatMessage from './ChatMessage';

function ChatList(props) {

    return (
        <div className='chatMessageDiv'>
            <ChatMessage />
        </div>
        
    );
}

export default ChatList;