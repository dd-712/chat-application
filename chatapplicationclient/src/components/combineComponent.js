import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import { baseUrl } from '../shared/baseUrl';
import jwt from 'jwt-decode';
import io from 'socket.io-client';
import FriendList from './friendList/FriendList';
import Chat from './chatWindow/Chat';
import Header from './Header';

function Combine(props) {
    const [friendId, setFriendId] = useState('Empty');
    const [friendName, setFriendName] = useState('Empty');
    const [last, setLast] = useState('---');
    const [alert, setAlert] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [displayFriend, setDisplayFriend] = useState('');
    const [displayChat, setDisplayChat] = useState('');

    const socket = useRef();

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []);

    useEffect(() => {
        socket.current = io(baseUrl.slice(0, baseUrl.length - 1));
        socket.current.emit("addUser", jwt(localStorage.getItem('token'))._id);
        socket.current.on("getMessage", (data) => {
            setLast('---');
        });
        socket.current.on("newFriendAdded", (data) => {
            setAlert(true);
        });
    }, []);

    useEffect(() => {
        if(width<768) {
            setDisplayFriend('');
            setDisplayChat('hideComponent');
        } else {
            setDisplayFriend('');
            setDisplayChat('');
        }
    }, [window.innerWidth]);

    return (
        <div>

            <Header auth={props.auth} logoutUser={props.logoutUser} />
            <div className='mainDiv'>
                <div className='row' >
                    <div className={`col-md-3 ${displayFriend} height`} style={{ padding: '0px' }}>
                        <FriendList
                            auth={props.auth}
                            fetchFriends={props.fetchContacts}
                            data={props.contacts}
                            friends={props.friends}
                            //errormess={this.props.errormess.errMess}
                            postFriends={props.postContact}
                            deleteFriend={props.deleteContact}
                            deleteChat={props.deleteChat}
                            FriendId={setFriendId}
                            FriendName={setFriendName}
                            friendId={friendId}
                            friendName={friendName}
                            alerts={alert}
                            setAlert={setAlert}
                            socket={socket.current}
                            errorMess={props.errorMess}
                            setDisplayFriend={setDisplayFriend}
                            setDisplayChat={setDisplayChat}
                        />
                    </div>
                    <div className={`col-md-9 ${displayChat} height`} style={{ padding: '0px' }}>
                        <Chat
                            fetchChat={props.fetchChats}
                            postChat={props.postChat}
                            deleteChat={props.deleteChat}
                            postFile={props.postFile}
                            data={props.chats}
                            friendId={friendId}
                            friendName={friendName}
                            last={last}
                            setLast={setLast}
                            socket={socket.current}
                            setDisplayFriend={setDisplayFriend}
                            setDisplayChat={setDisplayChat}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Combine;