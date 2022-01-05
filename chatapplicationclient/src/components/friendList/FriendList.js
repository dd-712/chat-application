import React, { useState, useEffect } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import io from 'socket.io-client';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';
import Friend from './Friend';

const socket = io("http://localhost:3001");

function FriendList(props) {

    const [modelOpen, setState] = useState(false);
    const [username, setUserName] = useState();
    const [searchWord, setSearchWord] = useState('');

    const [friendList, setFriendList] = useState([]);
    const [alert, setAlert] = useState(false);

    useEffect(() => {

        if (friendList.length && !alert) {
            return;
        }
        // console.log(searchWord);
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
            if (searchWord === '')
                setFriendList(li);
            else {
                const regex = new RegExp(searchWord, 'gi');

                let newFriendList = [];
                for (let i = 0; i < li.length; i++) {
                    if (li[i].username.match(regex) !== null)
                        newFriendList.push(li[i]);
                }

                setFriendList(newFriendList);
            }
        }

        getList();

    }, [alert, friendList])

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                setAlert(false);
                setSearchWord('');
            }, 100)
        }
    }, [alert])

    function toggleModal() {
        setState(!modelOpen);
    }

    function addFriend(event) {
        event.preventDefault();
        toggleModal();
        props.postFriends(username);
        setAlert(true);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setAlert(true);
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
                    setAlert={setAlert}
                    className='friendList'
                />
            </div>
        </div>
    );
}

export default FriendList;