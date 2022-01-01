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
        event.preventDefault();
        toggleModal();
        props.postFriends(username);
        window.location.reload(false);
    }

    return (
        <div className='friendListDiv'>
            <div className='friendListHeader'>
                <input type='text' placeholder='Search Friends' className='input' />
                <button className='searchIcon btn'><i class="fas fa-search"></i></button>
                <button className='friendRequest btn' onClick={toggleModal}><i class="fas fa-user-alt"></i></button>
                <Modal  isOpen={modelOpen} toggle={toggleModal}>
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
                <Friend deleteFriend={props.deleteFriend} className='friendList'/>
            </div>
        </div>
    );
}

export default FriendList;