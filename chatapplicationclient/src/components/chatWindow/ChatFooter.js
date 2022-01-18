import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import './chatWindowStyles.css';

function ChatFooter(props) {
    const [message, setMessage] = useState('');
    const [data, setData] = useState(1);
    const [File, setFile] = useState(null);
    const [title, setTitle] = useState('No title');
    const [modelOpen, setState] = useState(false);


    function toggleModal() {
        setState(!modelOpen);
    }

    async function sendFile(event) {
        toggleModal();
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            "File",
            File,
            File.name
        );
        props.postFile(formData, props.receiver, 'File', 0, File.name);
        setTimeout(() => {
            props.last('newOne');
        }, 300);

        props.socket.emit("sendMessage", {
            senderId: props.userId,
            receiverId: props.receiverId
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (message === '')
            return;
        let receiver = props.receiver;
        await props.postChat(
            receiver, message, data, title, "Not a File"
        );
        document.getElementById("chatInput").reset();
        props.last('newOne');
        props.socket.emit("sendMessage", {
            senderId: props.userId,
            receiverId: props.receiverId
        });
    }
    const handleKeypress = e => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const onFileChange = event => {
        setFile(event.target.files[0]);
    };

    return (
        <footer className="chatWindowFooter">
            <span className="file far fa-file-alt" onClick={toggleModal} />
            <form className='inputForm' id="chatInput">
                <input id="textField" className="inputMessage" onChange={e => setMessage(e.target.value)} type="message" placeholder="Enter Message" autoComplete="off" onKeyDown={handleKeypress} />
                <span className="sendButton" onClick={handleSubmit}><i class="fas fa-paper-plane"></i></span>
            </form>
            <Modal isOpen={modelOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Select File</ModalHeader>
                <ModalBody>
                    <Form onSubmit={sendFile}>
                        <FormGroup>
                            <Label htmlFor="file">Upload File</Label>
                            <Input type="file" id="file" name="file" className='inputOp'
                                onChange={onFileChange} />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Send</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </footer>
    );
}

export default ChatFooter;