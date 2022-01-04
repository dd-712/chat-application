import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label
} from 'reactstrap';
import './chatWindowStyles.css';
import { baseUrl } from '../../shared/baseUrl';
import fileDownload from 'js-file-download';
import axios from 'axios';
import {fileSaver} from 'file-saver';
function ChatMessage(props) {

  const [modelOpen, setState] = useState(false);

  function toggleModal() {
    setState(!modelOpen);
  }

  async function deleteChat() {
    await props.deleteChat(props._id);
    props.last('newOne');
  }
  const handleDownload = (url, filename) => {
    axios({
      method: "get",
      url: url,
      responseType: "blob"
    })
      .then((response) => {
        alert('done');
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/octet-stream" })
        );
        link.download = filename;
    
        document.body.appendChild(link);
    
        link.click();
        setTimeout(function () {
          window.URL.revokeObjectURL(link);
        }, 200);
      })
      .catch((error) => {});
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
        <div className='downloadBtn' onClick={() => handleDownload(baseUrl+'Files/'+props.File.filename,props.File.filename)}>
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