import * as React from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';

function ChatMessage(props) {

    let chatType = 'msg';

    if (chatType == "msg") {
        return (
            <div className="">
                <div>msg</div>
                <div>time</div>
            </div>
        );
    } else {
        return (
            <div className="">
                <div>time</div>
            </div>
        );
    }
}

export default ChatMessage;