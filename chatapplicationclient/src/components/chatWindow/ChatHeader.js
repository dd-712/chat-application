import React, { useState, useEffect } from 'react';

import './chatWindowStyles.css';

function ChatHeader(props) {

    const [width, setWidth] = useState(window.innerWidth);
    const [hideArrow, setHideArrow] = useState('hideComponent');

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []);

    useEffect(() => {
        if (width < 768) {
            setHideArrow('');
        } else {
            setHideArrow('hideComponent');
        }
        // console.log(width);
    }, [window.innerWidth]);

    const hideChatWindow = () => {

    }

    return (
        <header className="chatWindowHeader">
            <span
                className={`${hideArrow} backArrow`}
                onClick={() => {
                    if (window.innerWidth < 768) {
                        props.setDisplayFriend('');
                        props.setDisplayChat('hideComponent');
                    } else {
                        props.setDisplayFriend('');
                        props.setDisplayChat('');
                    }
                }}
            ><i class="fas fa-arrow-left fa-lg"></i>
            </span>
            <span className='friendName'>{props.friendName}</span>
            {/* <span className='audioIcon'><i class="fas fa-phone-alt"></i></span>
            <span className='videoIcon'><i class="fas fa-video"></i></span> */}

        </header>
    );
}

export default ChatHeader;