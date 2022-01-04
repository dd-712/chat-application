import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label
} from 'reactstrap';
import './chatWindowStyles.css';

function ChatMessage(props) {

  const [modelOpen, setState] = useState(false);

  function toggleModal() {
    setState(!modelOpen);
  }

  async function deleteChat() {
    await props.deleteChat(props._id);
    props.last('newOne');
  }

  if (props.data === 1) {
    return (
      <div key={props.index} className={`msgDiv ${props.type}`} >
        <div className='text'>{props.info}</div>
        <div className='time'>
          <div className='timeContent'>{props.time}</div>
        </div>
        <div className='deleteArrow' onClick={toggleModal}><i class="fas fa-chevron-right"></i></div>
        <Modal isOpen={modelOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}><button onClick={() => { deleteChat(); toggleModal(); }}>Delete Chat</button></ModalHeader>
        </Modal>
      </div>
    );
  }
  else {
    return (
      <div key={props.index} className={`msgDiv ${props.type}`} >
        <div className='File'>{props.File.title}</div>
        <div className='time'>
          <div className='timeContent'>{props.time}</div>
        </div>
        <div className='downloadBtn' onClick={e => console.log('pressed')}>
          <i className="fas fa-arrow-circle-down downloadBtn"></i>
        </div>
        <div className='deleteArrow' onClick={toggleModal}><i class="fas fa-chevron-right"></i></div>
        <Modal isOpen={modelOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}><button onClick={() => { deleteChat(); toggleModal(); }}>Delete Chat</button></ModalHeader>
        </Modal>
      </div>
    );
  }
}

export default ChatMessage;