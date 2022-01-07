import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { curUrl,baseUrl } from '../../shared/baseUrl';
import './stylesFriendList.css';
import jwt from 'jwt-decode';

let cnt = 0;

function Friend(props) {
  const [cid, setId] = useState('id');
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

  useEffect(() => {
    let url = window.location.href.split("/");
    let found=0;
    setId(" ");
    for (let i = 2; i < url.length; i++) {
        if (url[i].length >= 9 && url[i].slice(0, 9) == 'connect__' && i + 1 != url.length) {
            found = 1;
            let len = url[i + 1].length;
            if (url[i + 1].indexOf("?") != -1)
                len = url[i + 1].indexOf("?");
            //alert(url[i+1].slice(0,len));
            setId(url[i + 1].slice(0, len));
            break;
        }
    }
})

  async function removeSecondAndChat(_Id) {
    let curId = jwt(localStorage.getItem('token'));
    await getList(_Id);
    await props.deleteFriend(curId._id, _Id);
    await props.deleteFriend(_Id, curId._id);
    props.setAlert(true);
    if(cid==_Id)
    window.location.href=curUrl+"user";
    props.socket.emit("newFriend", {
      senderId: curId._id,
      receiverId: _Id
    });
  }

  var FriendList = props.friendList.map((info, index) => {
    return (
      <div key={index}>
        <Link className="link" to={`/${'user/connect__' + info.username}/${info._id}`} >
          <div className='friendBox'>
            <div className='uname'>{info.username}</div>
            <div className="remove">
              <button className='btn' onClick={() => { removeSecondAndChat(info._id); }}><i class="far fa-trash-alt"></i></button>
            </div>
          </div>
        </Link>
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