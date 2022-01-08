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
import Combine from './combineComponent';


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
    postChat: (receiver, message, data, title, File) => dispatch(postChat(receiver, message, data, title, File)),
    postContact: (_id,username,roomId) => dispatch(postContact(_id,username,roomId)),
    deleteChat: (_ID) => dispatch(deleteChat(_ID)),
    deleteContact: (_ID1,_ID2) => dispatch(deleteContact(_ID1,_ID2)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    signupUser: (username, password, firstname, lastname) => dispatch(signupUser(username, password, firstname, lastname)),
    postChangeUsername: (newUsername) => dispatch(postChangeUsername(newUsername)),
    postFile: (formadata, receiver, message, data, title) => dispatch(postFile(formadata, receiver, message, data, title)),
    Set_default: () => dispatch(Set_default()),
    ErrorMess: (message) => dispatch(ErrorMess(message))
});


class Main extends Component {
    render() {
        let Valid = this.props.auth.isAuthenticated;
    
        if (!Valid) {
            return (
                <div className='mainComponentDiv'>
                    <Header auth={this.props.auth} logoutUser={this.props.logoutUser} />
                    <Route exact path="/login" component={() => <Login loginUser={this.props.loginUser} />} />
                    <Route exact path="/signup" component={() => <Signup signupUser={this.props.signupUser} />} />
                </div>
            );
        } else {

            return (
                <div className='mainComponentDiv'>
                    <Header auth={this.props.auth} logoutUser={this.props.logoutUser} />
                        <Route path="/user" component={() => <Combine auth={this.props.auth}
                                
                                contacts={this.props.contacts}
                                friends={this.props.contacts.contacts}
                                //errormess={this.props.errormess.errMess}
                                postContact={this.props.postContact}
                                deleteContact={this.props.deleteContact}
                                deleteChat={this.props.deleteChat}
                                postChat={this.props.postChat}
                                postFile={this.props.postFile}
                                chats={this.props.chats}
                            />} 
                        />
                </div>

            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
//export default Main;
