import * as React from 'react';
import { Link } from 'react-router-dom';
import './stylesFriendList.css';

import Friend from './Friend';

function FriendList(props) {
    return (
        <div className='friendListDiv'>
            <div className='friendListHeader'>
                <input type='text' placeholder='Search Friends' className='input'/>
                <div className='searchIcon'><img src='/search-icon.png' width='20px' /></div>
                <div className='friendRequest'><img src='/person-icon.png' width='20px' /></div>
            </div>
            
            <Friend />
        </div>


    );
}

export default FriendList;