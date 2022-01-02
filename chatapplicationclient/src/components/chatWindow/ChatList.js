import * as React from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';
import ChatMessage from './ChatMessage';

function ChatList(props) {

    return (
        <div id="">
            {props.chatList.map((info, index) => {
                return (
                    <ChatMessage
                        key={index}
                        type={info.type}
                        info={info.text}
                        time={info.time}
                    />
                );
            })}
        </div>
    );
    // return (
    //     <div className='chatMessageDiv'>
    //         <ChatMessage fetchChat={props.fetchChat} postChat={props.postChat} deleteChat={props.deleteChat} postFile={props.postFile} data={props.data}/>
    //     </div>
    // );
}

export default ChatList;