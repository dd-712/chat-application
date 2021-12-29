import * as React from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';

import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ChatList from './ChatList';


function Chat(props) {

    return (
        <div>
            <ChatHeader />
            <ChatList />
            <ChatFooter />
        </div>
    );
}

export default Chat;