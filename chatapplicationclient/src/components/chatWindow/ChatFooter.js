import * as React from 'react';
import { Link } from 'react-router-dom';
import './chatWindowStyles.css';

function ChatFooter(props) {
    return (
        <footer className="chatFooter">
            <span className="file"><img src=""></img></span>
            <form>
                <input className="inputMessage" type="message" placeholder="Enter Message" autoComplete="off" />
                <span className="sendButton"><img src=""></img></span>
            </form>
        </footer>
    );
}

export default ChatFooter;