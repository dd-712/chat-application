import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import FriendList from './friendList/FriendList';
import Chat from './chatWindow/Chat';
import Header from './Header';

function Combine(props) {
    const [friendId, setFriendId] = useState('Empty');
    const [friendName, setFriendName] = useState('Empty');
   

    return (
        <div>
            
            <Header auth={props.auth} logoutUser={props.logoutUser} />
            <div className='mainDiv'>
                <div className='row' >
                    <div className='col-lg-3' style={{padding: '0px'}}>
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
                        />
                    </div>
                    <div className='col-lg-9' style={{padding: '0px'}}>
                        <Chat
                            fetchChat={props.fetchChats}
                            postChat={props.postChat}
                            deleteChat={props.deleteChat}
                            postFile={props.postFile}
                            data={props.chats}
                            friendId={friendId}
                            friendName={friendName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Combine;