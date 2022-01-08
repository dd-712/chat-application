import React, { forwardRef, useState, useEffect, useRef } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import Peer from "simple-peer";

import './chatWindowStyles.css';

function ChatHeader(props) {

    const [modelOpen, setState] = useState(false);
    const [stream, setStream] = useState();
    const userVideo = useRef();
    const partnerVideo = useRef();

    useEffect(() => {
        if (!modelOpen) {
            if (stream)
                stream.getTracks().forEach(track => track.stop());
        } else {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
                setStream(stream);
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            })
        }

    },[modelOpen]);


    let UserVideo;
    if (stream) {
        UserVideo = (
            <div id='user1' className='videoWindow' playsInline muted ref={userVideo} autoPlay />
        );
    }

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
                        {/* <UserVideo /> */}
                        <div id='user2' className='videoWindow'></div>
                    </div>
                    <div className='videoOnOff'><i class="fas fa-video"></i></div>
                </ModalBody>
            </Modal>
        </header>
    );
}

export default ChatHeader;