import { string } from 'prop-types';
import React, { forwardRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';

function ChatMessage(props) {

    const [type,setType]=useState('receiver');
    const [friend, setFriend] = useState('');
    const [id, setId] = useState('id');
    const [msgType, setMsgType] = useState('msg');
    const [chatList, setChatList] = useState([]);
    
    useEffect(()=>{
        let url=window.location.href.split("/");
    
        let found=0;
        for(let i=2;i<url.length;i++)
        {
            if(url[i].length>=9&&url[i].slice(0,9)=='connect__'&&i+1!=url.length)
            {
                found=1;
                setFriend(url[i].slice(9,url[i].length));
                setId(url[i+1]);
                break;
            }
        }
        // alert(friend);
    });
    
   
    
    // alert(props.data.chats);

    return (
        <div>
            <div className={`msg ${type}`} >
                <div className='text'>Hello</div>
                <div className='time'> time</div>
            </div >
        </div>

    );
}

export default ChatMessage;