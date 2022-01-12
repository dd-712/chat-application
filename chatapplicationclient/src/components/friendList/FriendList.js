import React, { useState, useEffect, useRef } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import axios from 'axios';
import { curUrl, baseUrl } from '../../shared/baseUrl';
import Friend from './Friend';
import jwt from 'jwt-decode';


function FriendList(props) {

    const [modelOpen, setState] = useState(false);
    const [username, setUserName] = useState();
    const [searchWord, setSearchWord] = useState('');
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        
        if (friendList.length && !props.alerts) {
            return;
        }
        const getList = async () => {

            const bearer = 'Bearer ' + localStorage.getItem('token');
            const url = baseUrl + 'users/connections';

            const res = await axios.get(url, {
                headers: {
                    Authorization: bearer
                }
            })

            var response = res.data;
            var li = [];
            for (var i = 0; i < response.length; i++) {
                li.push(response[i]);
            }
            if (searchWord !== '') {
                const regex = new RegExp(searchWord, 'gi');

                let newFriendList = [];
                for (let i = 0; i < li.length; i++) {
                    if (li[i].username.match(regex) !== null)
                        newFriendList.push(li[i]);
                }

                li = newFriendList;
            }

            if (li.length == 0)
                li.push('none');
            setFriendList(li);
        }

        getList();

    }, [props.alerts, friendList]);

    useEffect(() => {
        if (props.alerts) {
            setTimeout(() => {
                props.setAlert(false);
                setSearchWord('');
            }, 100)
        }
    }, [props.alerts]);

    function toggleModal() {
        setState(!modelOpen);
    }

    async function findId(username) {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const url = baseUrl + 'users/connections/' + username;


        const res = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })

        let response = res.data._id;
        return response;
    }

    async function addFriend(event) {
        let curId = jwt(localStorage.getItem('token'));
        event.preventDefault();
        toggleModal();
        await props.postFriends(curId._id, username, curId._id);

        let idd = await findId(username);

        if (idd != " ")
            await props.postFriends(idd, props.auth.user.username, curId._id);
        props.setAlert(true);
        props.socket.emit("newFriend", {
            senderId: curId._id,
            receiverId: idd
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        props.setAlert(true);
        document.getElementById("searchFriend").reset();
    }

    return (
        <div className='friendListDiv'>
            <div className='friendListHeader'>
                <form id='searchFriend'>
                    <input type='text' placeholder='Search Friends' className='input' onChange={e => setSearchWord(e.target.value)} />
                    <button className='searchIcon btn' onClick={handleSubmit}><i class="fas fa-search"></i></button>
                </form>
                <button className='friendRequest btn' onClick={toggleModal}><i class="fas fa-user-alt"></i></button>
                <Modal isOpen={modelOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Add Friend</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={addFriend}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    onChange={e => setUserName(e.target.value)}
                                    autocomplete='off'
                                />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Add</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
            <div>
                <Friend
                    deleteFriend={props.deleteFriend}
                    word={searchWord}
                    friendList={friendList}
                    setAlert={props.setAlert}
                    deleteChat={props.deleteChat}
                    className='friendList'
                    socket={props.socket}
                    setFriendId={props.FriendId}
                    setFriendName={props.FriendName}
                    friendId={props.friendId}
                />
            </div>
        </div>
    );
}

export default FriendList;