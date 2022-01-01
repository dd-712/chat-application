import { string } from 'prop-types';
import React, { forwardRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import axios from 'axios';
import './chatWindowStyles.css';

function ChatMessage(props) {

    const [friend, setFriend] = useState('');
    const [id, setId] = useState('id');
    const [chatList, setChatList] = useState([]);
    const [alerts, setAlert] = useState(false);
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

        const getList = async () => {

            const bearer = 'Bearer ' + localStorage.getItem('token');
            const url = baseUrl + 'chat/getChat';
            const data = {
                'receiver': id,
              };
            const res = await axios.post(url,data,{
              headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
              }

            })
      
            let response = res.data.chat;
            //alert(JSON.stringify(response));
            let li = [];
            
            for (let i = 0; i < response.length; i++) {
                let date_object = new Date();
                date_object.setTime(Date.parse(response[i].time));

                var min = date_object.getUTCMinutes();
                var hour = date_object.getUTCHours();
                let nchat={"_id":response[i]._id,
                            "sender":response[i].sender,
                            "receiver":response[i].receiver,
                            "type":"",
                            "text":response[i].text,
                            "File":response[i].File,
                            "title": response[i].title,
                            "data":response[i].data,
                            "time":hour+":"+min};
                if(response[i].receiver==id)
                nchat.type='sender';
                else
                nchat.type='receiver';
              li.push(nchat);
            }
            //alert(JSON.stringify(li));
            setChatList(li);
           
          }
        if(found==1)
        getList();
    },[alerts], [chatList]);
    
    useEffect(() => {
        if (alerts) {
          setTimeout(() => {
            setAlert(false);
          }, 1000)
        }
      }, [alerts])
    
      var Chats = chatList.map((info, index) => {
        return (
          <div key={index}>
            <div className={`msg ${info.type}`} >
                <div className='text'>{info.text}</div>
                <div className='time'> {info.time}</div>
            </div >
          </div>
        );
      });

    return (
        <div>
            {Chats}
        </div>

    );
}

export default ChatMessage;