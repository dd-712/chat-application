import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './stylesFriendList.css';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';
import * as ActionTypes from '../../redux/ActionTypes';
import Friend from './Friend';

function FriendList(props) {

    const [friendList, setFriendList] = useState('yo');

    useEffect(async () => {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const url = baseUrl + 'users/connections';
        const res = await axios.get(url, {
            headers: {
                Authorization: bearer
            }
        })
        const response = JSON.stringify(res);
        setFriendList(response);
    })

    return (
        <div className='friendListDiv'>
            {/* {alert('done')} */}
            <div className='friendListHeader'>
                <input type='text' placeholder='Search Friends' className='input' />
                <div className='searchIcon'><img src='/search-icon.png' width='20px' /></div>
                <div className='friendRequest'><img src='/person-icon.png' width='20px' /></div>
            </div>
            <div>
                Hi
                {friendList}
            </div>
            <Friend />
        </div>
    );
}

export default FriendList;