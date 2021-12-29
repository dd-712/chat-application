import React, { Component, useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    fetchChats, fetchContacts, postChat, postContact, postFile,
    postChangeUsername, deleteChat, deleteContact, loginUser, logoutUser,
    signupUser, ErrorMess, Set_default
} from '../redux/ActionCreators';

import './styles.css';

import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";

import FriendList from './friendList/FriendList';
import Chat from './chatWindow/Chat';

import { matchPath } from 'react-router'
/*

import Header from './HeaderComponent';*/



const mapStateToProps = state => {
    return {
        chats: state.chats,
        contacts: state.contacts,
        errorMess: state.errorMess,
        auth: state.auth,
        file: state.file
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchChats: (receiver) => { dispatch(fetchChats(receiver)) },
    fetchContacts: () => { dispatch(fetchContacts()) },
    postChat: (receiver, message, data, title, File) => dispatch(postChat(receiver, message, data, title, File)),
    postContact: (username) => dispatch(postContact(username)),
    deleteChat: (_ID) => dispatch(deleteChat(_ID)),
    deleteContact: (_ID) => dispatch(deleteContact(_ID)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    signupUser: (username, password, firstname, lastname) => dispatch(signupUser(username, password, firstname, lastname)),
    postChangeUsername: (newUsername) => dispatch(postChangeUsername(newUsername)),
    postFile: (formadata, receiver, message, data, title) => dispatch(postFile(formadata, receiver, message, data, title)),
    Set_default: () => dispatch(Set_default()),
    ErrorMess: (message) => dispatch(ErrorMess(message))
});


class Main extends Component {

    /*componentDidMount() {
      this.props.fetchChats();
      this.props.fetchContacts();
      document.title="Chat App";
    }
    
    componentDidUpdate(){
        this.props.fetchChats();
    }*/

    render() {
        let notValid = true;
        if (notValid) {
            return (
                <div>
                    <Header />
                    <Route exact path="/login" component={() => <Login loginUser={this.props.loginUser} />} />
                    <Route exact path="/signup" component={() => <Signup signupUser={this.props.signupUser} />} />
                </div>
            );
        } else {
            return (
                <div>
                    <Header />
                    <div className='mainDiv'>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <FriendList
                                    fetchFriends={this.props.fetchContacts}
                                    postFriends={this.props.postContact}
                                    deleteFriend={this.props.deleteContact}
                                />
                            </div>
                            <div className='col-lg-8'>
                                <Chat
                                    fetchChat={this.props.fetchChats}
                                    postChat={this.props.postChat}
                                    deleteChat={this.props.deleteChat}
                                    postFile={this.props.postFile}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
//export default Main;
