import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import axios from 'axios';
import './chatWindowStyles.css';


import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ChatList from './ChatList';

function Chat(props) {

    const [friend, setFriend] = useState('');
    const [id, setId] = useState('id');
    const [chatList, setChatList] = useState([]);
    const [last, setLast] = useState('');

    let found = 0;

    useEffect(() => {
        let url = window.location.href.split("/");

        for (let i = 2; i < url.length; i++) {
            if (url[i].length >= 9 && url[i].slice(0, 9) == 'connect__' && i + 1 != url.length) {
                found = 1;
                setFriend(url[i].slice(9, url[i].length));
                setId(url[i + 1]);
                break;
            }
        }
    })

    useEffect(() => {
        alert(last);
        if (friend === '')
            return;

        if (friend === last) {
            return;
        }

        const getList = async () => {

            const bearer = 'Bearer ' + localStorage.getItem('token');
            const url = baseUrl + 'chat/getChat';
            const data = {
                'receiver': id,
            };

            const res = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                }
            })

            let response = res.data.chat;

            let li = [];

            for (let i = 0; i < response.length; i++) {
                let date_object = new Date();
                date_object.setTime(Date.parse(response[i].time));

                var min = date_object.getUTCMinutes();
                var hour = date_object.getUTCHours();
                let nchat = {
                    "_id": response[i]._id,
                    "sender": response[i].sender,
                    "receiver": response[i].receiver,
                    "type": "",
                    "text": response[i].text,
                    "File": response[i].File,
                    "title": response[i].title,
                    "data": response[i].data,
                    "time": hour + ":" + min
                };
                if (response[i].receiver == id) {
                    // if (nchat.data == 1)
                        nchat.type = 'sender';
                    // else
                    //     nchat.type = 'sender fileSender';

                } else {
                    // if (nchat.data == 1)
                        nchat.type = 'receiver';
                    // else
                    //     nchat.type = 'receiver fileReceiver';
                }
                li.push(nchat);
            }
            setChatList(li);
        }

        if (found == 1) {
            getList();
            setLast(friend);
        }

    }, [friend, chatList]);


    return (
        <div className='mainChatWindow'>
            {friend !== '' ?
                <>
                    <ChatHeader />
                    <ChatList
                        className='List'
                        chatList={chatList}
                        postChat={props.postChat}
                        deleteChat={props.deleteChat}
                        postFile={props.postFile}
                        data={props.data}
                    />
                    <ChatFooter postChat={props.postChat} postFile={props.postFile} receiver={id} last={setLast}/>
                </>
                :
                <div> Empty </div>
            }
        </div>
    );
}

export default Chat;