import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';
import './stylesFriendList.css';

function RenderItem({ info,deleteFriend}) {
  return(
      <div className='friendBox'>
            <span className='uname'>{info.username}</span>
            <span className="remove">
            <button  onClick={()=>deleteFriend(info._id)}>remove</button></span>
      </div>
  );
}

function Friend(props){
  
  const [friendList, setFriendList] = useState([]);

    useEffect(async () => {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const url = baseUrl + 'users/connections';
        const res = await axios.get(url, {
            headers: {
                Authorization: bearer
            }
        })
        var response = res.data;
        var li=[];
        for(var i=0;i<response.length;i++)
        {
            li.push(response[i]);
        }
        setFriendList(li);
    },[])

    var FriendList = friendList.map((info,index) => {
    return (
        <div  key={index}>
            <RenderItem info={info} deleteFriend={props.deleteFriend}/>
        </div>
    );
  });
  if(friendList.length==0)
  FriendList="No Friend found";
  return (
    <div>
      {FriendList}
    </div>
  );
}

export default Friend;