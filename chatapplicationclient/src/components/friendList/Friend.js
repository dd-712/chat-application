import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './stylesFriendList.css';

function RenderItem({ info}) {
  return(
      <div>
            <span>{info.username}</span>
      </div>
  );
}

class Friend extends Component{
  constructor(props){
    super(props);
  }/*
  FriendList = this.props.friends.map((info) => {
    alert(info);
    return (
        <div  key={info._id}>
            <RenderItem info={info}/>
        </div>
    );
  });*/
  render()
  {/*
   if(this.props.data.isLoading)
    {
      alert(this.props.data);  
    }
    else
    {
      alert(this.props.data);
    }*/
    return (
      <div className="friendBox">
        hi
      </div>
    );
  }
}

export default Friend;