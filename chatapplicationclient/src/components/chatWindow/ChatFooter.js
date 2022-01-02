import * as React from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';

function ChatFooter(props) {
    return (
        <footer className="chatWindowFooter">
            <span className="file"><i class="far fa-file-alt"></i></span>   
            <form className='inputForm'>
                <input className="inputMessage" type="message" placeholder="Enter Message" autoComplete="off" />
                <span className="sendButton"><i class="fas fa-paper-plane"></i></span>
            </form>
        </footer>
    );
}

export default ChatFooter;