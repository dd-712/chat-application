import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';
import Friend from './Friend';
  

function FriendList(props) {

    const [modelOpen, setState] = useState(false);
    const [username, setUserName] = useState();

    function toggleModal() {
        setState(!modelOpen);
    }
    function addFriend(event) {
        toggleModal();
        props.postFriends(username);
        window.location.reload(false);
        event.preventDefault();
    }
    return (
        <div className='friendListDiv'>
            <div className='friendListHeader'>
                <input type='text' placeholder='Search Friends' className='input' />
                <div className='searchIcon'><img src='/search-icon.png' width='20px' /></div>
                <div className='friendRequest' onClick={toggleModal}><img src='/person-icon.png' width='20px' /></div>
                <Modal  isOpen={modelOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Add Friend</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={addFriend}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    onChange={e => setUserName(e.target.value)} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Add</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
            <div>
                <Friend deleteFriend={props.deleteFriend} className='friendList'/>
            </div>
        </div>
    );
}

export default FriendList;