import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';
import './stylesFriendList.css';

function Friend(props) {

  const [friendList, setFriendList] = useState([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {

    if (friendList.length && !alert) {
      return;
    }

    const getList = async () => {

      const bearer = 'Bearer ' + localStorage.getItem('token');
      const url = baseUrl + 'users/connections';

      const res = await axios.get(url, {
        headers: {
          Authorization: bearer
        }
      })

      var response = res.data;
      var li = [];
      for (var i = 0; i < response.length; i++) {
        li.push(response[i]);
      }

      setFriendList(li);
    }

    getList();

  }, [alert, friendList])

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 100)
    }
  }, [alert])

  var FriendList = friendList.map((info, index) => {
    return (
      <div key={index}>
        <div className='friendBox'>
          <span className='uname'>{info.username}</span>
          <span className="remove">
            <button onClick={() => { props.deleteFriend(info._id); setAlert(true); }}>remove</button>
          </span>
        </div>
      </div>
    );
  });
  if (friendList.length == 0)
    FriendList = "No Friend found";
  return (
    <div>
      {FriendList}
    </div>
  );
}

export default Friend;