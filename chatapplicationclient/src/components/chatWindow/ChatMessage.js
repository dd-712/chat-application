import { string } from 'prop-types';
import React, { forwardRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import axios from 'axios';
import './chatWindowStyles.css';

function ChatMessage(props) {
  
  return (
    <div key={props.index} className='msgDiv'>
      <div className={`msg ${props.type}`} >
        <div className='text'>{props.info}</div>
        <div className='time'> {props.time}</div>
      </div>
    </div>
  );
}

export default ChatMessage;