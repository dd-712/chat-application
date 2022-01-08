import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { curUrl,baseUrl } from '../../shared/baseUrl';
import './stylesFriendList.css';
import jwt from 'jwt-decode';

let cnt = 0;

function Friend(props) {
  
  const getList = async (id) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    const url = baseUrl + 'chat/getChat/' + id;


    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
      }
    })

    let response = res.data.chat;

    for (let i = 0; i < response.length; i++) {
      await props.deleteChat(response[i]._id);
    }
  }

  

  async function removeSecondAndChat(_Id) {
    let curId = jwt(localStorage.getItem('token'));
    await getList(_Id);
    await props.deleteFriend(curId._id, _Id);
    await props.deleteFriend(_Id, curId._id);
    props.setAlert(true);
    
    props.socket.emit("newFriend", {
      senderId: curId._id,
      receiverId: _Id
    });
  }
 
  function changeState(info){
    //alert(props.friendId);
    props.setFriendId(info._id);
    //alert(props.friendId);
    props.setFriendName(info.username);
  }

  var FriendList = props.friendList.map((info, index) => {
    return (
      <div key={index} onClick={()=>changeState(info)}>
          <div className='friendBox'>
            <div className='uname'>{info.username}</div>
            <div className="remove">
              <button className='btn' onClick={() => { removeSecondAndChat(info._id); }}><i class="far fa-trash-alt"></i></button>
            </div>
          </div>
        
      </div>
    );
  });

  if (props.friendList.length == 0 || props.friendList[0] === 'none') {
    FriendList = "No Friend found";
  }
  
  cnt++;
  return (
    <div className='friendList'>
      {FriendList}
    </div>
  );
}

export default Friend;