import { string } from 'prop-types';
import React, { forwardRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';

function ChatMessage(props) {

    const [friend, setFriend] = useState('receiver');
    const [id, setId] = useState('id');
    const [msgType, setMsgType] = useState('msg');
    const [chatList, setChatList] = useState([]);
    
    var url=window.location.href.split("/");
   /* 
    var found=0;
    for(var i=0;i<url.length;i++)
    {

        if(url[i].length>=9&&url[i].slice(0,9)=='connect__'&&i+1!=url.length)
        {
            found=1;
            setFriend(url[i].slice(9,url[i].length));
            setId(url[i+1]);
            break;
        }
    }
   */
    
      //alert(props.data.chats);

    return (
        <div>
            <div className={`msg ${friend}`} >
                <div className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque maximus nunc accumsan tincidunt rutrum. Proin viverra, nunc a hendrerit facilisis, lectus sapien dapibus urna, ut consequat mi mi vitae leo. Nunc sed velit ac lectus pellentesque dictum. Vestibulum venenatis, quam nec commodo sagittis, ipsum ipsum mattis arcu, at consequat erat mi ut quam. Donec vehicula, sapien a malesuada volutpat, nunc risus lacinia mi, vitae volutpat odio ex et lorem. Maecenas varius metus sed lacinia gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id tincidunt justo.</div>
                <div className='time'> time</div>
            </div >
            
        </div>

    );
}

export default ChatMessage;