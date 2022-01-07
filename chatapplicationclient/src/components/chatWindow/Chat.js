import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import axios from 'axios';
import io from 'socket.io-client';
import jwt from 'jwt-decode';
import './chatWindowStyles.css';


import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ChatList from './ChatList';

function Chat(props) {

    const [friend, setFriend] = useState('');
    const [id, setId] = useState('id');
    const [chatList, setChatList] = useState([]);
    const [last, setLast] = useState('');
    const socket = useRef();
    let found = 0;

    useEffect(() => {
        socket.current = io(baseUrl.slice(0,baseUrl.length-1));
        socket.current.emit("addUser", jwt(localStorage.getItem('token'))._id);
        socket.current.on("getMessage", (data) => {
            setLast('');
        });
    }, []);



    useEffect(() => {
        let url = window.location.href.split("/");

        for (let i = 2; i < url.length; i++) {
            if (url[i].length >= 9 && url[i].slice(0, 9) == 'connect__' && i + 1 != url.length) {
                found = 1;
                setFriend(url[i].slice(9, url[i].length));
                let len = url[i + 1].length;
                if (url[i + 1].indexOf("?") != -1)
                    len = url[i + 1].indexOf("?");
                //alert(url[i+1].slice(0,len));
                setId(url[i + 1].slice(0, len));
                break;
            }
        }
    })

    useEffect(() => {

        if (friend === '')
            return;

        if (friend === last) {
            return;
        }

        const getList = async () => {

            const bearer = 'Bearer ' + localStorage.getItem('token');
            const url = baseUrl + 'chat/getChat/' + id;


            const res = await axios.get(url, {
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
                    nchat.type = 'sender';
                } else {
                    nchat.type = 'receiver';
                }
                li.push(nchat);
            }
            setChatList(li);
        }

        if (found == 1) {
            getList();
            setLast(friend);

            setTimeout(() => {
                const element = document.querySelectorAll('.msgDiv');
                if (element) document.getElementById('chatList').scrollTop = element[element.length - 1].offsetTop;
            }, 300);


        }
    }, [friend, chatList, last]);



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
                        last={setLast}
                        socket={socket.current}
                        userId={jwt(localStorage.getItem('token'))._id}
                        receiverId={id}
                    />
                    <ChatFooter
                        postChat={props.postChat}
                        postFile={props.postFile}
                        receiver={id}
                        last={setLast}
                        socket={socket.current}
                        userId={jwt(localStorage.getItem('token'))._id}
                        receiverId={id}
                    />
                </>
                :
                <div> Empty </div>
            }
        </div>
    );
}

export default Chat;