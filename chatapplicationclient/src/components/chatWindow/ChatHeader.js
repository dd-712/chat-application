import React from 'react';

import './chatWindowStyles.css';

function ChatHeader(props) {



    return (
        <header className="chatWindowHeader">
            <span className='friendName'>{props.friendName}</span>
            {/* <span className='audioIcon'><i class="fas fa-phone-alt"></i></span>
            <span className='videoIcon'><i class="fas fa-video"></i></span> */}

        </header>
    );
}

export default ChatHeader;