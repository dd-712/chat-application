import * as React from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';
import ChatMessage from './ChatMessage';

function ChatList(props) {

    return (
        <div className='chatMessageDiv'>
            <ChatMessage fetchChat={props.fetchChats} postChat={props.postChat} deleteChat={props.deleteChat} postFile={props.postFile} data={props.data}/>
        </div>
        
    );
}

export default ChatList;