import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';
import './stylesFriendList.css';

function Friend(props) {

  var FriendList = props.friendList.map((info, index) => {
    return (
      <div key={index}>
        <Link className="link" to={`/${'connect__' + info.username}/${info._id}`} >
          <div className='friendBox'>
            <div className='uname'>{info.username}</div>
            <div className="remove">
              <button className='btn' onClick={() => { props.deleteFriend(info._id); props.setAlert(true); }}><i class="far fa-trash-alt"></i></button>
            </div>
          </div>
        </Link>
      </div>
    );
  });
  if ( props.friendList.length == 0)
    FriendList = "No Friend found";
  return (
    <div className='friendList'>
      {FriendList}
    </div>
  );
}

export default Friend;