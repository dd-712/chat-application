import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label } from 'reactstrap';
import './chatWindowStyles.css';

function ChatMessage(props) {

  const [modelOpen, setState] = useState(false);
  function toggleModal() {
    setState(!modelOpen);
  }
  function deleteChat(){
    props.deleteChat(props._id);
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
          <ModalHeader toggle={toggleModal}><button onClick={deleteChat}>Delete Chat</button></ModalHeader>
        </Modal>
      </div>
    );
  }
  else {
    // let ext = props.File.title.slice(props.File.title.lastIndexOf(".") + 1, props.File.title.length);
    // if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif' || ext === 'jfif' || ext === 'PNG' || ext === 'JPG' || ext === 'JPEG' || ext === 'JFIF') {
    //   return (
    //     <div key={props.index} className={`fileDiv ${props.type}`} >
    //       <img width="20%" src={baseUrl + 'Files/' + props.File.filename} alt={props.File.title} />
    //       <div className='time'>
    //         <div className='timeContent'>{props.time}</div>
    //       </div>
    //     </div>

    //   );
    // }
    // else {
    return (
      <div key={props.index} className={`msgDiv ${props.type}`} >
        <div className='File'>{props.File.title}</div>
        <div className='time'>
          <div className='timeContent'>{props.time}</div>
        </div>
        <div className='downloadBtn' onClick={e => console.log('pressed')}>
          <i className="fas fa-arrow-circle-down downloadBtn"></i>
        </div>

      </div>
    );
    // }
  }
}

export default ChatMessage;