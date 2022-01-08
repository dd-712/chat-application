import React, { forwardRef, useState, useEffect } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './chatWindowStyles.css';

function ChatHeader(props) {

    const [friend, setFriend] = useState('');
    const [id, setId] = useState('id');
    const [modelOpen, setState] = useState(false);

    function toggleModal() {
        setState(!modelOpen);
    }

    return (
        <header className="chatWindowHeader">
            <span className='friendName'>{props.friendName}</span>
            <span className='audioIcon'><i class="fas fa-phone-alt"></i></span>
            <span className='videoIcon' onClick={toggleModal}><i class="fas fa-video"></i></span>
            <Modal isOpen={modelOpen} toggle={toggleModal} className='modelDialog' centered>
                <ModalBody className='videoChat'>
                    <div className='videoGrid'>
                        <div id='user1' className='videoWindow'></div>
                        <div id='user2' className='videoWindow'></div>
                    </div>
                    <div className='videoOnOff'><i class="fas fa-video"></i></div>
                </ModalBody>
            </Modal>
        </header>
    );
}

export default ChatHeader;