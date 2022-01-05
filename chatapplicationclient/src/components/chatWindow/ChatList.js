import * as React from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';
import ChatMessage from './ChatMessage';

function ChatList(props) {

    return (
        <div id='chatList'>
            {props.chatList.map((info, index) => {
                return (
                    <ChatMessage
                        key={index}
                        type={info.type}
                        info={info.text}
                        time={info.time}
                        _id={info._id}
                        sender={info.sender}
                        receiver={info.receiver}
                        File={info.File}
                        title={info.title}
                        data={info.data}
                        deleteChat={props.deleteChat}
                        last={props.last}
                        socket={props.socket}
                        userId={props.socket}
                        receiverId={props.socket}
                    />
                );
            })}
        </div>
    );
}

export default ChatList;