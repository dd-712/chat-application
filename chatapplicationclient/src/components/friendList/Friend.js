import React from 'react';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';
import './friendListStyles.css';
import jwt from 'jwt-decode';

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

  function changeState(info) {
    props.setFriendId(info._id);
    props.setFriendName(info.username);
  }

  var FriendList = props.friendList.map((info, index) => {
    let selected = "";
    if (info._id === props.friendId)
      selected = "friendSelected";

    return (
      <div key={index}
        onClick={() => {
          changeState(info);
          if (window.innerWidth < 768) {
            props.setDisplayFriend('hideComponent');
            props.setDisplayChat('');
          } else {
            props.setDisplayFriend('');
            props.setDisplayChat('');
          }
        }}
        className={`friendBox ${selected}`} >
        <div className='uname'>{info.username}</div>
        <div className="remove">
          <button className='btn' onClick={() => { removeSecondAndChat(info._id); }}><i class="far fa-trash-alt"></i></button>
        </div>
      </div>
    );
  });

  if (props.friendList.length === 0 || props.friendList[0] === 'none') {
    FriendList = "No Friend found";
  }

  return (
    <div className='friendList'>
      {FriendList}
    </div>
  );
}

export default Friend;