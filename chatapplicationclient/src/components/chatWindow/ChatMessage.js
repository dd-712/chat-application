import React, { forwardRef, useState, useEffect } from 'react';
import './chatWindowStyles.css';
import { baseUrl } from '../../shared/baseUrl';

function ChatMessage(props) {
  if(props.data==1)
  {
    return (
      <div key={props.index} className='msgDiv'>
        <div className={`msg ${props.type}`} >
          <div className='text'>{props.info}</div>
          <div className='time'> {props.time}</div>
        </div>
      </div>
    );
  }
  else
  {
    let ext = props.File.title.slice(props.File.title.lastIndexOf(".")+1,props.File.title.length);
   //alert(ext);
    if(ext=='jpg'||ext=='jpeg'||ext=='png'||ext=='gif'||ext=='jfif'||ext=='PNG'||ext=='JPG'||ext=='JPEG'||ext=='JFIF')
    {
      //alert('in');
      return(
        <div key={props.index} className='msgDiv'>
          <div className={`msg ${props.type}`} >
            <div className="card">
                <img width="100%" src={baseUrl+'Files/'+props.File.filename} alt={props.File.title} />
            </div>
            <div className='time'> {props.time}</div>
          </div>
        </div>
      );
    }
    else
    {
      return (
        <div key={props.index} className='msgDiv'>
          <div className={`msg ${props.type}`} >
            <div className='File'>{props.File.title}</div>
            <div className='time'> {props.time}</div>
          </div>
        </div>
      );
    }
  }
}

export default ChatMessage;