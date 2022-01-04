import React, { forwardRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './chatWindowStyles.css';

function ChatHeader(props) {
  
    const [friend, setFriend] = useState('');
    const [id, setId] = useState('id');
    
    useEffect(()=>{
        let url=window.location.href.split("/");
    
        let found=0;
        for(let i=2;i<url.length;i++)
        {
            if(url[i].length>=9&&url[i].slice(0,9)=='connect__'&&i+1!=url.length)
            {
                found=1;
                setFriend(url[i].slice(9,url[i].length));
                let len=url[i+1].length;
                if(url[i+1].indexOf("?")!=-1)
                len=url[i+1].indexOf("?");
                //alert(url[i+1].slice(0,len));
                setId(url[i+1].slice(0,len));
                break;
            }
        }

        if(found==0)
        setFriend('name');
    });
    
    
  return (
      <header className="chatWindowHeader">
        <span className='friendName'>{friend}</span>
        <span className='audioIcon'><i class="fas fa-phone-alt"></i></span>
        <span className='videoIcon'><i class="fas fa-video"></i></span>
      </header>
  );
}

export default ChatHeader;