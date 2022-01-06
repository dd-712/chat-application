import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label
} from 'reactstrap';
import './chatWindowStyles.css';
import { baseUrl } from '../../shared/baseUrl';
import fileDownload from 'js-file-download';
import axios from 'axios';
import { fileSaver } from 'file-saver';

function ShowDeleteArrow({ type, toggleModal, modelOpen, deleteChat }) {
  if (type === 'sender') {
    return (
      <>
        <div className='deleteArrow' onClick={toggleModal} > <i class="fas fa-chevron-right"></i></div>
        <Modal isOpen={modelOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}><button onClick={() => { deleteChat(); toggleModal(); }}>Delete Chat</button></ModalHeader>
        </Modal>
      </>
    )
  } else {
    return (
      <></>
    )
  }
}

function ChatMessage(props) {

  const [modelOpen, setState] = useState(false);

  function toggleModal() {
    setState(!modelOpen);
  }

  async function deleteChat() {
    await props.deleteChat(props._id);
    props.last('newOne');
    props.socket.emit("sendMessage", {
      senderId: props.userId,
      receiverId: props.receiverId
    });
  }
  const handleDownload =async (url, filename) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    //alert(url);
    const res = await axios.get(url, {
      headers: {
          'Authorization': bearer
      },
      responseType: 'blob',
  });
    const urln = window.URL.createObjectURL(new Blob([res.data], { type: filename.split('.')[-1] }));
    const link = document.createElement('a');
    link.href = urln;
    link.download =filename;
    link.click();
  }

  if (props.data === 1) {
    return (
      <div key={props.index} className={`msgDiv ${props.type}`} >
        <div className='text'>{props.info}</div>
        <div className='time'>
          <div className='timeContent'>{props.time}</div>
        </div>
        <ShowDeleteArrow
          type={props.type}
          toggleModal={toggleModal}
          modelOpen={modelOpen}
          deleteChat={deleteChat}
        />
      </div>
    );
  }
  else {/*
    <div className='downloadBtn' onClick={() => handleDownload(baseUrl+'Files/'+props.File.filename,props.File.title)}>
          <i className="fas fa-arrow-circle-down downloadBtn"></i>
        </div>
        <a href={baseUrl+'Files/'+props.File.filename} download>Click to download</a>
        */
    return (
      <div key={props.index} className={`msgDiv ${props.type}`} >
        <div className='File'>{props.File.title}</div>
        <div className='time'>
          <div className='timeContent'>{props.time}</div>
        </div>
        <div className='downloadBtn' onClick={() => handleDownload(baseUrl + 'UploadFile/download/' + props.File.filename, props.File.filename)}>
          <i className="fas fa-arrow-circle-down downloadBtn"></i>
        </div>
        <ShowDeleteArrow
          type={props.type}
          toggleModal={toggleModal}
          modelOpen={modelOpen}
          deleteChat={deleteChat}
        />
      </div>
    );
  }
}

export default ChatMessage;