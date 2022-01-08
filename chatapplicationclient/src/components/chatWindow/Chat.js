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
        if (props.friendName === '')
            return;

        if (props.friendName === last) {
            return;
        }
        //console.log("here");
        //console.log(props.friendId);
        const getList = async () => {

            const bearer = 'Bearer ' + localStorage.getItem('token');
            const url = baseUrl + 'chat/getChat/' + props.friendId;
            //console.log("iii");
            const res = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                }
            })

            let response = res.data.chat;
            //console.log(response[0]._id);
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
                if (response[i].receiver == props.friendId) {
                    nchat.type = 'sender';
                } else {
                    nchat.type = 'receiver';
                }
                li.push(nchat);
            }
            setChatList(li);
        }

        
            getList();
            setLast(props.friendName);

            setTimeout(() => {
                const element = document.querySelectorAll('.msgDiv');
                if (element) document.getElementById('chatList').scrollTop = element[element.length - 1].offsetTop;
            }, 300);


        
        //console.log(JSON.stringify(chatList));
    }, [props.friendName, chatList, last]);



    return (
        
        <div className='mainChatWindow'>
            
            {props.friendName !== '' ?
                <>
                    <ChatHeader receiverId={props.friendId} friendName={props.friendName}/>
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
                        receiverId={props.friendId}
                    />
                    <ChatFooter
                        postChat={props.postChat}
                        postFile={props.postFile}
                        receiver={props.friendId}
                        last={setLast}
                        socket={socket.current}
                        userId={jwt(localStorage.getItem('token'))._id}
                        receiverId={props.friendId}
                    />
                </>
                :
                <div> Empty </div>
            }
        </div>
    );
}

export default Chat;