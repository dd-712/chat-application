import * as React from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';

function ChatFooter(props) {
    return (
        <footer className="chatWindowFooter">
            <span className="file"><img src="/send-file-icon.png" width='20px'></img></span>
            <form className='inputForm'>
                <input className="inputMessage" type="message" placeholder="Enter Message" autoComplete="off" />
                <span className="sendButton"><img src="/send-icon.png" width='20px'></img></span>
            </form>
        </footer>
    );
}

export default ChatFooter;